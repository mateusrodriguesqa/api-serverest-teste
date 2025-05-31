import { test, expect } from '@playwright/test';
import { BASE_URL, DEFAULT_USER } from '../../../config/environment.js';

test('PUT /produtos/:id - Atualizar produto com sucesso', async ({ request }) => {
  const login = await request.post(`${BASE_URL}/login`, {
    data: DEFAULT_USER
  });

  expect(login.status()).toBe(200);
  const { authorization: token } = await login.json();
  expect(token).toBeDefined();

  const produtoCriado = await request.post(`${BASE_URL}/produtos`, {
    data: {
      nome: `Produto PUT ${Date.now()}`,
      preco: 100,
      descricao: 'Produto criado para teste de PUT',
      quantidade: 10
    },
    headers: { authorization: token }
  });

  const { _id } = await produtoCriado.json();
  expect(_id).toBeDefined();

  const res = await request.put(`${BASE_URL}/produtos/${_id}`, {
    data: {
      nome: `Produto Atualizado ${Date.now()}`, 
      preco: 150,
      descricao: 'Atualizado com sucesso',
      quantidade: 20
    },
    headers: { authorization: token }
  });

  const body = await res.json();

  expect(res.status()).toBe(200);
  expect(body.message).toBe('Registro alterado com sucesso');
});
