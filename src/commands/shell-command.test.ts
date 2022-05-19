import { Readable } from "stream";
import { getCd } from "./shell-command";

test('getCd', async () => {
  expect(getCd('cd new-path')).toEqual('new-path');
  expect(getCd('cd ../another-one')).toEqual('../another-one');
  expect(getCd('  cd /path/to/thing ')).toEqual('/path/to/thing');
  expect(getCd('npx not-related')).toBeNull();
})
