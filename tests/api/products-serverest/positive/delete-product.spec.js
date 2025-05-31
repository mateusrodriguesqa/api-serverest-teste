import { test, expect } from '@playwright/test';
import { BASE_URL, DEFAULT_USER } from '../../../config/environment.js';

test('DELETE /produtos/:id - Remover produto com sucesso', async ({ request }) => {
  const login = await request.post(`${BASE_URL}/login`, {
    data: DEFAULT_USER
  });
  const { authorization: token } = await login.json();
  expect(token).toBeDefined();

  const novo = await request.post(`${BASE_URL}/produtos`, {
    data: {
      nome: `Produto DELETE ${Date.now()}`,
      preco: 70,
      descricao: 'Produto deletável',
      quantidade: 1
    },
    headers: { authorization: token }
  });

  const { _id: id } = await novo.json();
  expect(id).toBeDefined();

  const res = await request.delete(`${BASE_URL}/produtos/${id}`, {
    headers: { authorization: token }
  });

  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.message).toBe('Registro excluído com sucesso');
});
