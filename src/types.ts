export type Val = {
    string: string;
    number: number,
    boolean: boolean,
    tuple: { f: Val, s: Val };
}

export type File = {
    name: string,
    expression: Term,
    location: Location,
}

export type Location = {
    start: number,
    end: number,
    filename: string,
}

export type Parameter = {
    text: string,
    location: Location,
}

export type Var = {
    kind: string,
    text: string,
    location: Location,
}

export type Function = {
    kind: string,
    parameters: Parameter[],
    value: Term,
    location: Location,
}

export type Call = {
    kind: string,
    callee: Term,
    arguments: Term[],
    location: Location,
}

export type Let = {
    kind: string,
    name: Parameter,
    value: Term,
    next: Term
    location: Location,
}

export type Str = {
    kind: string,
    value: string,
    location: Location,
}

export type Int = {
    kind: string,
    value: number,
    location: Location,
}

export enum BinaryOp {
    ADD,
    SUB,
    MUL,
    DIV,
    REM,
    EQ,
    NEQ,
    LT,
    GT,
    LTE,
    GTE,
    AND,
    OR,
}

export type Bool = {
    kind: string,
    value: boolean,
    location: Location,
}

export type If = {
    kind: string,
    condition: Term,
    then: Term,
    otherwise: Term,
    location: Location,
}

export type Binary = {
    kind: string,
    lhs: Term,
    op: BinaryOp,
    rhs: Term,
    location: Location,
}

export type Tuple = {
    kind: string,
    first: Term,
    second: Term,
    location: Location,
}

export type First = {
    kind: string,
    value: Term,
    location: Location,
}

export type Second = {
    kind: string,
    value: Term,
    location: Location,
}

export type Print = {
    kind: string,
    value: Term,
    location: Location,
}

export type Term = Int | Str | Call | Binary | Function | Let | If | Print | First | Second | Bool | Tuple | Var;