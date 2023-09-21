import json from '../files/fib.json'
import { Interpreter } from './interpreter'
import { File } from './types';
import * as fs from 'fs';
import * as path from 'path';

const files: string[] = []

const getFiles = (dir: string, files: string[]) => {
    const fileList = fs.readdirSync(dir);

    for (const file of fileList) {
      let name = `${dir}/${file}`;
      console.log(name);

      if (fs.statSync(name).isDirectory()) {
        getFiles(name, files);

      } else {
        files.push(name);
      }
    }

    return files;
}

getFiles(path.join(__dirname, '../files'), files)

console.log(files);

const interpreter = new Interpreter(json as File);
interpreter.interpreteFile();
