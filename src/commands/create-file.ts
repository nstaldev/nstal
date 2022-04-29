import path from 'path'
const mkdirp = require('mkdirp');
import fs from 'fs/promises'

export const createFile = async (filePath: string, content: string): Promise<void> => {
  const dir = path.dirname(filePath);
  await mkdirp(dir);
  await fs.writeFile(filePath, content);
}
