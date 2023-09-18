export type Val = 
  { kind: "boolean", value: boolean }
| { kind: "string", value: string }
| { kind: "number", value: number }
| { kind: "tuple", fst: Val, snd: Val }
| { kind: "closure", value: ClosureValue }
| { kind: "void", value: null };

export type ClosureValue = {
    body: Term;
    params: Parameter[]
    mem: Memory
}

export type Memory =  Record<string, Val>;

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
    kind: 'Var',
    text: string,
    location: Location,
}

export type Function = {
    kind: 'Function',
    parameters: Parameter[],
    value: Term,
    location: Location,
}

export type Call = {
    kind: 'Call',
    callee: Term,
    arguments: Term[],
    location: Location,
}

export type Let = {
    kind: 'Let',
    name: Parameter,
    value: Term,
    next: Term
    location: Location,
}

export type Str = {
    kind: 'Str',
    value: string,
    location: Location,
}

export type Int = {
    kind: 'Int',
    value: number,
    location: Location,
}

export enum BinaryOp {
    ADD = "Add",
    SUB = "SUB",
    MUL = "MUL",
    DIV = "DIV",
    REM = "REM",
    EQ = "EQ",
    NEQ = "NEQ",
    LT = "LT",
    GT = "GT",
    LTE = "LTE",
    GTE = "GTE",
    AND = "AND",
    OR = "OR",
}

export type Bool = {
    kind: 'Bool',
    value: boolean,
    location: Location,
}

export type If = {
    kind: 'If',
    condition: Term,
    then: Term,
    otherwise: Term,
    location: Location,
}

export type Binary = {
    kind: 'Binary',
    lhs: Term,
    op: BinaryOp,
    rhs: Term,
    location: Location,
}

export type Tuple = {
    kind: 'Tuple',
    first: Term,
    second: Term,
    location: Location,
}

export type First = {
    kind: 'First',
    value: Term,
    location: Location,
}

export type Second = {
    kind: 'Second',
    value: Term,
    location: Location,
}

export type Print = {
    kind: 'Print',
    value: Term,
    location: Location,
}

export type Term = Int | Str | Call | Binary | Function | Let | If | Print | First | Second | Bool | Tuple | Var;