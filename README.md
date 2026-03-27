# FlixHub

Projeto front-end estático inspirado em plataformas de streaming, desenvolvido com HTML5 e CSS3 como prática de estrutura semântica, layout moderno e responsividade.

## 📌 Visão geral

O projeto simula uma home de streaming com:

- menu lateral fixo;
- cabeçalho com marca FlixHub e controle de tema;
- área principal com perfis, destaque, séries, filmes, bombando e minha lista;
- seleção de perfil ativo com persistência local;
- seção **Minha Lista** personalizada por perfil, com adição/remoção de títulos;
- rodapé com autoria, foco em inclusão digital, ano dinâmico e links institucionais.

Toda a implementação é feita em arquivos estáticos, sem build e sem framework.

## 🧱 Estrutura do projeto

```
FlixHub/
├── index.html
├── README.md
├── .gitignore
├── teste/
│   ├── index.html
│   ├── style.css
│   └── script.js
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
- Seleção de perfil com indicação de contexto ativo (`Perfil ativo: ...`) e persistência em `localStorage`.
- Fluxo guiado com `dialog` acessível quando o usuário tenta abrir **Minha Lista** sem perfil selecionado.
- Ações explícitas de **Adicionar/Remover da minha lista** nos cards de `Séries`, `Filmes` e `Bombando`.
- Renderização dinâmica da seção **Minha Lista** por perfil ativo, incluindo estados vazios informativos.
- Integração com **Lucide Icons** estabilizada com versão CDN fixada e inicialização resiliente para evitar desaparecimento de ícones.
- Correção de ordem de inicialização no JavaScript para evitar erro em runtime que interrompia carregamento da UI.
- Correção de carregamento da folha responsiva (`styles/responsive.css`) para garantir aplicação dos breakpoints em dispositivos móveis.
- Breakpoints refatorados em estratégia mobile-first no padrão atual de mercado (`sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`).
- Em telas pequenas, os controles de acessibilidade do header agora usam menu hambúrguer com abertura/fechamento explícito para reduzir ocupação fixa na viewport.
- Em telas pequenas, o botão e o painel do menu de acessibilidade agora permanecem centralizados para evitar desalinhamento visual.
- Em telas pequenas, o header prioriza UX em coluna: título no topo e menu de acessibilidade abaixo, preservando hierarquia visual e leitura.
- Painel mobile de acessibilidade refinado para proporção mais compacta, evitando botões exagerados em largura.
- Em telas pequenas, o título `FLIXHUB` e o botão `Acessibilidade` permanecem centralizados para melhor equilíbrio visual.
- Em telas pequenas, os botões do painel de acessibilidade foram compactados e padronizados para acompanhar a largura do botão `Acessibilidade`.
- Refinamentos extras de responsividade aplicados para telas muito pequenas (ex.: 320px), com espaçamentos, tipografia e largura dos controles ajustados para evitar quebra visual.
- Navegação lateral no mobile recebeu ajuste de alinhamento para melhor distribuição dos itens sem perder consistência nos breakpoints maiores.
- A área de acessibilidade no header passa para `flex-direction: row` somente a partir do breakpoint `md` (`768px`), preservando o fluxo empilhado abaixo disso.
- A lógica JavaScript do menu de acessibilidade também foi alinhada para considerar comportamento desktop somente em `md` (`768px`), mantendo consistência entre CSS e interação.
- Estrutura preparada para ajustes de responsividade em `styles/responsive.css`.

## ▶️ Como executar

Como é um projeto estático, há duas formas simples:

1. Abrir o arquivo `index.html` diretamente no navegador; ou
2. Executar com uma extensão de servidor local (ex.: Live Server no VS Code).

## ✅ Status atual

- Projeto funcional para exibição da interface.
- Foco atual em **layout, estilização, acessibilidade por teclado e personalização por perfil**, com interação progressiva.
- Alternância entre tema escuro e claro com persistência local e ícones coerentes por tema (lua no escuro, sol no claro).

## 📦 Última entrega (2026-03-27)

- implementação de **perfil ativo** com persistência local (`perfilAtivo`);
- implementação de **Minha Lista por perfil** com persistência em `localStorage` (`minhaListaPorPerfil`);
- inclusão de ações explícitas de adicionar/remover nos cards de catálogo (`Séries`, `Filmes`, `Bombando`);
- substituição da abordagem com `alert` por **`dialog` acessível** para orientar seleção de perfil;
- atualização de estilos e responsividade para acomodar novos botões de ação e estados visuais.
- estabilização da renderização de ícones via Lucide (versão fixada + rotina de fallback de inicialização).
- correção da inclusão do CSS responsivo para efetivar os breakpoints em tempo de execução.
- padronização mobile-first dos breakpoints e criação de `teste/responsive.css` como referência reutilizável para próximos projetos.
- ajuste fino no mobile para centralizar o menu de acessibilidade (botão + painel expandido) em viewports reduzidas.
- refinamento de UX mobile no header com layout em coluna (FLIXHUB no topo + acessibilidade abaixo) e menu mais compacto em telas pequenas.
- centralização fina no mobile do título e botão de acessibilidade para alinhamento visual consistente.
- compactação dos botões no menu de acessibilidade mobile com largura padronizada ao botão principal para maior consistência visual.
- revisão completa da responsividade no projeto principal, alinhando padrão de largura e centralização dos controles em mobile e estabilidade entre breakpoints.
- ajuste de breakpoint da acessibilidade para transição horizontal apenas em `md (768px)`.
- sincronização do breakpoint `md (768px)` entre CSS e JavaScript no menu de acessibilidade.

## 📦 Entrega anterior (2026-03-26)

- consolidação das melhorias de acessibilidade por teclado (menu, cards e botão de retorno);
- documentação revisada para manter consistência com a estrutura real do projeto (`FlixHub/`);
- histórico técnico centralizado em `CHANGELOG.md` para rastreabilidade de evolução.
- laboratório local de acessibilidade em `./teste` (HTML/CSS/JS) para experimentar navegação por teclado e toggles sem impactar a base principal.
- pasta `./teste` configurada no `.gitignore` para uso de prototipação local.

## 📝 Histórico de mudanças

Para consulta futura das evoluções do projeto, veja `CHANGELOG.md`.

## 🚀 Próximos passos sugeridos

- expandir interações JavaScript (ex.: estado ativo de item no menu lateral e filtros por categoria);
- melhorar breakpoints de responsividade para dispositivos menores;
- incluir mais estados visuais de foco/hover para acessibilidade;
- organizar componentes visuais por blocos reutilizáveis.

## 👨‍💻 Autor

Ricardo Werner
