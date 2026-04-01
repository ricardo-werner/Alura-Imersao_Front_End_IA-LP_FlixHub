# FlixHub

Aplicação front-end inspirada em plataformas de streaming, com foco em **experiência acessível**, **responsividade mobile-first** e **personalização por perfil**.

> Projeto ideal para portfólio de Front-end por combinar UI moderna, semântica HTML, JavaScript puro e práticas reais de A11Y/WCAG.

---

## 🚀 Visão geral

O FlixHub simula uma home de streaming com jornada completa de navegação:

- seleção de perfil ativo;
- catálogo por categorias (`Séries`, `Filmes`, `Bombando`);
- ações de **Adicionar/Remover da minha lista**;
- seção **Minha lista** renderizada dinamicamente por perfil;
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
- **Seleção de perfil ativo** com status textual em tempo real
- **Minha Lista por perfil** com estado isolado por usuário
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
│   └── scripts/
│       └── script.js
├── styles/
│   ├── style.css
│   └── responsive.css
└── teste/
  ├── index.html
  ├── style.css
  ├── responsive.css
  ├── script.js
  └── QA_CHECKLIST_RESPONSIVIDADE.md
```
### 🖼️ Prévia da interface

<table align="center">
  <tr>
    <td align="center"><img width="360" src="./src/to_readme/ClipMaker_light.png" alt="Tela inicial clara do ClipMaker AI" /></td>
    <td align="center"><img width="360" src="./src/to_readme/ClipMaker_dark.png" alt="Tela inicial escura do ClipMaker AI" /></td>
  </tr>
  <tr>
    <td align="center"><img width="300" src="./src/to_readme/ClipMaker_dislexia.png" alt="Seção de inclusão dislexia" /></td>
    <td align="center"><img width="300" src="./src/to_readme/ClipMaker_110.png" alt="Seção de escala de fonte 110%" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><img width="180" src="./src/to_readme/ClipMaker_125.png" alt="Seção de escala de fonte 125%" /></td>
  </tr>
</table>

| 🎬 Demonstração 1                                                                                                                                                                                                                | 🎬 Demonstração 2                                                                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Ver vídeo 1](https://img.shields.io/badge/%E2%96%B6%EF%B8%8F%20Ver%20v%C3%ADdeo%201-111827?style=for-the-badge&logo=github&logoColor=white)](https://github.com/user-attachments/assets/5a84416f-872a-46ed-acde-1bec100c7c23) | [![Ver vídeo 2](https://img.shields.io/badge/%E2%96%B6%EF%B8%8F%20Ver%20v%C3%ADdeo%202-1f2937?style=for-the-badge&logo=github&logoColor=white)](https://github.com/user-attachments/assets/c7ba816e-fdda-4b20-802a-3994d413f5e3) |
| Fluxo principal                                                                                                                                                                                                                  | Fluxo complementar                                                                                                                                                                                                               |

---

### Decisões técnicas relevantes

- Layout principal com **CSS Grid** e componentes semânticos (`header`, `aside`, `main`, `footer`)
- Sistema visual baseado em **CSS Custom Properties** (temas e tokens)
- Responsividade em estratégia **mobile-first** (`sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`)
- Persistência de estado em `localStorage`:
  - `flixhub-theme`
  - `flixhub-reading-mode`
  - `flixhub-font-scale`
  - `perfilAtivo`
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

### 2026-03-27 — Consolidação de perfil e minha lista com foco em acessibilidade

- seleção de perfil ativo com persistência;
- renderização dinâmica da seção **Minha lista** por perfil;
- ações de adicionar/remover títulos nos cards de catálogo;
- substituição de alerta por `dialog` acessível;
- ajustes de responsividade e estabilidade dos ícones.

> Histórico técnico completo em `CHANGELOG.md`.

---

## 🗺️ Próximos passos sugeridos

- adicionar filtros por categoria e estado ativo no menu;
- evoluir cobertura de cenários A11Y por breakpoint;
- transformar partes visuais em blocos mais reutilizáveis.

---

## 👨‍💻 Autor

**Ricardo Werner**  
Desenvolvedor Front-end com foco em acessibilidade, UX e inclusão digital.
