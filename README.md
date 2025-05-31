Tecnologias Utilizadas

Node.js
Playwright
JavaScript

Para executar todos os testes:
npx playwright test

Para executar testes com relatório HTML:
npx playwright test --reporter=html

Para abrir o último relatório gerado:
npx playwright show-report

Para rodar um arquivo de teste específico:
npx playwright test tests/api/products/positive/post-product.spec.js

Configuração do Ambiente

As variáveis de ambiente estão centralizadas no arquivo:
config/environment.js

Exemplo:

export const BASE_URL = 'https://serverest.dev';
export const DEFAULT_USER = {
  email: 'fulano@qa.com',
  password: 'teste'
};

Boas Práticas Adotadas:
Separacão clara entre cenários positivos e negativos
Utilização de variáveis de ambiente centralizadas
Uso de dados dinâmicos com Date.now() para evitar conflitos
Geração de relatórios interativos em HTML
Integração com CI/CD
