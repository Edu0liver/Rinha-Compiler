import { Env, File, Term, Val } from "./types"

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
            // case 'If':
                
            // case 'Tuple':
                
            // case 'First':
                
            // case 'Second':
                
            // case 'Binary':

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
}