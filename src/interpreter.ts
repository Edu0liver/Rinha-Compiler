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
            case 'If':
                
            case 'Tuple':
                
            case 'First':
                
            case 'Second':
                
            case 'Binary':
                
            case 'Print':
                
            case 'Var':
                
            case 'Let':
                
            case 'Call':
                
            case 'Function':
                
        }
    }
}