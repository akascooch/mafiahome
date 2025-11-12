import fs from 'fs/promises';
import path from 'path';

export interface OtpRecord {
  phone: string;
  code: string;
  expiresAt: number;
  attempts: number;
}

const DATA_FILE = path.join(process.cwd(), 'lib', 'api', 'data', 'otp-store.json');
const OTP_TTL = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 3;

async function readStore(): Promise<OtpRecord[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as OtpRecord[];
    }
    return [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, '[]', 'utf-8');
      return [];
    }
    throw error;
  }
}

async function writeStore(records: OtpRecord[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(records, null, 2), 'utf-8');
}

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function requestOtp(phone: string): Promise<OtpRecord> {
  const normalizedPhone = phone.trim();
  if (!/^\d{10,15}$/.test(normalizedPhone)) {
    throw new Error('شماره تلفن نامعتبر است');
  }

  const store = await readStore();
  const existing = store.find((record) => record.phone === normalizedPhone);
  const now = Date.now();

  const record: OtpRecord = {
    phone: normalizedPhone,
    code: generateOtp(),
    expiresAt: now + OTP_TTL,
    attempts: 0,
  };

  if (existing) {
    Object.assign(existing, record);
  } else {
    store.push(record);
  }

  await writeStore(store);
  return record;
}

export async function verifyOtp(phone: string, code: string): Promise<boolean> {
  const normalizedPhone = phone.trim();
  const normalizedCode = code.trim();
  const store = await readStore();
  const record = store.find((entry) => entry.phone === normalizedPhone);

  if (!record) {
    return false;
  }

  if (Date.now() > record.expiresAt) {
    await removeOtp(normalizedPhone, store);
    return false;
  }

  record.attempts += 1;
  const isValid = record.code === normalizedCode && record.attempts <= MAX_ATTEMPTS;

  if (isValid) {
    await removeOtp(normalizedPhone, store);
    return true;
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    await removeOtp(normalizedPhone, store);
  } else {
    await writeStore(store);
  }

  return false;
}

async function removeOtp(phone: string, store?: OtpRecord[]): Promise<void> {
  const currentStore = store ?? (await readStore());
  const filtered = currentStore.filter((record) => record.phone !== phone);
  await writeStore(filtered);
}

export async function clearOtpStore(): Promise<void> {
  await writeStore([]);
}

export const otpTestingUtils = {
  readStore,
  writeStore,
  removeOtp,
};
