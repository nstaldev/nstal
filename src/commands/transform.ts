import { transformSync } from '@babel/core';
import template from "@babel/template";

export const addNamedImport = (code: string, name: string, from: string): string => {
  const output = transformSync(code, {
    plugins: [
      "@babel/plugin-syntax-jsx",
      () => {
        return {
          visitor: {
            Program(path) {
              const buildImport = template(`import { ${name} } from '${from}';`)();
              path.unshiftContainer('body', buildImport);
            }
          },
        };
      },
    ]
  });

  return output.code;
}
