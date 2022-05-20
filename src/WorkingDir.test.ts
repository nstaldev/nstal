import WorkingDir from './WorkingDir'

test('getCd', () => {
  expect(WorkingDir.getCd('cd new-path')).toEqual('new-path');
  expect(WorkingDir.getCd('cd ../another-one')).toEqual('../another-one');
  expect(WorkingDir.getCd('  cd /path/to/thing ')).toEqual('/path/to/thing');
  expect(WorkingDir.getCd('npx not-related')).toBeNull();
})

test('get/set', () => {
  const wd = new WorkingDir();
  expect(wd.currentDir).toEqual(process.cwd());
  wd.currentDir = '/new/path';
  expect(wd.currentDir).toEqual('/new/path');
})
