import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../../config/environment.js';

test('POST /produtos - Deve retornar erro ao criar produto sem token', async ({ request }) => {
  const payload = {
    nome: 'Produto Sem Token',
    preco: 100,
    descricao: 'Sem token',
    quantidade: 1
  };

  const res = await request.post(`${BASE_URL}/produtos`, {
    data: payload
  });

  expect(res.status()).toBe(401);

  const body = await res.json();
  expect(body.message).toBe('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
});
