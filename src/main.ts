import json from '../files/fib.json'
import { Interpreter } from './interpreter'

const interpreter = new Interpreter(json as any);
interpreter.interpreteFile();
