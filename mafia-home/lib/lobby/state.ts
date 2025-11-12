export type LobbyStatus = 'waiting' | 'playing';

export interface LobbyRoom {
  id: string;
  name: string;
  players: number;
  capacity: number;
  host: string;
  status: LobbyStatus;
}

export interface LobbyState {
  rooms: LobbyRoom[];
  modalOpen: boolean;
  nextRoomId: number;
}

export const defaultRooms: LobbyRoom[] = [
  { id: '1', name: 'مایندفول مافیا', players: 7, capacity: 12, host: 'آلفا', status: 'waiting' },
  { id: '2', name: 'شب طلایی', players: 10, capacity: 12, host: 'گادفادر', status: 'playing' },
  { id: '3', name: 'کلوپ حرفه‌ای', players: 5, capacity: 10, host: 'مشاور', status: 'waiting' },
];

export function createLobbyState(initialRooms: LobbyRoom[] = defaultRooms): LobbyState {
  return {
    rooms: [...initialRooms],
    modalOpen: false,
    nextRoomId: initialRooms.length + 1,
  };
}

export function openModal(state: LobbyState): LobbyState {
  return {
    ...state,
    modalOpen: true,
  };
}

export function closeModal(state: LobbyState): LobbyState {
  return {
    ...state,
    modalOpen: false,
  };
}

export interface CreateRoomInput {
  name: string;
  capacity: number;
  host: string;
}

export function addRoom(state: LobbyState, input: CreateRoomInput): LobbyState {
  const trimmedName = input.name.trim();
  const trimmedHost = input.host.trim();
  if (!trimmedName) {
    throw new Error('نام اتاق الزامی است');
  }
  if (!trimmedHost) {
    throw new Error('نام میزبان الزامی است');
  }
  if (Number.isNaN(input.capacity) || input.capacity < 4) {
    throw new Error('ظرفیت نامعتبر است');
  }

  const newRoom: LobbyRoom = {
    id: state.nextRoomId.toString(),
    name: trimmedName,
    players: 1,
    capacity: input.capacity,
    host: trimmedHost,
    status: 'waiting',
  };

  return {
    rooms: [...state.rooms, newRoom],
    modalOpen: false,
    nextRoomId: state.nextRoomId + 1,
  };
}
