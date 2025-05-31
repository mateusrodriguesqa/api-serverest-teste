import { test, expect } from '@playwright/test';
import { BASE_URL, DEFAULT_USER } from '../../../config/environment.js';

test('POST /produtos - Criar produto com sucesso', async ({ request }) => {
  const login = await request.post(`${BASE_URL}/login`, {
    data: DEFAULT_USER
  });

  expect(login.status()).toBe(200);
  const { authorization: token } = await login.json();
  expect(token).toBeDefined();

  const payload = {
    nome: `Produto Teste ${Date.now()}`,
    preco: 100,
    descricao: 'Produto de teste automatizado',
    quantidade: 5
  };
  
  const res = await request.post(`${BASE_URL}/produtos`, {
    data: payload,
    headers: { authorization: token }
  });

  expect(res.status()).toBe(201);
  const body = await res.json();
  expect(body.message).toBe('Cadastro realizado com sucesso');
});
