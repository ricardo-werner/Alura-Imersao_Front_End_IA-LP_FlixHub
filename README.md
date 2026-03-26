# FlixHub

Projeto front-end estático inspirado em plataformas de streaming, desenvolvido com HTML5 e CSS3 como prática de estrutura semântica, layout moderno e responsividade.

## 📌 Visão geral

O projeto simula uma home de streaming com:

- menu lateral fixo;
- cabeçalho com marca FlixHub e controle de tema;
- área principal com perfis, destaque, séries, filmes, bombando e minha lista;
- rodapé com autoria, foco em inclusão digital, ano dinâmico e links institucionais.

Toda a implementação é feita em arquivos estáticos, sem build e sem framework.

## 🧱 Estrutura do projeto

```
FlixHub/
├── index.html
├── README.md
├── src/
│   ├── assets/
│   │   └── images/
│   └── scripts/
│       └── script.js
└── styles/
    ├── README.md
    ├── responsive.css
    └── style.css
```

## 🛠️ Tecnologias utilizadas

- **HTML5** (estrutura semântica e acessibilidade);
- **CSS3** (variáveis CSS, Grid Layout, gradientes, tipografia e componentes visuais).
- **JavaScript (Vanilla)** para alternância de tema com persistência em `localStorage`.
- **Lucide Icons** (CDN) para ícones de navegação lateral e tema claro/escuro.

## 🎨 Destaques de implementação

- Uso de **CSS custom properties** em `styles/style.css` para padronização de cores e espaçamentos.
- Layout principal com **CSS Grid**, incluindo área de sidebar e conteúdo central.
- Seções organizadas por `header`, `main`, `section`, `article` e `footer`.
- Header simplificado: título à esquerda e botão de toggle de tema à direita.
- Ordem de foco otimizada para teclado: `header` antes do `aside` no DOM.
- Skip links no topo para pular para conteúdo principal e controles de acessibilidade.
- Toggle de tema com microinterações visuais (hover, active e transição suave de ícones).
- Toggle de leitura para dislexia com fonte **Lexend** e persistência local.
- Toggle de baixa visão com ciclo de escala tipográfica (`100%` → `110%` → `125%`).
- Rótulo dinâmico no toggle: `Tema: Escuro` / `Tema: Claro`.
- Footer com ano automático via JavaScript (`#year-footer`).
- Navegação lateral com ícones semânticos via Lucide.
- Navegação com rótulos de acessibilidade (`aria-label`, `aria-labelledby`).
- Navegação por teclado no menu lateral com atalho por `Enter`/`Espaço` para entrar diretamente no bloco de cards da seção.
- Fluxo de retorno com botão **Voltar ao menu** ao final de cada bloco, facilitando seguir para o próximo item do menu com `Tab`.
- Navegação por setas (`↑`, `↓`, `←`, `→`) entre os cards com ciclo por bloco inteiro (último volta ao primeiro e vice-versa), além de suporte às teclas `Home` e `End`.
- `ArrowDown` na última linha de cards move foco para o botão **Voltar ao menu**; `ArrowUp` no botão retorna ao último card da seção.
- Estados de foco visíveis para links de navegação, cards e botões de ação.
- Estrutura preparada para ajustes de responsividade em `styles/responsive.css`.

## ▶️ Como executar

Como é um projeto estático, há duas formas simples:

1. Abrir o arquivo `index.html` diretamente no navegador; ou
2. Executar com uma extensão de servidor local (ex.: Live Server no VS Code).

## ✅ Status atual

- Projeto funcional para exibição da interface.
- Foco atual em **layout, estilização e acessibilidade por teclado**, com interação progressiva.
- Alternância entre tema escuro e claro com persistência local e ícones coerentes por tema (lua no escuro, sol no claro).

## 📦 Última entrega (2026-03-26)

- consolidação das melhorias de acessibilidade por teclado (menu, cards e botão de retorno);
- documentação revisada para manter consistência com a estrutura real do projeto (`FlixHub/`);
- histórico técnico centralizado em `CHANGELOG.md` para rastreabilidade de evolução.

## 📝 Histórico de mudanças

Para consulta futura das evoluções do projeto, veja `CHANGELOG.md`.

## 🚀 Próximos passos sugeridos

- expandir interações JavaScript (ex.: estado ativo de menu e seleção de perfil);
- melhorar breakpoints de responsividade para dispositivos menores;
- incluir mais estados visuais de foco/hover para acessibilidade;
- organizar componentes visuais por blocos reutilizáveis.

## 👨‍💻 Autor

Ricardo Werner
