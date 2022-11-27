import { CommandContext } from "@nstaldev/net";
import { hasUncaughtExceptionCaptureCallback } from "process";
import WorkingDir from "../../working-dir"
import { shellRunCommand } from "../shell-command"

export const installNodeJsPackage = async (packagesList: string[], workingDir: WorkingDir, context: CommandContext): Promise<void> => (
  shellRunCommand(`npm install ${packagesList.join(' ')}`, workingDir, context)
)
