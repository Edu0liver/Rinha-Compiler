
export class ErrorInterpreter {
    constructor(
        message: string,
        start?: number,
        end?: number,
    ) {
        throw new Error(`${message}\n${start ? `start: ${start}` : `` }\n${end ? `end: ${end}` : `` }`)
    }
}