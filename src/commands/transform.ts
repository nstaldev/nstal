
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

  const output = print(code, { lineTerminator: detectNewline(source) }).code;

  return output;
}
