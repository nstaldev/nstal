import { parse, print, types } from "recast";
import { detectNewline } from "../utils";

export const addNamedImport = (source: string, name: string, from: string): string => {
  const code = parse(source);

  const b = types.builders;
  const importDeclaration = b.importDeclaration(
    [ { type: 'ImportSpecifier', imported: { type: 'Identifier', name: name } } ],
    { type: 'StringLiteral', value: from }
  );

  code.program.body.unshift(importDeclaration);

  return print(code, { lineTerminator: detectNewline(source) }).code;
}

export const addCodeToFunction = (source: string, funcName: string, extraSource: string): string => {
  const code = parse(source);

  const extraCode = parse(extraSource);

  const func = findFunction(code.program.body, funcName);

  func.body.body = extraCode.program.body.concat(func.body.body);

  return print(code, { lineTerminator: detectNewline(source) }).code;
}

const findFunction = (programBody: any, functionName): any => (
  programBody.find(node => node.type === 'FunctionDeclaration' && node.id.name === functionName)
);
