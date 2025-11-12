import fs from 'fs/promises';
import path from 'path';
import { clearOtpStore, requestOtp, verifyOtp } from '../../lib/api/otp';
import { expect, test } from './test-runner';

const dataFile = path.join(process.cwd(), 'lib', 'api', 'data', 'otp-store.json');

async function readStore() {
  const raw = await fs.readFile(dataFile, 'utf-8');
  return JSON.parse(raw) as Array<Record<string, unknown>>;
}

test('generates and persists OTP for a phone number', async () => {
  await clearOtpStore();
  const record = await requestOtp('09120000000');
  expect(record.phone).toBe('09120000000');
  expect(record.code.length).toBe(6);

  const stored = await readStore();
  expect(stored.length).toBe(1);
  const [saved] = stored;
  expect(saved.phone as string).toBe('09120000000');
  expect((saved.code as string).length).toBe(6);
});

test('verifies otp within allowed attempts and removes it', async () => {
  await clearOtpStore();
  const { phone, code } = await requestOtp('09123334444');
  const isValid = await verifyOtp(phone, code);
  expect(isValid).toBe(true);

  const stored = await readStore();
  expect(stored.length).toBe(0);
});

test('fails verification after max attempts', async () => {
  await clearOtpStore();
  const { phone } = await requestOtp('09124445555');

  expect(await verifyOtp(phone, '111111')).toBe(false);
  expect(await verifyOtp(phone, '222222')).toBe(false);
  expect(await verifyOtp(phone, '333333')).toBe(false);

  const stored = await readStore();
  expect(stored.length).toBe(0);
});
