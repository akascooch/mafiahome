import { addRoom, closeModal, createLobbyState, openModal, type CreateRoomInput, type LobbyState } from '../../lib/lobby/state';

type TestFunction = (context: { page: LobbyPageStub }) => Promise<void> | void;

interface RegisteredTest {
  name: string;
  fn: TestFunction;
}

const tests: RegisteredTest[] = [];

export function test(name: string, fn: TestFunction) {
  tests.push({ name, fn });
}

export function expect<T>(value: T) {
  return {
    toBe(expected: T) {
      if (value !== expected) {
        throw new Error(`Expected ${JSON.stringify(value)} to be ${JSON.stringify(expected)}`);
      }
    },
    toBeGreaterThan(expected: number) {
      if (typeof value !== 'number' || value <= expected) {
        throw new Error(`Expected ${value} to be greater than ${expected}`);
      }
    },
    toBeTruthy() {
      if (!value) {
        throw new Error(`Expected value to be truthy but received ${value}`);
      }
    },
    toContain(expected: unknown) {
      if (!Array.isArray(value) || !value.includes(expected)) {
        throw new Error(`Expected array to contain ${JSON.stringify(expected)}, but it did not.`);
      }
    },
    toSatisfy(predicate: (val: T) => boolean) {
      if (!predicate(value)) {
        throw new Error('Expectation did not satisfy provided predicate.');
      }
    },
  };
}

export class LobbyPageStub {
  private state: LobbyState = createLobbyState();
  private draft: Partial<CreateRoomInput> = { capacity: 10 };

  async goto(path: string) {
    if (path !== '/lobby') {
      throw new Error(`Unsupported path: ${path}`);
    }
    this.state = createLobbyState();
    this.draft = { capacity: 10 };
  }

  getRooms() {
    return this.state.rooms;
  }

  getRoomNames() {
    return this.state.rooms.map((room) => room.name);
  }

  isModalVisible() {
    return this.state.modalOpen;
  }

  async openCreateRoomModal() {
    this.state = openModal(this.state);
  }

  async closeCreateRoomModal() {
    this.state = closeModal(this.state);
  }

  async fillCreateRoomForm(input: Partial<CreateRoomInput>) {
    this.draft = { ...this.draft, ...input };
  }

  async submitCreateRoomForm() {
    const capacity = typeof this.draft.capacity === 'number' ? this.draft.capacity : Number(this.draft.capacity ?? 10);
    this.state = addRoom(this.state, {
      name: this.draft.name ?? '',
      host: this.draft.host ?? '',
      capacity,
    });
    this.draft = { capacity: 10 };
  }
}

export async function runTests() {
  const results: string[] = [];
  for (const entry of tests) {
    const page = new LobbyPageStub();
    const context = { page };
    try {
      await entry.fn(context);
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

export function resetTests() {
  tests.splice(0, tests.length);
}
