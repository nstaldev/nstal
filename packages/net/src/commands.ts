
export enum Command {
  CreateFile = 'CreateFile',
  InstallNpmPackage = 'InstallNpmPackage',
  ShellCd = 'ShellCd',
  ReadFile = 'ReadFile',
  ShellCommand = 'ShellCommand',
  ShellStartCommand = 'ShellStartCommand'
}

export type CommandContext = {
  complete: (code: number) => Promise<void>;
  output: (line: string) => Promise<void>;
}

export type LocalAgent = {
  createFile: (path: string, content: string) => Promise<void>;
  readFile: (path: string) => Promise<string>;
  shellCd: (path: string) => Promise<void>;
  installNpmPackage: (packageList: string[], devDep: boolean, context: CommandContext) => Promise<void>;
  runCommand: (command: string, context: CommandContext) => Promise<void>;
  startCommand: (command: string, context: CommandContext) => Promise<void>;
}
