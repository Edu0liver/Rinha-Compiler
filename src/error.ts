
export class ErrorInterpreter {
    constructor(
        message: string,
        start?: number,
        end?: number,
    ) {
        console.log(`${message}\n${start ? `start: ${start}` : `` }\n${end ? `end: ${end}` : `` }`)
    }
}