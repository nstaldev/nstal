import { addCodeToFunction, addNamedImport } from "./transform";

test('addNamedImport', () => {
  expect(addNamedImport(`
    import React from 'react';
    console.log("Hello world");
  `, [ 'someFunc', 'someOtherFunc' ], 'somePackage')).toEqual(`
    import { someFunc, someOtherFunc } from "somePackage";
    import React from 'react';
    console.log("Hello world");
  `);

  // TODO: Prevent duplicated imports
  // TODO: Add import to the end of the imports section
  // TODO: Syntax error
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

  // TODO: Arrow function
  // TODO: Function is not present
  // TODO: Syntax error
});
