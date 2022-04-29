import { addCodeToFunction, addNamedImport } from "./transform";

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


test('addCodeToFunction', () => {
  expect(addCodeToFunction(`
    // Hey!
    function someFunc() {
      console.log("Hello world");
    }
  `, 'someFunc', `
    const x = 5;
    console.log('X=' + x);
  `)).toEqual(`
    // Hey!
    function someFunc() {
      const x = 5;
      console.log('X=' + x);
      console.log("Hello world");
    }
  `);
});
