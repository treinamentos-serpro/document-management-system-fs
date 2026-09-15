---
description: "Gera testes unitários simplificados para um arquivo do frontend (componentes ou services)"
agent: "agent"
argument-hint: "Caminho do arquivo do frontend a ser testado"
---

Gere testes unitários **em modo simplificado** para o arquivo indicado em
`frontend/src` (componente, service, etc.). Siga estritamente estas regras:

## Escopo do "modo simplificado"

- Cubra apenas os casos essenciais: caminho feliz, principais tratamentos de
  erro e condições de borda óbvias (ex.: parâmetro ausente/vazio).
- Não crie suíte exaustiva de cenários (não é necessário testar cada
  combinação possível de props/estados).
- Prefira poucos testes bem escolhidos a muitos testes redundantes.
- Sem overengineering: sem mocks complexos, sem helpers genéricos criados só
  para um teste.

## Ferramental

- Use `vitest` como test runner e `@testing-library/react` para componentes
  React (adicione essas dependências em `frontend/package.json` como
  `devDependencies` e um script `"test": "vitest run"` caso ainda não
  existam).
- Para funções puras (ex.: arquivos em `services/`), teste diretamente a
  função exportada, sem necessidade de `@testing-library/react`.
- Mock chamadas de rede (`fetch`) com `vi.fn()`/`vi.stubGlobal`, sem libs
  externas de mock.

## Convenções do projeto

- Arquivos de teste ficam ao lado do arquivo testado ou em uma pasta
  `__tests__/`, com sufixo `.test.jsx`/`.test.js`.
- Nomes de símbolos em inglês; descrições dos testes (`it`/`describe`) em
  português, curtas e descritivas.
- Não quebrar funcionalidades existentes nem alterar o código de produção
  além do necessário para tornar o teste executável.

## Saída esperada

1. Arquivo de teste criado.
2. Se necessário, ajuste em `frontend/package.json` (dependências/scripts).
3. Resumo breve dos casos cobertos.
