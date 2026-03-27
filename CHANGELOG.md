# Changelog — FlixHub

Este arquivo registra a evolução do projeto para consulta futura.

## [2026-03-27]

### Changed

- Seção de perfis tornou-se interativa com seleção de **perfil ativo** e indicação textual em tempo real (`Perfil ativo: ...`).
- Seção **Minha lista** passou de conteúdo estático para renderização dinâmica por perfil, com título contextual (`Minha lista — Perfil X`).
- Fluxo de bloqueio ao acessar **Minha Lista** sem perfil selecionado foi migrado para `dialog` nativo acessível (substituindo abordagem com `alert`).
- Cards das seções `Séries`, `Filmes` e `Bombando` foram adaptados para suportar ações explícitas de lista com feedback visual por estado (`aria-pressed`).
- Ajustes de CSS/Responsividade para suportar os novos botões de ação nos cards sem quebrar layout em mobile.
- Script do Lucide fixado em versão estável (`0.468.0`) para evitar regressões por uso de `@latest`.
- Inicialização dos ícones Lucide reforçada com tentativa de re-renderização para mitigar atraso de carregamento da biblioteca.
- Corrigido `ReferenceError` de inicialização (`bindMediaCardKeyboardNavigation`) que interrompia a execução do script e bloqueava a renderização dos ícones no aside e nos toggles.
- Corrigida a aplicação da responsividade ao mover o carregamento de `styles/responsive.css` para o `index.html` e remover `@import` inválido no fim de `styles/style.css`.
- Refatorados breakpoints para estratégia **mobile-first** alinhada ao padrão de mercado (`sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`).
- Melhorada a experiência em telas pequenas (header/toggles em coluna, ajustes de grid e cards) com progressão responsiva por `min-width`.
- Melhorada UX mobile de acessibilidade no header com menu hambúrguer (`Acessibilidade`), painel expansível e botão `X` para fechamento após configuração.

### Fixed

- Corrigido desalinhamento do menu de acessibilidade em telas pequenas, com centralização do botão e do painel expandido no header.
- Refinado o header mobile para manter o título `FLIXHUB` no topo e os controles de acessibilidade abaixo (layout em coluna), evitando sobreposição visual.
- Reduzida a largura do painel de acessibilidade no mobile para uma apresentação mais compacta e proporcional em dispositivos pequenos.

### Added

- Persistência de estado de perfil ativo (`perfilAtivo`) e de listas por perfil (`minhaListaPorPerfil`) em `localStorage`.
- Botão de ação **Adicionar/Remover da minha lista** em cada card de catálogo (`Séries`, `Filmes`, `Bombando`).
- `dialog` de orientação com ações de fechar e de navegação para a seção `Quem está assistindo?`.
- Estados vazios orientativos para `Minha lista` (sem perfil ativo e perfil sem itens).
- Novo arquivo `teste/responsive.css` com regras de responsividade desacopladas para reutilização em futuros projetos/labs.

## [2026-03-26]

### Added

- Estrutura inicial da landing page com HTML/CSS responsivo.
- Sidebar de navegação e seções principais (perfis, destaque, séries e filmes).
- Toggle de tema claro/escuro com persistência em `localStorage`.
- Documentação inicial do projeto e do guia de estilos.
- Seções `Bombando` e `Minha Lista` no conteúdo principal para corresponder ao menu lateral.
- Botão **Voltar ao menu** em cada seção de mídia para retorno rápido ao item correspondente da sidebar.
- Laboratório local de acessibilidade em `./teste` com três arquivos (`index.html`, `style.css`, `script.js`) espelhando navegação por teclado e toggles.

### Changed

- Renomeação da marca anterior para **FlixHub** para manter coerência de identidade.
- Atualizações de documentação e chave de persistência (chave anterior → `flixhub-theme`).
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
- Ajuste adicional da navegação por setas para alcançar o botão **Voltar ao menu** com `ArrowDown` na última linha e retornar aos cards com `ArrowUp`.
- Documentação revisada para refletir a pasta raiz real do projeto (`FlixHub/`) e manter alinhamento entre estrutura e guias.
- Guia de estilos atualizado com recomendações de foco (`:focus-visible`) alinhadas ao estado atual da implementação.
- Inclusão de `./teste` no `.gitignore` para manter o laboratório fora do versionamento padrão.
- Correção do `.gitignore` para usar padrões efetivos (`teste/` e `.teste/`) e garantir que pastas locais de laboratório não subam ao remoto.

## Commits publicados

- `21e8255` — `feat(a11y): permitir seta alcançar botão voltar ao menu`
- `908280e` — `feat(a11y): tornar navegação por setas cíclica por bloco`
- `305067c` — `feat(a11y): adicionar navegação por setas entre cards`
- `70dc312` — `feat(a11y): melhorar fluxo de teclado entre menu e seções de mídia`
- `8d1c3af` — `docs(changelog): registrar melhorias de acessibilidade e commits A11Y`
- `26c6653` — `feat(a11y): adicionar baixa visao com escala 100 110 125 e persistencia`
- `8beb74a` — `feat(a11y): adicionar modo dislexia com fonte Lexend e persistencia`
- `76ec126` — `feat(a11y): priorizar header no foco e adicionar skip links`
- `a9756b2` — `docs(changelog): registrar update do footer e commits recentes`
- `d818fff` — `feat(footer): adicionar autoria e ano dinamico no rodape com docs atualizadas`
- `4bdc49a` — `docs(changelog): adicionar histórico inicial do FlixHub e link no README`
- `1843d29` — `refactor(brand): renomear projeto para FlixHub e atualizar docs/persistencia`
- `e2ea45d` — `feat: estrutura inicial da landing page FlixHub com tema claro/escuro e documentação`

## Como manter este changelog

- Adicionar uma entrada por data no formato `## [YYYY-MM-DD]`.
- Usar seções curtas: `Added`, `Changed`, `Fixed` (quando aplicável).
- Incluir os hashes dos commits principais para rastreabilidade.
