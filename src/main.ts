import json from '../files/print.json'
import { Interpreter } from './interpreter'
import { File } from './types';

const interpreter = new Interpreter(json as File);
interpreter.interpreteFile();
