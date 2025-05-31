import { test, expect } from '@playwright/test';
import { BASE_URL, DEFAULT_USER } from '../../../config/environment.js';

test('PUT /produtos/:id - Deve retornar erro ao atualizar com ID inválido', async ({ request }) => {
  const loginResponse = await request.post(`${BASE_URL}/login`, {
    data: DEFAULT_USER
  });

  expect(loginResponse.status()).toBe(200);
  const { authorization: token } = await loginResponse.json();
  expect(token).toBeDefined();

  const res = await request.put(`${BASE_URL}/produtos/000000000000000000000000`, {
    data: {
      nome: 'Produto Atualização Inválido',
      preco: 100,
      descricao: 'Atualização negativa',
      quantidade: 3
    },
    headers: {
      authorization: token
    }
  });

  expect(res.status()).toBe(400);
  const body = await res.json();

  expect(body).toHaveProperty('id');
  expect(typeof body.id).toBe('string');
  expect(body.id).toBe('id deve ter exatamente 16 caracteres alfanuméricos');
});
