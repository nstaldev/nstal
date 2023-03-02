
/**
 * Return the directory to cd to.
 *
 * @param cdCommand Any shell command, eg. `ls -l`, `cd some/path` or `just -a command`
 * @returns The directory to cd to, or `null` if the command is not a change dir one.
 */
export const getCdDirectory = (cdCommand: string): string | null => {
  const m = cdCommand.match(/^cd\s+(.*)/);
  return m ? m[1] : null;
}
