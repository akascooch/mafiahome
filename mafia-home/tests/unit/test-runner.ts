type TestFn = () => Promise<void> | void;

interface RegisteredTest {
  name: string;
  fn: TestFn;
}

const tests: RegisteredTest[] = [];

export function test(name: string, fn: TestFn) {
  tests.push({ name, fn });
}

export function expect<T>(value: T) {
  return {
    toBe(expected: T) {
      if (value !== expected) {
        throw new Error(`Expected ${JSON.stringify(value)} to be ${JSON.stringify(expected)}`);
      }
    },
    toEqual(expected: unknown) {
      const actualJson = JSON.stringify(value);
      const expectedJson = JSON.stringify(expected);
      if (actualJson !== expectedJson) {
        throw new Error(`Expected ${actualJson} to equal ${expectedJson}`);
      }
    },
    toHaveLength(expected: number) {
      const inspected = value as unknown as { length: number } | undefined | null;
      if (!inspected || typeof inspected.length !== 'number' || inspected.length !== expected) {
        throw new Error(`Expected length ${expected} but received ${inspected ? inspected.length : 'undefined'}`);
      }
    },
    toBeTruthy() {
      if (!value) {
        throw new Error(`Expected value to be truthy but received ${value}`);
      }
    },
  };
}

export async function runTests() {
  const results: string[] = [];
  for (const entry of tests) {
    try {
      await entry.fn();
      results.push(`✔ ${entry.name}`);
    } catch (error) {
      results.push(`✘ ${entry.name}: ${error instanceof Error ? error.message : String(error)}`);
      console.error(results.join('\n'));
      process.exitCode = 1;
      break;
    }
  }

  if (results.length > 0) {
    console.log(results.join('\n'));
  }
}
