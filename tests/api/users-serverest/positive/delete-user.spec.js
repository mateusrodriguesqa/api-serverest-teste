import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../../config/environment.js';

test('DELETE /usuarios/:id - Remover usuário com sucesso', async ({ request }) => {
  const novo = await request.post(`${BASE_URL}/usuarios`, {
    data: {
      nome: 'Delete User',
      email: `delete_${Date.now()}@qa.com`,
      password: '123456',
      administrador: 'true'
    }
  });

  const id = (await novo.json())._id;

  const res = await request.delete(`${BASE_URL}/usuarios/${id}`);
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body.message).toBe('Registro excluído com sucesso');
});
