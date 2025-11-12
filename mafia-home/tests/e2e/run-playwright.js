const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const projectDir = path.resolve(__dirname, '..', '..');
const moduleCache = new Map();

function compileTsModule(modulePath) {
  const absolutePath = path.resolve(modulePath);
  if (moduleCache.has(absolutePath)) {
    return moduleCache.get(absolutePath).exports;
  }
  const source = fs.readFileSync(absolutePath, 'utf8');
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2019,
      esModuleInterop: true,
      jsx: ts.JsxEmit.React,
    },
    fileName: absolutePath,
  });

  const module = { exports: {} };
  const dir = path.dirname(absolutePath);
  const customRequire = (specifier) => {
    if (specifier.startsWith('.')) {
      const basePath = path.resolve(dir, specifier);
      const candidates = [
        basePath,
        `${basePath}.ts`,
        `${basePath}.tsx`,
        `${basePath}.js`,
        path.join(basePath, 'index.ts'),
        path.join(basePath, 'index.tsx'),
      ];
      for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
          return compileTsModule(candidate);
        }
      }
      throw new Error(`Unable to resolve module: ${specifier} from ${absolutePath}`);
    }
    if (specifier.startsWith('@/')) {
      const withoutAt = specifier.replace(/^@\//, '');
      return require(path.join(projectDir, withoutAt));
    }
    return require(specifier);
  };

  const wrapper = new Function('require', 'module', 'exports', '__dirname', '__filename', transpiled.outputText);
  wrapper(customRequire, module, module.exports, dir, absolutePath);
  moduleCache.set(absolutePath, module);
  return module.exports;
}

async function main() {
  const stubModule = compileTsModule(path.join(__dirname, 'playwright-stub.ts'));
  compileTsModule(path.join(__dirname, 'lobby.spec.ts'));
  await stubModule.runTests();
  if (process.exitCode && process.exitCode !== 0) {
    process.exit(process.exitCode);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
