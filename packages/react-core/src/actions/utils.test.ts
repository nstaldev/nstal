import { getCdDirectory } from "./utils";

test('getCdDirectory', () => {
  expect(getCdDirectory('ls -l')).toBeNull();
  expect(getCdDirectory('not a cd')).toBeNull();

  expect(getCdDirectory('cd some/path')).toEqual('some/path');
});
