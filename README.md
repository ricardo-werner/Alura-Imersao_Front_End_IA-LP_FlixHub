# FlixHub

Aplicação front-end inspirada em plataformas de streaming, com foco em **acessibilidade (A11Y/WCAG)**, **responsividade mobile-first** e **experiência de navegação por perfil**.

---

## 🚀 Visão geral

O **FlixHub** simula uma home de streaming moderna com interação real de produto:

1. seleção de arquétipo ativo;
2. catálogo por categorias;
3. ações de adicionar/remover itens da jornada;
4. renderização dinâmica da seção **Minha Jornada**;
5. controles de acessibilidade e tema com persistência local.

Projeto construído em HTML/CSS/JavaScript puro, ideal para portfólio por demonstrar domínio de fundamentos, semântica e UX inclusiva.

---

## ✨ Principais funcionalidades

- **Tema claro/escuro** com persistência em `localStorage`
- **Modo dislexia** com fonte legível e estado persistido
- **Escala tipográfica** (`100% → 110% → 125%`) para baixa visão
- **Menu de acessibilidade responsivo** (mobile + desktop)
- **Seleção de arquétipo** com status textual em tempo real
- **Minha Jornada por perfil** com estado isolado por arquétipo
- **Fluxo orientado com `dialog` acessível** quando não há perfil ativo
- **Navegação por teclado** no menu, cards e ações (`Enter`, `Espaço`, setas, `Home`, `End`)
- **Skip links** para conteúdo principal e controles de acessibilidade

---

## 🏗️ Arquitetura (atual)

### Estrutura de pastas

- `index.html` — estrutura principal da aplicação
- `src/scripts/main.js` — entrypoint em ES Modules
- `src/scripts/modules/navigation.js` — controle de telas (show/hide), foco e estado de navegação
- `src/scripts/script.js` — módulo legado (ainda centraliza acessibilidade/perfis/jornada nesta fase iterativa)
- `src/styles/style.css` — estilos base e componentes visuais
- `src/styles/responsive.css` — ajustes por breakpoint
- `src/assets/images/` — assets da interface (perfis e mídias)
- `teste/` — laboratório local de validações e QA manual

### Organização alvo (próximas iterações)

- `src/scripts/modules/accessibility.js`
- `src/scripts/modules/profileManager.js`
- `src/scripts/modules/journeyList.js`
- `src/scripts/modules/navigation.js`
- `src/scripts/main.js`

### Decisões técnicas relevantes

- **Layout semântico** com `header`, `aside`, `main` e `footer`
- **Navegação por seções com classe utilitária `.is-hidden`** (uma tela principal visível por vez)
- **Design tokens** via CSS Custom Properties
- **Responsividade mobile-first** (`640`, `768`, `1024`, `1280`, `1536`)
- **Persistência local** para preferências e jornada por arquétipo
- **Renderização resiliente** com tratamento de estado legado

---

## ♿ Acessibilidade (A11Y / WCAG)

Implementações aplicadas no projeto:

- atributos dinâmicos (`aria-label`, `aria-pressed`, `aria-live`)
- foco visível com `:focus-visible` em controles críticos
- fluxo de teclado consistente entre menu, catálogo e botões de ação
- diálogo nativo acessível para cenários sem perfil selecionado
- suporte a preferência de movimento reduzido (`prefers-reduced-motion`)

> Para histórico técnico completo da evolução do projeto, consulte `CHANGELOG.md` (uso interno do repositório).

---

## 🖼️ Prévia da interface

> Estrutura de mídia mantida no padrão solicitado. As imagens finais devem ser adicionadas em `src/to_readme/`.

<table align="center">
  <tr>
    <td align="center"><img width="360" src="./src/to_readme/flixhub_home_light.png" alt="Tela inicial clara do FlixHub" /></td>
    <td align="center"><img width="360" src="./src/to_readme/flixhub_home_dark.png" alt="Tela inicial escura do FlixHub" /></td>
  </tr>
  <tr>
    <td align="center"><img width="300" src="./src/to_readme/flixhub_a11y_menu.png" alt="Menu de acessibilidade no FlixHub" /></td>
    <td align="center"><img width="300" src="./src/to_readme/flixhub_minha_jornada.png" alt="Seção Minha Jornada por arquétipo" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><img width="180" src="./src/to_readme/flixhub_mobile.png" alt="Versão mobile do FlixHub" /></td>
  </tr>
</table>

| 🎬 Demonstração 1                                                                                                                                                                                            | 🎬 Demonstração 2                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [![Ver vídeo 1](https://img.shields.io/badge/%E2%96%B6%EF%B8%8F%20Ver%20v%C3%ADdeo%201-111827?style=for-the-badge&logo=github&logoColor=white)](https://github.com/user-attachments/assets/SEU-LINK-VIDEO-1) | [![Ver vídeo 2](https://img.shields.io/badge/%E2%96%B6%EF%B8%8F%20Ver%20v%C3%ADdeo%202-1f2937?style=for-the-badge&logo=github&logoColor=white)](https://github.com/user-attachments/assets/SEU-LINK-VIDEO-2) |
| Fluxo principal de navegação e acessibilidade                                                                                                                                                                | Fluxo de seleção de arquétipo e jornada dinâmica                                                                                                                                                             |

---

## 🧪 Como executar localmente

1. Clone o repositório.
2. Abra a pasta no VS Code.
3. Execute com Live Server (recomendado) **ou** abra `index.html` no navegador.

---

## 🛠️ Stack

- **HTML5** semântico
- **CSS3** (tokens, grid e responsividade)
- **JavaScript (Vanilla)** para estado, interações e A11Y
- **Lucide Icons** via CDN

---

## 📌 Entrega mais recente

### 2026-04-03 — Base de modularização com ES Modules e correção da navegação de telas

- migração do carregamento JS no HTML para `type="module"` usando `src/scripts/main.js`;
- criação do módulo `src/scripts/modules/navigation.js` com controle centralizado de exibição/ocultação de seções;
- correção do bug de sobreposição/omissão de conteúdo ao navegar pelo menu lateral (incluindo preservação de títulos `<h2>`);
- implementação da classe `.is-hidden { display: none !important; }` para ocultar seções inativas de forma consistente;
- manutenção do foco acessível ao trocar de tela (foco no heading da seção ativa).

---

## 🗺️ Roadmap

- [ ] Adicionar filtros de catálogo por categoria e estado
- [ ] Expandir cenários de QA de acessibilidade por breakpoint
- [ ] Evoluir componentes para maior reutilização visual
- [ ] Publicar capturas e vídeos finais em `src/to_readme/`

---

## 👨‍💻 Autor

**Ricardo Werner**  
Desenvolvedor Front-end com foco em acessibilidade, UX e inclusão digital.
