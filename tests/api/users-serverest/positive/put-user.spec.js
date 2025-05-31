import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../../config/environment.js';

test('PUT /usuarios/:id - Atualizar usuário com sucesso', async ({ request }) => {
  const novo = await request.post(`${BASE_URL}/usuarios`, {
    data: {
      nome: 'PUT User',
      email: `put_${Date.now()}@qa.com`,
      password: '123456',
      administrador: 'true'
    }
  });

  const id = (await novo.json())._id;
  const res = await request.put(`${BASE_URL}/usuarios/${id}`, {
    data: {
      nome: 'PUT Atualizado',
      email: `put_atualizado_${Date.now()}@qa.com`,
      password: '654321',
      administrador: 'false'
    }
  });

  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.message).toBe('Registro alterado com sucesso');
});
