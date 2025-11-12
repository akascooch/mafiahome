import Head from 'next/head';
import { FormEvent, useMemo, useState } from 'react';
import {
  createLobbyState,
  addRoom,
  openModal,
  closeModal,
  defaultRooms,
} from '../../lib/lobby/state';

interface CreateRoomForm {
  name: string;
  host: string;
  capacity: string;
}

const LobbyPage = () => {
  const [state, setState] = useState(() => createLobbyState());
  const [form, setForm] = useState<CreateRoomForm>({ name: '', host: '', capacity: '10' });
  const [error, setError] = useState<string | null>(null);
  const activeRooms = useMemo(() => state.rooms.filter((room) => room.status === 'waiting'), [state.rooms]);

  const handleCreateRoom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      const nextState = addRoom(state, {
        name: form.name,
        host: form.host,
        capacity: Number(form.capacity),
      });
      setState(nextState);
      setForm({ name: '', host: '', capacity: '10' });
    } catch (err) {
      setError((err as Error).message);
      return;
    }
  };

  const handleOpenModal = () => {
    setState((current) => openModal(current));
    setError(null);
  };

  const handleCloseModal = () => {
    setState((current) => closeModal(current));
  };

  const roomsToRender = useMemo(() => state.rooms, [state.rooms]);

  return (
    <>
      <Head>
        <title>لابی مافیا | Mafia Home</title>
      </Head>
      <div className="min-h-screen bg-neutral-950 text-yellow-400 px-6 py-10">
        <div className="max-w-5xl mx-auto space-y-10">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">لابی مافیا</h1>
              <p className="text-yellow-200/70 text-sm">به اتاق‌های زنده مافیا بپیوندید یا اتاق جدید بسازید.</p>
            </div>
            <button
              type="button"
              data-testid="open-create-room"
              onClick={handleOpenModal}
              className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-neutral-900 shadow-lg shadow-yellow-700/30 transition-transform hover:scale-105 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              ایجاد اتاق جدید
            </button>
          </header>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">اتاق‌های فعال</h2>
              <span className="text-sm text-yellow-300/70">{activeRooms.length} اتاق منتظر بازیکن</span>
            </div>
            <ul className="grid gap-4 md:grid-cols-2">
              {roomsToRender.map((room) => (
                <li
                  key={room.id}
                  className="rounded-2xl border border-yellow-700/40 bg-neutral-900/60 p-5 shadow-xl shadow-yellow-900/20"
                  data-testid={`room-${room.id}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-yellow-200">{room.name}</h3>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wide ${
                        room.status === 'waiting' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {room.status === 'waiting' ? 'منتظر' : 'در حال بازی'}
                    </span>
                  </div>
                  <dl className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1 text-sm text-yellow-300/80">
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-yellow-600">میزبان</dt>
                      <dd>{room.host}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-yellow-600">بازیکنان</dt>
                      <dd>
                        {room.players} / {room.capacity}
                      </dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    className="mt-4 w-full rounded-lg border border-yellow-600/40 bg-transparent py-2 text-sm font-semibold text-yellow-200 transition-colors hover:bg-yellow-600/10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    پیوستن
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {state.modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            role="dialog"
            aria-modal="true"
            data-testid="create-room-modal"
          >
            <div className="w-full max-w-md rounded-2xl border border-yellow-700/40 bg-neutral-900 p-6 shadow-2xl shadow-yellow-900/40">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">ایجاد اتاق جدید</h2>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-yellow-400 transition hover:text-yellow-200 focus:outline-none"
                  aria-label="بستن"
                >
                  ×
                </button>
              </div>
              <form className="mt-4 space-y-4" onSubmit={handleCreateRoom}>
                <div>
                  <label htmlFor="room-name" className="block text-sm font-medium text-yellow-300">نام اتاق</label>
                  <input
                    id="room-name"
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    className="mt-1 w-full rounded-lg border border-yellow-700/40 bg-neutral-950 px-3 py-2 text-yellow-200 placeholder-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="مثال: اتاق استراتژی"
                    data-testid="room-name-input"
                  />
                </div>
                <div>
                  <label htmlFor="room-host" className="block text-sm font-medium text-yellow-300">میزبان</label>
                  <input
                    id="room-host"
                    value={form.host}
                    onChange={(event) => setForm((current) => ({ ...current, host: event.target.value }))}
                    className="mt-1 w-full rounded-lg border border-yellow-700/40 bg-neutral-950 px-3 py-2 text-yellow-200 placeholder-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="نام شما"
                    data-testid="room-host-input"
                  />
                </div>
                <div>
                  <label htmlFor="room-capacity" className="block text-sm font-medium text-yellow-300">ظرفیت</label>
                  <input
                    id="room-capacity"
                    type="number"
                    min={4}
                    max={20}
                    value={form.capacity}
                    onChange={(event) => setForm((current) => ({ ...current, capacity: event.target.value }))}
                    className="mt-1 w-full rounded-lg border border-yellow-700/40 bg-neutral-950 px-3 py-2 text-yellow-200 placeholder-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    data-testid="room-capacity-input"
                  />
                </div>
                {error && (
                  <p className="text-sm text-rose-400" role="alert">
                    {error}
                  </p>
                )}
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="rounded-lg border border-yellow-700/40 px-4 py-2 text-sm font-semibold text-yellow-200 transition hover:bg-yellow-700/10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    data-testid="submit-create-room"
                  >
                    ساخت اتاق
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export const lobbyDefaults = {
  defaultRooms,
};

export default LobbyPage;
