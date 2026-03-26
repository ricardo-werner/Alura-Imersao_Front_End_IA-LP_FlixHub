# Changelog — FlixHub

Este arquivo registra a evolução do projeto para consulta futura.

## [2026-03-26]

### Added

- Estrutura inicial da landing page com HTML/CSS responsivo.
- Sidebar de navegação e seções principais (perfis, destaque, séries e filmes).
- Toggle de tema claro/escuro com persistência em `localStorage`.
- Documentação inicial do projeto e do guia de estilos.
- Seções `Bombando` e `Minha Lista` no conteúdo principal para corresponder ao menu lateral.
- Botão **Voltar ao menu** em cada seção de mídia para retorno rápido ao item correspondente da sidebar.

### Changed

- Renomeação da marca de Netflix para **FlixHub** para evitar conflitos de marca.
- Atualizações de documentação e chave de persistência (`netflix-theme` → `flixhub-theme`).
- Rodapé atualizado com autoria e descrição de foco em acessibilidade/inclusão digital.
- Ano no footer passou a ser preenchido dinamicamente via JavaScript (`#year-footer`).
- Remoção de script inline do HTML, centralizando comportamentos em `src/scripts/script.js`.
- Inclusão de seção de histórico no `README.md` apontando para este changelog.
- Navegação por teclado otimizada com foco inicial no `header` e skip links para conteúdo e controles de acessibilidade.
- Inclusão de modo de leitura para dislexia com fonte **Lexend** e persistência local.
- Inclusão de modo de baixa visão com escala tipográfica em ciclo (`100%` → `110%` → `125%`) e persistência local.
- Navegação via teclado no menu lateral com `Enter`/`Espaço` para focar o primeiro card da seção (`Séries`, `Filmes`, `Bombando`, `Minha Lista`).
- Ajustes visuais de foco (`:focus-visible`) em links do menu lateral, cards focáveis e botão de retorno.
- Navegação por teclado entre cards com setas direcionais (`↑`, `↓`, `←`, `→`) e suporte para `Home`/`End`.
- Ajuste da navegação por setas para comportamento cíclico por bloco inteiro (último card → primeiro card, e vice-versa).

## Commits publicados

- `2c77219` — `feat(a11y): melhorar fluxo de teclado entre menu e seções de mídia`

- `83ea66e` — `feat(a11y): adicionar baixa visao com escala 100 110 125 e persistencia`
- `b4e37d9` — `feat(a11y): adicionar modo dislexia com fonte Lexend e persistencia`
- `69b3815` — `feat(a11y): priorizar header no foco e adicionar skip links`
- `66a6a35` — `feat(footer): adicionar autoria e ano dinamico no rodape com docs atualizadas`
- `85d2397` — `docs(changelog): adicionar histórico inicial do FlixHub e link no README`
- `c2fb879` — `refactor(brand): renomear projeto para FlixHub e atualizar docs/persistencia`
- `66e7668` — `feat: estrutura inicial da landing page Netflix com tema claro/escuro e documentação`

## Como manter este changelog

- Adicionar uma entrada por data no formato `## [YYYY-MM-DD]`.
- Usar seções curtas: `Added`, `Changed`, `Fixed` (quando aplicável).
- Incluir os hashes dos commits principais para rastreabilidade.
