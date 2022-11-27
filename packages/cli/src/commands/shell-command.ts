import { CommandContext } from "@nstaldev/net";
import { spawn } from "child_process"
import WorkingDir from "../working-dir";

export const shellRunCommand = async (command: string, workingDir: WorkingDir, context: CommandContext): Promise<void> => (
  new Promise((resolve, reject) => {
    console.log(`Run command "${command}" from directory ${workingDir.currentDir}`);

    const process = spawn(command, [], {
      cwd: workingDir.currentDir,
      shell: true // Allow command to be a full command, eg. 'cmd --arg 1 --arg 2'
    });

    process.on('exit', code => {
      if (code !== 0) {
        reject(`Command exited with status ${code}`);
      } else {
        resolve();
      }
    });

    process.stdout.on('data', data => context.output(data.toString()));
  })
)

export const shellStartCommand = async (command: string, workingDir: WorkingDir): Promise<number> => (
  new Promise((resolve, reject) => {
    console.log(`Run command "${command}" from directory ${workingDir.currentDir}`);

    const cmd = spawn(command, [], {
      cwd: workingDir.currentDir,
      shell: true // Allow command to be a full command, eg. 'cmd --arg 1 --arg 2'
    });

    cmd.on('exit', (code) => {
      reject(code);
    });

    setTimeout(() => {
      resolve(0);
    }, 500);
  })
)
