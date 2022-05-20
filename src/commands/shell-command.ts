import { exec, spawn } from "child_process"
import WorkingDir from "../WorkingDir";

export const shellRunCommand = async (command: string, workingDir: WorkingDir): Promise<number> => (
  new Promise((resolve, reject) => {
    console.log(`Run command "${command}" from directory ${workingDir.currentDir}`);

    exec(command, {
      cwd: workingDir.currentDir
    }, (err, stdout, stderr) => {
      console.log("Result", err);

      if (err) {
        reject(err);
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }

      console.log(`stdout:\n${stdout}`);

      const path = WorkingDir.getCd(command);
      if (path) {
        // TODO: Handle absolute path
        workingDir.currentDir = `${workingDir.currentDir}/${path}`;
        console.log(`New working directory: ${workingDir.currentDir}`);
      }

      resolve(0);
    });
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
