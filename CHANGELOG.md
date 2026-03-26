# Changelog — FlixHub

Este arquivo registra a evolução do projeto para consulta futura.

## [2026-03-26]

### Added

- Estrutura inicial da landing page com HTML/CSS responsivo.
- Sidebar de navegação e seções principais (perfis, destaque, séries e filmes).
- Toggle de tema claro/escuro com persistência em `localStorage`.
- Documentação inicial do projeto e do guia de estilos.

### Changed

- Renomeação da marca de Netflix para **FlixHub** para evitar conflitos de marca.
- Atualizações de documentação e chave de persistência (`netflix-theme` → `flixhub-theme`).
- Rodapé atualizado com autoria e descrição de foco em acessibilidade/inclusão digital.
- Ano no footer passou a ser preenchido dinamicamente via JavaScript (`#year-footer`).
- Remoção de script inline do HTML, centralizando comportamentos em `src/scripts/script.js`.
- Inclusão de seção de histórico no `README.md` apontando para este changelog.

## Commits publicados

- `66a6a35` — `feat(footer): adicionar autoria e ano dinamico no rodape com docs atualizadas`
- `85d2397` — `docs(changelog): adicionar histórico inicial do FlixHub e link no README`
- `c2fb879` — `refactor(brand): renomear projeto para FlixHub e atualizar docs/persistencia`
- `66e7668` — `feat: estrutura inicial da landing page Netflix com tema claro/escuro e documentação`

## Como manter este changelog

- Adicionar uma entrada por data no formato `## [YYYY-MM-DD]`.
- Usar seções curtas: `Added`, `Changed`, `Fixed` (quando aplicável).
- Incluir os hashes dos commits principais para rastreabilidade.
