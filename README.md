# 1-Netflix

Projeto front-end estático inspirado na interface da Netflix, desenvolvido com HTML5 e CSS3 como prática de estrutura semântica, layout moderno e responsividade.

## 📌 Visão geral

O projeto simula uma home de streaming com:

- menu lateral fixo;
- cabeçalho com marca da Netflix e controle de tema;
- área principal com perfis, destaque, séries e filmes;
- rodapé com links institucionais.

Toda a implementação é feita em arquivos estáticos, sem build e sem framework.

## 🧱 Estrutura do projeto

```
1-Netflix/
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
- Toggle de tema com microinterações visuais (hover, active e transição suave de ícones).
- Rótulo dinâmico no toggle: `Tema: Escuro` / `Tema: Claro`.
- Navegação lateral com ícones semânticos via Lucide.
- Navegação com rótulos de acessibilidade (`aria-label`, `aria-labelledby`).
- Estrutura preparada para ajustes de responsividade em `styles/responsive.css`.

## ▶️ Como executar

Como é um projeto estático, há duas formas simples:

1. Abrir o arquivo `index.html` diretamente no navegador; ou
2. Executar com uma extensão de servidor local (ex.: Live Server no VS Code).

## ✅ Status atual

- Projeto funcional para exibição da interface.
- Foco atual em **layout e estilização**, com interação básica de tema.
- Alternância entre tema escuro e claro com persistência local e ícones coerentes por tema (lua no escuro, sol no claro).

## 🚀 Próximos passos sugeridos

- expandir interações JavaScript (ex.: estado ativo de menu e seleção de perfil);
- melhorar breakpoints de responsividade para dispositivos menores;
- incluir mais estados visuais de foco/hover para acessibilidade;
- organizar componentes visuais por blocos reutilizáveis.

## 👨‍💻 Autor

Ricardo Werner
