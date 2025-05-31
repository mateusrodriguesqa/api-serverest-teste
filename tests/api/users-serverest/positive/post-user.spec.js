import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../../config/environment.js';

test('POST /usuarios - Criar usuário com sucesso', async ({ request }) => {
  const payload = {
    nome: 'Usuário Positivo',
    email: `positivo_${Date.now()}@qa.com`,
    password: '123456',
    administrador: 'true'
  };

  const res = await request.post(`${BASE_URL}/usuarios`, { data: payload });

  expect(res.status()).toBe(201);
  expect(res.headers()['content-type']).toContain('application/json');

  const body = await res.json();
  expect(body.message).toBe('Cadastro realizado com sucesso');
});
