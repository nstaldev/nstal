import { addNamedImport } from "./transform";

test('addNamedImport', () => {
  expect(addNamedImport(`
    import React from 'react';
    console.log("Hello world");
  `, 'someFunc', 'somePackage')).toEqual(`
    import { someFunc } from "somePackage";
    import React from 'react';
    console.log("Hello world");
  `);

  // TODO: Prevent duplicated imports
  // TODO: Add import to the end of the imports section
});
