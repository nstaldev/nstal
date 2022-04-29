import { addNamedImport } from "./transform";

test('addNamedImport', () => {
  expect(addNamedImport(`
    import React from 'react';
console.log("Hello world");
  `.trim(), 'someFunc', 'somePackage')).toEqual(`
    import { someFunc } from 'somePackage';
import React from 'react';
console.log("Hello world");
  `.trim());
});
