import { exec } from "child_process"

let currentPath = process.cwd();

export const getCd = (command: string): string | null => {
  const trimmedCommand = command.trim();

  const cdPrefix = 'cd ';
  if (trimmedCommand.startsWith(cdPrefix)) {
    return trimmedCommand.substring(cdPrefix.length);
  }

  return null;
}

export const shellRunCommand = async (command: string): Promise<number> => (
  new Promise((resolve, reject) => {
    console.log(`Run command "${command}" from directory ${currentPath}`);

    exec(command, {
      cwd: currentPath
    }, (err, stdout, stderr) => {
      console.log("Result", err);

      if (err) {
        reject(err);
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }

      console.log(`stdout:\n${stdout}`);

      const path = getCd(command);
      if (path) {
        // TODO: Handle absolute path
        currentPath = `${currentPath}/${path}`;
        console.log(`New working directory: ${currentPath}`);
      }

      resolve(0);
    });
  })
)
