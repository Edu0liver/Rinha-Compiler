import json from '../files/sum.json'
import { Interpreter } from './interpreter'
import { File } from './types';

const interpreter = new Interpreter(json as File);
interpreter.interpreteFile();
