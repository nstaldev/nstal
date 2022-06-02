import path from 'path'
const mkdirp = require('mkdirp');
import fs from 'fs'

export const writeFile = async (filePath: string, content: string): Promise<void> => {
  const dir = path.dirname(filePath);
  await mkdirp(dir);
  await fs.promises.writeFile(filePath, content);
}

export const fileExists = async (filePath: string): Promise<boolean> => (
  new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      resolve(!err);
    })
  })
)

export const readFile = async (filePath: string): Promise<string> => (
  fs.promises.readFile(filePath, 'utf8')
)
