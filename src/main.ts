import json from '../files/print.json'
import { Interpreter } from './interpreter'

const interpreter = new Interpreter(json as any);
interpreter.interpreteFile();
