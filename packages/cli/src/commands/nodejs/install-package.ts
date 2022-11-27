import { hasUncaughtExceptionCaptureCallback } from "process";
import WorkingDir from "../../working-dir"
import { shellRunCommand } from "../shell-command"

export const installNodeJsPackage = async (packagesList: string[], workingDir: WorkingDir): Promise<void> => (
  shellRunCommand(`npm install ${packagesList.join(' ')}`, workingDir)
)
