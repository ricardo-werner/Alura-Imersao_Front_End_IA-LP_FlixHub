# FlixHub

Aplicação front-end inspirada em plataformas de streaming, com foco em **experiência acessível**, **responsividade mobile-first** e **personalização por perfil**.

> Projeto ideal para portfólio de Front-end por combinar UI moderna, semântica HTML, JavaScript puro e práticas reais de A11Y/WCAG.

---

## 🚀 Visão geral

O FlixHub simula uma home de streaming com jornada completa de navegação:

- seleção de arquétipo ativo;
- catálogo por categorias (`Séries`, `Filmes`, `Bombando`);
- ações de **Adicionar/Remover da minha jornada**;
- seção **Minha Jornada** renderizada dinamicamente por perfil;
- controles de acessibilidade e tema com persistência local.

Toda a implementação é estática (sem build e sem framework), priorizando domínio de fundamentos e arquitetura limpa em HTML/CSS/JS.

---

## ✨ Diferenciais deste README (proposta de especialista)

Além do padrão de referência, este README foi estruturado para ser mais forte para **mercado tech (recrutador)** e também claro para **usuário final**:

- foco em **valor entregue** (não apenas lista de arquivos);
- seção de **Status atual do projeto** baseada no código real;
- separação entre **funcionalidades do produto** e **decisões técnicas**;
- leitura escaneável para avaliação rápida em processos seletivos;
- linguagem objetiva com contexto de acessibilidade e UX.

---

## 🧩 Funcionalidades principais

- **Tema claro/escuro** com persistência (`localStorage`)
- **Modo dislexia** com fonte Lexend e estado persistido
- **Escala de fonte** para baixa visão (`100% → 110% → 125%`)
- **Menu de acessibilidade mobile** (hambúrguer + fechamento por botão/`Esc`)
- **Seleção de arquétipo ativo** com status textual em tempo real
- **Minha Jornada por perfil** com estado isolado por usuário
- **Fluxo guiado por `dialog` acessível** quando não há perfil selecionado
- **Navegação por teclado nos cards** (`↑ ↓ ← →`, `Home`, `End`)
- Atalho por **`Enter`/`Espaço` no menu lateral** para entrar na seção
- Botão **Voltar ao menu** com fluxo de foco previsível
- **Skip links** para conteúdo principal e controles de acessibilidade

---

## 🏗️ Arquitetura atual

### Estrutura de pastas

```text
FlixHub/
├── index.html
├── README.md
├── src/
│   ├── assets/
│   │   └── images/
│   ├── scripts/
│   │   └── script.js
│   └── styles/
│       ├── style.css
│       └── responsive.css
└── teste/
  ├── index.html
  ├── style.css
  ├── responsive.css
  ├── script.js
  └── QA_CHECKLIST_RESPONSIVIDADE.md
```

### Decisões técnicas relevantes

- Layout principal com **CSS Grid** e componentes semânticos (`header`, `aside`, `main`, `footer`)
- Sistema visual baseado em **CSS Custom Properties** (temas e tokens)
- Responsividade em estratégia **mobile-first** (`sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`)
- Perfis com imagens otimizadas em **WebP** e `decoding="async"` no HTML para reduzir custo de carregamento e melhorar renderização
- Persistência de estado em `localStorage`:
  - `flixhub-theme`
  - `flixhub-reading-mode`
  - `flixhub-font-scale`
  - `perfilAtivo` (arquétipo ativo)
  - `minhaListaPorPerfil`
- Inicialização resiliente do Lucide Icons (com tentativa de re-render)

---

## ♿ Acessibilidade (A11Y/WCAG)

Implementações de acessibilidade aplicadas no projeto:

- `aria-label`, `aria-labelledby`, `aria-pressed`, `aria-live`
- foco visível em controles críticos (`:focus-visible`)
- navegação por teclado em menu, cards e ações
- skip links para reduzir fricção de navegação
- diálogo nativo acessível para fluxo orientado

---

## 🧪 Como executar localmente

1. Clone o repositório.
2. Abra a pasta no VS Code.
3. Rode com Live Server **ou** abra `index.html` no navegador.

---

## 🛠️ Stack

- **HTML5** semântico
- **CSS3** (tokens, grid, responsividade)
- **JavaScript (Vanilla)** para estado, interações e acessibilidade
- **Lucide Icons** via CDN

---

## ✅ Status atual do projeto

**Estado geral:** funcional e estável para uso local.

### O que já está pronto

- interface completa com seções de catálogo e perfil;
- experiência mobile refinada, incluindo menu de acessibilidade responsivo;
- persistência de preferências e listas por perfil;
- fluxo de teclado consistente entre menu lateral, cards e botões de retorno.

### Em evolução

- expansão de interações de catálogo (filtros/ordenação);
- evolução da camada de testes e checklists de acessibilidade;
- refinamento contínuo de UX para cenários de navegação assistiva.

---

## 📦 Última entrega relevante

### 2026-04-01 — Otimização de imagens para performance (Lighthouse)

- migração das imagens de perfil para formatos otimizados (WebP/JPG);
- atualização dos `src` das imagens no `index.html`;
- aplicação de `decoding="async"` nas imagens de perfil para melhorar o comportamento de carregamento;
- limpeza de arquivos antigos de imagem não utilizados.

> Histórico técnico completo em `CHANGELOG.md`.

### 2026-04-02 — Refatoração da Seleção de Perfil para Arquétipos

- atualização da narrativa da área inicial para **Escolha sua jornada**;
- renomeação dos três cards para **O Observador**, **O Explorador** e **O Guardião**;
- manutenção da semântica acessível com botões (`aria-pressed`) e status dinâmico;
- aplicação de efeito visual **glass suave** nos cards de arquétipo e nas listas de mídia.

### 2026-04-02 — Micro-polimento responsivo do visual glass

- refinamento de consistência visual entre mobile, tablet e desktop;
- ajuste progressivo de `blur`, `padding` e tipografia dos cards por breakpoint;
- padronização de altura mínima dos cards de mídia para manter ritmo visual estável em qualquer dispositivo.

### 2026-04-02 — Alinhamento de nomenclatura para Minha Jornada

- atualização dos textos de UI e ações para substituir "Minha lista" por "Minha Jornada";
- consistência entre conteúdo estático (HTML), dinâmico (JavaScript) e documentação principal.

### 2026-04-02 — Reforço do glass para percepção em qualquer dispositivo

- aumento da intensidade do efeito glass nos cards de arquétipo e mídia;
- ajuste de borda translúcida, sombras e nível de blur para melhor leitura visual;
- aplicação de calibração por breakpoint para manter percepção consistente em mobile, tablet e desktop.

---

## 🗺️ Próximos passos sugeridos

- adicionar filtros por categoria e estado ativo no menu;
- evoluir cobertura de cenários A11Y por breakpoint;
- transformar partes visuais em blocos mais reutilizáveis.

---

## 👨‍💻 Autor

**Ricardo Werner**  
Desenvolvedor Front-end com foco em acessibilidade, UX e inclusão digital.
