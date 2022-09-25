
export enum Command {
  CreateFile = 'CreateFile',
  InstallNpmPackage = 'InstallNpmPackage',
  ShellCd = 'ShellCd'
}

export type CommandContext = {
  complete: () => Promise<void>;
  output: (line: string) => Promise<void>;
}

export type LocalAgent = {
  createFile: (path: string, content: string) => Promise<void>;
  shellCd: (path: string) => Promise<void>;
  installNpmPackage: (packageList: string[], devDep: boolean, context: CommandContext) => Promise<void>;
}
