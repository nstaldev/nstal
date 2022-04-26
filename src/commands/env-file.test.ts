import { Readable } from "stream";
import { envFileSet, EnvFileUpdateNature } from "./env-file";

test('envFileSet', async () => {
  expect(await envFileSet('# Empty!', 'FOO', 'bar')).toEqual({
    status: EnvFileUpdateNature.ADDED,
    newContent: "# Empty!\nFOO=bar\n"
  });

  expect(await envFileSet('ABC=def', 'FOO', 'bar')).toEqual({
    status: EnvFileUpdateNature.ADDED,
    newContent: "ABC=def\nFOO=bar\n"
  });

  expect(await envFileSet('FOO=xyz', 'FOO', 'bar')).toEqual({
    status: EnvFileUpdateNature.UPDATED,
    newContent: "FOO=bar\n",
    oldValue: 'xyz'
  });

  expect(await envFileSet('FOO=bar', 'FOO', 'bar')).toEqual({
    status: EnvFileUpdateNature.UNCHANGED,
    newContent: "FOO=bar"
  });

  expect(await envFileSet(' FOO   = xyz', 'FOO', 'bar')).toEqual({
    status: EnvFileUpdateNature.UPDATED,
    newContent: "FOO=bar\n",
    oldValue: 'xyz'
  });
})
