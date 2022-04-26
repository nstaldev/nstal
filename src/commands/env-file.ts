
import { ReadStream } from 'fs';
import fs from 'fs/promises'
import readline from 'node:readline'
import { Readable } from 'stream';

const ENV_FILE = '.env'

export enum EnvFileUpdateNature {
  UNCHANGED = 'unchanged',
  UPDATED = 'updated',
  ADDED = 'added'
}

export type EnvFileUpdate = {
  status: EnvFileUpdateNature,
  oldValue?: string,
  newContent: string
}

export const envFileSet = async (content: string, name: string, value: string): Promise<EnvFileUpdate> => {
  const stream = new Readable();
  stream.push(content);
  stream.push(null);

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });

  const lines: string[] = [];

  for await (const line of rl) {
    lines.push(line);
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [key, val] = line.split('=');
    if (key.trim() === name) {
      if (val.trim() === value) {
        return {
          status: EnvFileUpdateNature.UNCHANGED,
          newContent: content
        }
      } else {
        return {
          status: EnvFileUpdateNature.UPDATED,
          newContent:
            lines.slice(0, i).join('\n') +
            `${name}=${value}\n` +
            lines.slice(i + 1).join('\n'),
          oldValue: val.trim()
        }
      }
    }
  }

  return {
    status: EnvFileUpdateNature.ADDED,
    newContent: `${content}\n${name}=${value}\n`
  }
}

export const envFileAddEntry = async (name: string, value: string): Promise<EnvFileUpdate> => {
  const declaration = `${name}=${value}\n`;

  let content = '';
  try {
    content = await fs.readFile(ENV_FILE, 'utf8');
  } catch (e) {
    // File does not exist
  }

  const change = await envFileSet(content, name, value);

  if (change.status !== EnvFileUpdateNature.UNCHANGED) {
    await fs.writeFile(ENV_FILE, change.newContent, 'utf8');
  }

  return change;
}
