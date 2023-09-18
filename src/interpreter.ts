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
                return this.interpretBinary(term.lhs, term.rhs, term.op)
                
            // case 'If':
                
            // case 'Tuple':
                
            // case 'First':
                
            // case 'Second':

            // case 'Var':
                
            // case 'Let':
                
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

    interpretBinary(left: Term, right: Term, operation: BinaryOp): Val {
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

    assertInt(term: Term): number {
        let int = term.kind === "Int" ? term.value : null
        if (int == null) throw new ErrorInterpreter("Invalid operator", term.location.start, term.location.end)
        return int
    }

    assertBoolean(term: Term): boolean {
        let bool = term.kind === "Bool" ? term.value : null
        if (bool == null) throw new ErrorInterpreter("Invalid operator", term.location.start, term.location.end)
        return bool
    }

    assertEqual(left: Term, right: Term): boolean  {
        let lop = left.kind === "Bool" || left.kind === "Str" || left.kind === "Int" ? { kind: left.kind, value: left.value }: null
        let rop = right.kind === "Bool" || right.kind === "Str" || right.kind === "Int" ? { kind: right.kind, value: right.value } : null

        if (lop == null) throw new ErrorInterpreter("Invalid operator", left.location.start, left.location.end)
        if (rop == null) throw new ErrorInterpreter("Invalid operator", right.location.start, right.location.end)
        
        if (lop.kind == rop.kind) {
            return rop.value == lop.value
        }

        throw new ErrorInterpreter("Invalid operation")
    }
}