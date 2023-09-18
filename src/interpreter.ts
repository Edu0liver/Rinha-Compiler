import { ErrorInterpreter } from "./error"
import { BinaryOp, File, Memory, Term, Val } from "./types"

export class Interpreter {
    constructor(private jsonFile: File) {}

    interpreteFile() {
        let memory = {}
        this.interpret(this.jsonFile.expression, memory)
    }

    interpret(term: Term, memory: Memory): Val {
        switch (term.kind) {
            case 'Str':
                return { kind: "string", value: term.value }

            case 'Bool':
                return { kind: "boolean", value: term.value }

            case 'Int':
                return { kind: "number", value: term.value }

            case 'Print':
                let value = this.interpret(term.value, memory);
                console.log(this.showValue(value))
                return value
                
            case 'Binary':
                return this.interpretBinary(this.interpret(term.lhs, memory), this.interpret(term.rhs, memory), term.op)
                
            case 'If':
                if (this.assertBoolean(this.interpret(term.condition, memory))) return this.interpret(term.then, memory)
                else return this.interpret(term.otherwise, memory)
                
            case 'Tuple':
                return {
                    kind: "tuple",
                    fst: this.interpret(term.first, memory), 
                    snd: this.interpret(term.second, memory)
                }
                
            case 'First':
                return this.interpret(term.value, memory)
                
            case 'Second':
                return this.interpret(term.value, memory)

            case 'Var':{
                let value = memory[term.text];

                if (value) return value
                else throw new ErrorInterpreter(`Undefined Var`)
            }
                
            case 'Let': {
                let name = term.name.text
                let value = this.interpret(term.value, memory)
                memory[name] = value

                return this.interpret(term.next, memory)
            }
                
            case 'Function':
                return {
                    kind: "closure",
                    value: {
                        body: term.value,
                        params: term.parameters,
                        mem: memory,
                    }
                }
                
            case 'Call':{
                let closure = this.interpret(term.callee, memory);

                switch (closure.kind) {
                    case "closure":
                        for (let [ p_index, param ] of closure.value.params.entries()) {
                            memory[param.text] = this.interpret(term.arguments[p_index], memory)
                        }

                        return this.interpret(closure.value.body, memory)

                    default: 
                        throw new ErrorInterpreter("Not a function")
                }
            }

            default: 
                return { kind: "void",  value: null}
        }
    }

    showValue(value: Val): string {
        switch (value.kind) {
            case "tuple":
                return `(${this.showValue(value.fst)},${this.showValue(value.snd)})`
            default:
                return `${value.value}`
        }
    }

    interpretBinary(left: Val, right: Val, operation: BinaryOp): Val {
        switch (operation) {
            case BinaryOp.ADD: {
                let value = this.assertInt(left) + this.assertInt(right)
                return { kind: "number", value }
            }
            case BinaryOp.SUB: {
                let value = this.assertInt(left) - this.assertInt(right)
                return { kind: "number", value }
            }
            case BinaryOp.MUL: {
                let value = this.assertInt(left) * this.assertInt(right)
                return { kind: "number", value }
            }
            case BinaryOp.DIV: {
                let value = Math.floor(this.assertInt(left) / this.assertInt(right))
                return { kind: "number", value }
            }
            case BinaryOp.REM: {
                let value = this.assertInt(left) & this.assertInt(right)
                return { kind: "number", value }
            }
            case BinaryOp.LT: {
                let value = this.assertInt(left) < this.assertInt(right)
                return { kind: "boolean", value }
            }
            case BinaryOp.GT: {
                let value = this.assertInt(left) > this.assertInt(right)
                return { kind: "boolean", value }
            }
            case BinaryOp.LTE: {
                let value = this.assertInt(left) <= this.assertInt(right)
                return { kind: "boolean", value }
            }
            case BinaryOp.GTE: {
                let value = this.assertInt(left) >= this.assertInt(right)
                return { kind: "boolean", value }
            }
            case BinaryOp.AND: {
                let value = this.assertBoolean(left) && this.assertBoolean(right)
                return { kind: "boolean", value }
            }
            case BinaryOp.OR: {
                let value = this.assertBoolean(left) || this.assertBoolean(right)
                return { kind: "boolean", value }
            }
            case BinaryOp.EQ: {
                let value = this.assertEqual(left, right);
                return { kind: "boolean", value }
            }
            case BinaryOp.NEQ: {
                let value = !(this.assertEqual(left, right));
                return { kind: "boolean", value }
            }
            default: 
                return { kind: "void",  value: null}
        }
    }

    assertInt(value: Val): number {
        let int = value.kind === "number" ? value.value : null
        if (int == null) throw new ErrorInterpreter("Invalid operator, int")
        return int
    }

    assertBoolean(value: Val): boolean {
        let bool = value.kind === "boolean" ? value.value : null
        if (bool == null) throw new ErrorInterpreter("Invalid operator, bool")
        return bool
    }

    assertEqual(left: Val, right: Val): boolean  {
        let lop = left.kind === "boolean" || left.kind === "string" || left.kind === "number" ? { kind: left.kind, value: left.value }: null
        let rop = right.kind === "boolean" || right.kind === "string" || right.kind === "number" ? { kind: right.kind, value: right.value } : null

        if (lop == null) throw new ErrorInterpreter("Invalid operator: lop")
        if (rop == null) throw new ErrorInterpreter("Invalid operator: rop")
        
        if (lop.kind == rop.kind) {
            return rop.value == lop.value
        }

        throw new ErrorInterpreter("Invalid operation, unmatch type")
    }
}