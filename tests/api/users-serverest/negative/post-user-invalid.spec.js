import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../../config/environment.js';

test('POST /usuarios - Deve retornar erro ao tentar criar com e-mail já existente', async ({ request }) => {
  const email = `duplicado_${Date.now()}@qa.com`;

  await request.post(`${BASE_URL}/usuarios`, {
    data: {
      nome: 'Usuário Original',
      email,
      password: '123456',
      administrador: 'true'
    }
  });

  const res = await request.post(`${BASE_URL}/usuarios`, {
    data: {
      nome: 'Usuário Repetido',
      email,
      password: '123456',
      administrador: 'true'
    }
  });

  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(body).toHaveProperty('message');
  expect(body.message).toBe('Este email já está sendo usado');
});
