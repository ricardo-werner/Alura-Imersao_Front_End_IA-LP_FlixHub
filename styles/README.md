# Guia de Estilos — Projeto 1-Netflix

Este documento é a referência técnica da camada de estilos do projeto. A ideia é centralizar decisões visuais, tokens, regras de responsividade e boas práticas para facilitar manutenção futura.

## 🎯 Objetivo da camada CSS

O CSS do projeto foi desenhado para:

- manter identidade visual escura com destaque em tons quentes e azulados;
- organizar a página com Grid (sidebar + conteúdo);
- escalar bem entre mobile e desktop;
- preservar legibilidade e contraste;
- permitir evolução incremental sem retrabalho.

## 📁 Arquitetura de arquivos

### `style.css`

Arquivo base com:

- reset e normalização inicial;
- tokens no `:root` (cores, raio e sombra);
- override de tokens para tema claro em `html[data-theme='light']`;
- layout principal (grid da página);
- estilos de componentes estruturais (`aside`, `header`, `main`, `footer`);
- componentes de conteúdo (`.profile`, listas, blocos de seção);
- botão de alternância de tema no header (`.theme-toggle`);
- suporte visual aos ícones da navegação lateral e do toggle;
- import final de `responsive.css`.

### `responsive.css`

Arquivo exclusivo para comportamento responsivo:

- breakpoints padronizados em `rem`;
- reorganização do grid por largura de tela;
- ajustes de espaçamento e densidade visual por faixa;
- overrides progressivos para desktop maior.

## 🎨 Design tokens atuais (`:root`)

### Cores de base

- `--bg`: fundo principal;
- `--bg-elev`: superfícies elevadas;
- `--bg-card`: cartões/itens de destaque;
- `--line`: linhas e bordas suaves.

### Tipografia e texto

- `--text`: texto principal;
- `--text-muted`: texto secundário.

### Cores de destaque

- `--accent` e `--accent-soft`: destaque quente e brilho suave;
- `--metal-blue` e `--metal-blue-soft`: apoio visual frio para equilíbrio de paleta.

### Raio e profundidade

- `--radius`: arredondamento padrão de blocos;
- `--shadow`: sombra principal de cartões/seções.

### Variação de tema

O tema padrão é escuro (tokens em `:root`).
Quando `html[data-theme='light']` está ativo, os tokens são sobrescritos para uma paleta clara mantendo contraste e leitura.

## 🧱 Estratégia de layout

No desktop (`lg`+), o `body` usa Grid com duas colunas:

- coluna lateral fixa para navegação (`aside`);
- coluna principal para `header`, `main` e `footer`.

No mobile/tablet, o layout muda para coluna única, com a ordem:

1. `header`
2. `aside`
3. `main`
4. `footer`

Isso melhora escaneabilidade em telas pequenas e evita compressão excessiva de conteúdo.

## 🧩 Padrões por seção

### Sidebar (`aside`)

- menu vertical no desktop;
- menu flexível em linhas no mobile/tablet;
- estado hover com realce de fundo para navegação;
- links com ícone + rótulo textual (Lucide).

### Header (`header`)

- barra superior com `position: sticky`;
- fundo translúcido + blur para sensação de profundidade;
- título com identidade visual forte (vermelho de marca);
- botão de alternância de tema no canto direito.

### Toggle de tema (`.theme-toggle`)

- componente em formato pílula com ícone e rótulo textual;
- alterna entre `moon` (tema escuro) e `sun` (tema claro);
- transição com crossfade/rotação suave entre ícones;
- microinteração de clique via classe temporária `.is-switching`;
- rótulo textual dinâmico no formato `Tema: Escuro` / `Tema: Claro`;
- possui `:focus-visible` para navegação via teclado;
- usa o `data-theme` no `html` para comutar estilos globais.

### Main (`main`)

- blocos de seção com borda sutil, gradiente leve e sombra;
- primeira seção usa grid para perfis;
- listas de séries/filmes com grid adaptável por breakpoint.

### Perfil (`.profile`)

- cartão com hover elevando (`translateY`) e reforço de borda;
- imagem quadrada com `aspect-ratio: 1 / 1` e `object-fit: cover`;
- tipografia de nome com peso maior para hierarquia.

### Footer (`footer`)

- distribuição flexível entre texto e links;
- wrap habilitado para evitar quebra ruim em telas menores.

## 📱 Responsividade (breakpoints oficiais)

- `sm`: `40rem`
- `md`: `48rem`
- `lg`: `64rem`
- `xl`: `80rem`
- `2xl`: `96rem`

### Regras importantes

- Base: ajustes para telas menores com `max-width: 39.99rem`.
- Escalonamento progressivo com `min-width` em ordem crescente.
- Em `lg`, retorna para sidebar lateral fixa com altura total.
- Em `2xl`, amplia coluna lateral e espaçamento entre seções.

## ♿ Acessibilidade visual (A11Y)

Diretrizes aplicadas no CSS atual:

- contraste forte entre fundo escuro e texto claro;
- ajuste dedicado de contraste no botão de tema para o modo claro;
- tipografia com `line-height: 1.5` para leitura confortável;
- áreas clicáveis com padding adequado em links de navegação;
- ícones sempre acompanhados por texto (não depender só de ícone);
- transições suaves para feedback visual sem exagero.

Melhorias recomendadas para próximas versões:

- incluir estados `:focus-visible` explícitos;
- validar contraste com ferramentas automáticas (WCAG);
- garantir consistência de foco entre links do `aside`, `header` e `footer`.

## 📏 Escala e unidades (`rem` x `px`)

### Preferir `rem` para

- espaçamentos, gaps e paddings;
- tamanhos e limites de layout;
- raios de borda e sombras;
- offsets que devem escalar com a tipografia.

### Usar `px` para

- hairlines e detalhes de 1px quando precisão fixa for necessária.

Com base `16px` (`html { font-size: 100%; }`):

- `1px = 0.0625rem`
- `8px = 0.5rem`
- `14px = 0.875rem`
- `18px = 1.125rem`
- `40px = 2.5rem`

Fórmula: `rem = px / 16`

## 🔁 Cascata e precedência

- `style.css` define a base visual global.
- `responsive.css` é importado ao final de `style.css`.
- Portanto, com mesma especificidade, o responsivo prevalece por ordem na cascata.

## 🧠 Integração CSS + JavaScript

- Script: `src/scripts/script.js`
- Atributo controlado: `html[data-theme='light' | 'dark']`
- Persistência: `localStorage` com chave `netflix-theme`
- Ícones: gerados pela biblioteca Lucide (`window.lucide.createIcons()`)
- Microanimação: classe `.is-switching` aplicada por ~420ms no toggle

## ✅ Checklist para futuras alterações de estilo

Antes de concluir uma alteração, validar:

1. Se o token novo realmente precisa existir no `:root`.
2. Se a mudança ficou no arquivo correto (`style.css` base vs `responsive.css` breakpoint).
3. Se o comportamento ficou consistente em mobile, tablet e desktop.
4. Se hover/foco/legibilidade continuam claros.
5. Se não houve aumento desnecessário de especificidade.

## 🛣️ Próximas evoluções recomendadas

- padronizar estados de foco com `:focus-visible` em links e botões;
- avaliar organização por blocos/componentes em seções comentadas;
- criar tabela de tokens com intenção de uso (ex.: superfície, borda, destaque);
- incluir exemplos visuais (prints) por breakpoint para consulta rápida.
