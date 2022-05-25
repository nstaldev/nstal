class WorkingDir {
  dir: string;

  constructor() {
    this.dir = process.cwd();
  }

  get currentDir(): string {
    return this.dir;
  }

  set currentDir(dir) {
    this.dir = dir;
  }

  static getCd(anyCommand: string): string | null {
    const trimmedCommand = anyCommand.trim();

    const cdPrefix = 'cd ';
    if (trimmedCommand.startsWith(cdPrefix)) {
      return trimmedCommand.substring(cdPrefix.length);
    }
  
    return null;
  }
}

export default WorkingDir
