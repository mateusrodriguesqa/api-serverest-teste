import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../../config/environment.js';

test('GET /usuarios - Deve retornar lista de usuários com status 200', async ({ request }) => {
  const res = await request.get(`${BASE_URL}/usuarios`);
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('application/json');

  const body = await res.json();
  expect(Array.isArray(body.usuarios)).toBe(true);
});
