import { ErrorInterpreter } from "./error"
import { BinaryOp, Env, File, Term, Val } from "./types"

export class Interpreter {
    constructor(private jsonFile: File) {}

    interpreteFile() {
        let env = { objects: {} }
        this.interpret(this.jsonFile.expression, env)
    }

    interpret(term: Term, env: Env): Val {
        switch (term.kind) {
            case 'Str':
                return { kind: "string", value: term.value }

            case 'Bool':
                return { kind: "boolean", value: term.value }

            case 'Int':
                return { kind: "number", value: term.value }

            case 'Print':
                let value = this.interpret(term.value, env);
                console.log(this.showValue(value))
                return value
                
            case 'Binary':
                return this.interpretBinary(this.interpret(term.lhs, env), this.interpret(term.rhs, env), term.op)
                
            case 'If':
                if (this.assertBoolean(this.interpret(term.condition, env))) return this.interpret(term.then, env)
                else return this.interpret(term.otherwise, env)
                
            case 'Tuple':
                return {
                    kind: "tuple",
                    fst: this.interpret(term.first, env), 
                    snd: this.interpret(term.second, env)
                }
                
            case 'First':
                return this.interpret(term.value, env)
                
            case 'Second':
                return this.interpret(term.value, env)

            case 'Var':{
                let value = env.objects[term.text];

                if (value) return value
                else throw new ErrorInterpreter(`Undefined Var`)
            }
                
            case 'Let': {
                let name = term.name.text
                let value = this.interpret(term.value, env)
                env.objects[name] = value

                return this.interpret(term.next, env)
            }
                
            // case 'Call':
                
            // case 'Function':

            default: 
                return { kind: "void",  value: null}
        }
    }

    showValue(value: Val): string {
        switch (value.kind) {
            case "number":
                return value.value.toString()
            case "boolean":
                return value.value ? "true" : "false"
            case "string":
                return value.value
            case "tuple":
                return `(${this.showValue(value.fst)},${this.showValue(value.snd)})`
            default:
                return ""
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
        if (int == null) throw new ErrorInterpreter("Invalid operator")
        return int
    }

    assertBoolean(value: Val): boolean {
        let bool = value.kind === "boolean" ? value.value : null
        if (bool == null) throw new ErrorInterpreter("Invalid operator")
        return bool
    }

    assertEqual(left: Val, right: Val): boolean  {
        let lop = left.kind === "boolean" || left.kind === "string" || left.kind === "number" ? { kind: left.kind, value: left.value }: null
        let rop = right.kind === "boolean" || right.kind === "string" || right.kind === "number" ? { kind: right.kind, value: right.value } : null

        if (lop == null) throw new ErrorInterpreter("Invalid operator")
        if (rop == null) throw new ErrorInterpreter("Invalid operator")
        
        if (lop.kind == rop.kind) {
            return rop.value == lop.value
        }

        throw new ErrorInterpreter("Invalid operation")
    }
}