import { File, Term } from "./types"

export class Interpreter {
    constructor(private jsonFile: File) {}

    interpreteFile() {
        this.interpret(this.jsonFile.expression)
    }

    interpret(term: Term) {}
}