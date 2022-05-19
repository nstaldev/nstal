import { exec } from "child_process"

export const shellRunCommand = async (command: string, currentPath: string): Promise<number> => (
  new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }

      console.log(`stdout:\n${stdout}`);

      resolve(0);
    });
  })
)