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

## 🧭 Guia de QA manual (épico Minha Jornada)

> Objetivo: validar o fluxo completo **menu → modal → seleção de arquétipo → scroll suave → foco no título**.

### Pré-condições

- Limpar estado local (opcional recomendado): `localStorage` do projeto sem `perfilAtivo`.
- Garantir que nenhum arquétipo esteja ativo no carregamento inicial.
- Testar em:
  - **Desktop:** viewport `≥ 1024px`.
  - **Mobile:** viewport `≤ 768px` (Device Toolbar do navegador).

### Cenário 1 — Desktop | Fluxo principal por clique

**Passos**

1. Abrir a aplicação em desktop sem arquétipo ativo.
2. Clicar no item de menu lateral **Minha Jornada**.
3. Confirmar abertura do modal de orientação.
4. Clicar em um card de arquétipo na seção de perfis.

**Resultado esperado (critério de aprovação)**

- A seção `#minha-lista` é alcançada com rolagem suave.
- O foco é movido para o título `#minha-lista-titulo`.
- O título atualizado da jornada é anunciado corretamente por tecnologia assistiva.
- Não há necessidade de rolagem manual para encontrar a seção.

### Cenário 2 — Desktop | Robustez da flag de intenção

**Passos**

1. Clicar em **Minha Jornada** sem arquétipo ativo (modal abre).
2. Fechar o modal pelo botão de fechar.
3. Reabrir o modal por **Minha Jornada** e cancelar com `Esc`.
4. Selecionar um arquétipo **sem** partir novamente de clique em **Minha Jornada**.

**Resultado esperado (critério de aprovação)**

- Não ocorre scroll automático inesperado para `#minha-lista`.
- O foco permanece coerente com o fluxo atual da interface.
- O comportamento comprova limpeza defensiva da intenção após fechamento/cancelamento.

### Cenário 3 — Mobile | Fluxo completo + A11Y

**Passos**

1. Alternar para viewport mobile (ex.: `390x844`).
2. Sem arquétipo ativo, tocar em **Minha Jornada** no menu.
3. No modal, seguir para seleção e tocar em um arquétipo.
4. Observar transição para a seção da jornada.

**Resultado esperado (critério de aprovação)**

- Scroll suave ocorre sem “salto” visual abrupto.
- `#minha-lista-titulo` recebe foco programático (com `tabindex="-1"` quando necessário).
- A ordem de navegação por Tab não fica poluída pelo título (foco apenas programático).
- Fluxo permanece estável mesmo em dispositivo/CPU mais lento.

### Registro sugerido da execução (estudos futuros)

Para cada cenário, anotar:

- Ambiente (desktop/mobile + navegador + resolução);
- Resultado (`Aprovado`/`Reprovado`);
- Evidência (gif/screenshot);
- Observações (latência, comportamento de foco, eventuais regressões).

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

### 2026-04-02 — Correção de fluxo para Minha Jornada (intent flag + A11Y)

- implementação de flag de intenção (`intentToScrollMinhaLista`) para preservar o objetivo original do clique no menu lateral;
- após selecionar o Arquétipo, aplicação de rolagem suave para a seção `#minha-lista` com `scrollIntoView`;
- foco programático no título da seção (`#minha-lista-titulo`) com `tabindex="-1"` para garantir leitura por teclado/tecnologias assistivas;
- remoção da sincronização por `setTimeout` e adoção de observação real de visibilidade (`IntersectionObserver`, com fallback sem timer) antes de disparar foco;
- limpeza defensiva da flag ao concluir o fluxo e nos cenários de fechamento/cancelamento do diálogo.

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

### 2026-04-02 — Calibração do glass no tema claro

- ajuste fino dos tokens visuais do tema claro para manter o mesmo impacto do glass percebido no tema escuro;
- refinamento de borda e sombras para destacar melhor os cards sobre fundos claros;
- balanceamento de `blur` e `saturate` para evitar visual lavado e preservar contraste.

### 2026-04-02 — Acabamento pixel-perfect das bordas (tema claro)

- reforço de micro-contraste nas bordas dos cards para maior definição em telas IPS;
- adição de highlight interno e borda de suporte para leitura visual mais nítida;
- estados `hover` e `selecionado` com destaque mais preciso, mantendo elegância do glass.

### 2026-04-02 — Hover com glow âmbar + respeito a reduced motion

- implementação de efeito de `hover` com `scale(1.05)` e glow âmbar em cards de arquétipos e filmes;
- animações condicionadas a `@media (prefers-reduced-motion: no-preference)`;
- desativação de zoom/transições em `@media (prefers-reduced-motion: reduce)` para atender boas práticas de A11Y.

---

## 🗺️ Próximos passos sugeridos

- adicionar filtros por categoria e estado ativo no menu;
- evoluir cobertura de cenários A11Y por breakpoint;
- transformar partes visuais em blocos mais reutilizáveis.

---

## 👨‍💻 Autor

**Ricardo Werner**  
Desenvolvedor Front-end com foco em acessibilidade, UX e inclusão digital.
