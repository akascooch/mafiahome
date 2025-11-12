import { test, expect } from './playwright-stub';

const NEW_ROOM_NAME = 'اتاق طلایی';
const NEW_ROOM_HOST = 'گادفادر';

test('کاربر لیست اتاق‌ها را می‌بیند و می‌تواند اتاق بسازد', async ({ page }) => {
  await page.goto('/lobby');

  const rooms = page.getRooms();
  expect(rooms.length).toBeGreaterThan(0);
  expect(page.isModalVisible()).toBe(false);

  await page.openCreateRoomModal();
  expect(page.isModalVisible()).toBe(true);

  await page.fillCreateRoomForm({
    name: NEW_ROOM_NAME,
    host: NEW_ROOM_HOST,
    capacity: 12,
  });

  await page.submitCreateRoomForm();
  expect(page.isModalVisible()).toBe(false);
  expect(page.getRoomNames()).toSatisfy((names) => names.includes(NEW_ROOM_NAME));
});
