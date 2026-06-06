# Novo Ego — Design System

> Sistema de design para a formação em psicanálise **Novo Ego**. Pensado, antes de tudo, para **sites e artes** (landing pages, criativos, social, materiais de aula). Não é um site — é a base visual a partir da qual qualquer página ou arte da marca é construída.

---

## 1. A ideia por trás da identidade (o "porquê")

O nome carrega o conceito: **Novo Ego** = um *novo eu*. Psicanálise é a ciência da mente — profundidade, escuta, transformação. A identidade traduz isso em três decisões centrais:

| Decisão | Por quê |
|---|---|
| **Fundo escuro, quase preto e quente** | É o consultório, o inconsciente, o silêncio antes da fala. Dá gravidade, foco e a autoridade premium que uma formação séria precisa transmitir. O preto é levemente **quente** (matiz ~70) — nunca cinza-azulado frio — porque a marca é humana, não corporativa-tech. |
| **Dourado champanhe (único acento)** | É o "ego novo" emergindo para a luz: valor, prestígio, transformação. Um só acento cromático mantém tudo coeso e caro. O dourado aparece como **varredura metálica** (gradiente), nunca chapado — ouro de verdade reflete luz. |
| **Serifa de alto contraste (Didone)** | Carrega a tradição intelectual e literária da psicanálise (a era de Freud), seriedade editorial e atemporalidade. É a voz da **autoridade**. |
| **Serifa suave + itálico** | A humanidade dentro do rigor — a alma. Usada em frases sentença e palavras de ênfase em itálico. É a voz do **acolhimento**. |
| **Fotografia em P&B** | Atemporal, séria, documental — "sem romantização". Mantém o foco nos rostos e nas pessoas, e deixa o dourado ser a única cor da página. |
| **Muito espaço em branco (negativo)** | Calma, contemplação, confiança. Uma marca que não grita. |

**Tensão proposital:** Didone dura (autoridade) + serifa suave/itálico (acolhimento) + sans neutra (clareza). Essa é a personalidade — rigor *e* cuidado, exatamente o que uma boa análise oferece.

> ⚠️ **Fontes são substituições.** Nenhum arquivo de fonte da marca foi fornecido. Escolhi as melhores correspondências no Google Fonts a partir das referências (ver abaixo). Se a marca licenciar tipos premium (ex.: Canela, GT Sectra, Reckless), basta trocar os arquivos — **os nomes dos tokens não mudam.**

---

## 2. Fundamentos de conteúdo (tom de voz)

A escrita é **direta, segura e sem floreio**. Vende autoridade e resultado, mas com elegância — não é "infoproduto gritado".

- **Tratamento:** "você" (próximo, mas respeitoso). A marca fala como um mentor experiente.
- **Caixa:** títulos de impacto vêm em **CAIXA ALTA** na serifa Didone; títulos de seção em **caixa-sentença** na serifa suave; rótulos (eyebrows) em **CAIXA ALTA espaçada** na sans.
- **Ritmo:** frases curtas e marteladas para criar convicção. Ex.: *"Sem improviso. Sem superficialidade. Sem romantização."*
- **Ênfase:** palavra-chave em **itálico dourado** (serifa) ou **negrito** (sans) — nunca os dois juntos.
- **Provas:** números grandes e secos (`5.000+`, `7+`), rótulo pequeno e discreto embaixo. O número fala; o rótulo sussurra.
- **Sem emoji.** Jamais. Quebram a sofisticação. Para microícones, use traço fino (ver Iconografia).
- **Vocabulário:** "formação", "supervisão clínica", "autoridade", "segurança", "alta performance", "a nova ciência da mente".

Exemplos reais (referências):
> **TORNE-SE PSICANALISTA PROFISSIONAL** com formação estruturada, supervisão clínica e mentalidade de alta performance.
> *Da base teórica à prática real.* Formamos analistas preparados para atuar com **segurança, autoridade e resultado.**

---

## 3. Fundamentos visuais

- **Cor:** fundo `--ink-900`/`--ink-950` (quase preto quente); superfícies `--ink-800`; texto branco-areia `--sand-50` (nunca `#fff` puro); único acento `--gold-500` com a varredura `--gradient-gold`. Feedbacks (sucesso/erro) são dessaturados (sálvia / terracota) para não brigar com o dourado.
- **Tipo:** três vozes — Statement (Bodoni Moda, CAIXA ALTA), Editorial (Cormorant Garamond, sentença + itálico), Functional (Hanken Grotesk, corpo/UI/rótulos).
- **Fundos:** sólidos escuros, ocasionalmente um *vignette* quente sutil no topo do hero (`--gradient-aura`). Sobre fotos, sempre **gradiente de proteção** de baixo para cima para garantir leitura do texto. Grão sutil é bem-vindo; gradientes berrantes, jamais.
- **Cantos:** generosos e suaves. Cards `18px`, painéis grandes `28px`, botões/pílulas/badges sempre **pílula** (`999px`). Nada pontudo.
- **Cards:** superfície `--ink-800` + borda *hairline* (`--border`) + **bevel** de topo (1px de luz interna) + sombra suave. No hover (se interativo): sobe 3px e a borda vira dourada.
- **Elevação:** profundidade no escuro = borda + sombra + bevel. O dourado pode ganhar um **glow** discreto — exclusivo do CTA primário.
- **Movimento:** lento e deliberado (`--ease-out`, 280ms). Fades e *translateY* curtos. **Sem bounce, sem mola.** Caro = calmo.
- **Hover/press:** hover clareia/levanta levemente; press encolhe para `0.98`. Links ghost trocam de cor para dourado.
- **Layout:** centrado e arejado. Hero centralizado; seções com respiro vertical grande (`--section-y`). Largura máxima de conteúdo `1200px`, prosa `760px`.
- **Transparência/blur:** usada com parcimônia — pílulas com fundo translúcido baixíssimo (`rgba(...,0.02–0.06)`); blur só em barras fixas/sticky, se houver.

---

## 4. Iconografia

- **Estilo:** ícones de **traço fino e uniforme** (≈1.5px), arredondados — combinam com a sans e o ar premium. Sem ícones preenchidos pesados, sem ilustrações coloridas.
- **Biblioteca:** recomendo **Lucide** (CDN: `https://unpkg.com/lucide@latest`) — traço fino, consistente, gratuito. As referências usam exatamente esse vocabulário (play, sparkles, users, file-text, check, arrow-right). *Substituição sinalizada: a marca não tem set próprio.*
- **Cor:** ícones em `--accent` (dourado) dentro de pílulas, ou `--text-muted` em uso neutro.
- **Tamanho:** 14–16px em pílulas e botões; 20–24px como ícone de feature dentro de chip quadrado-arredondado.
- **Ornamentos:** diamante pequeno (◆) e traços (—) como divisores elegantes. O monograma usa diamante no topo.
- **Emoji:** nunca. Unicode `✓`, `◆`, `—`, `·` são aceitos como microdetalhes.

---

## 5. Como usar (passo a passo)

1. **Linke o CSS:** `<link rel="stylesheet" href="styles.css">`. Ele importa todos os tokens e fontes.
2. **Comece pelo fundo escuro:** `body { background: var(--bg); color: var(--text); font-family: var(--font-sans); }`.
3. **Hierarquia de uma seção típica:** `Pill` (eyebrow) → título `t-statement` ou `t-editorial` → `t-lead` → conteúdo → **um** botão `primary`.
4. **Use as classes prontas** de tipografia (`.t-statement`, `.t-editorial`, `.t-lead`, `.t-body`, `.t-eyebrow`, `.t-gold`) — elas já aplicam família, peso, tracking e cor corretos.
5. **Um CTA dourado por tela.** É a única ação decisiva. Alternativas usam `secondary` (contorno) ou `ghost`.
6. **Ênfase com moderação:** uma palavra dourada em itálico por título; um trecho em negrito por parágrafo.
7. **Fotos sempre P&B** + gradiente de proteção. Deixe o dourado ser a única cor.

### Dicas rápidas (faça / não faça)

| ✅ Faça | ❌ Não faça |
|---|---|
| Dourado como acento pontual (texto-chave, CTA, ticks) | Dourado em blocos grandes chapados |
| Branco-areia `--sand-50` para texto | `#FFFFFF` puro (estoura no escuro quente) |
| Espaço negativo generoso | Empilhar card dentro de card |
| Fotos P&B de alto contraste | Fotos coloridas/saturadas |
| Itálico da Cormorant para alma | Itálico da Bodoni em corpo de texto (frágil) |
| Movimento lento e suave | Bounce, molas, gradientes arco-íris, emoji |

---

## 6. Índice / manifesto do repositório

| Caminho | O que é |
|---|---|
| `styles.css` | **Entrypoint** — linke só este. Importa tudo abaixo. |
| `tokens/fonts.css` | `@import` das fontes (Bodoni Moda, Cormorant Garamond, Hanken Grotesk) |
| `tokens/colors.css` | Escala de ink quente, dourado champanhe, gradientes, aliases semânticos |
| `tokens/typography.css` | Famílias, escala, pesos, tracking + classes `.t-*` |
| `tokens/spacing.css` | Escala 4px, raios, larguras de layout |
| `tokens/elevation.css` | Sombras, bevel, glow, easing/durações |
| `assets/monogram.svg` | Monograma "Ne" em anel dourado |
| `assets/wordmark.svg` | Lockup horizontal (monograma + nome + descritor) |
| `guidelines/*.html` | Cartões-amostra (Type, Colors, Spacing, Brand) — aba Design System |
| `components/core/` | `Button`, `Pill`, `Card` (+ `.d.ts`, `.prompt.md`, cartão) |
| `components/data/` | `Stat`, `Checklist` (+ sidecars) |
| `Guia Visual Novo Ego.html` | **Guia de marca completo** — abra este para ver tudo aplicado e explicado |
| `SKILL.md` | Para uso como Agent Skill (Claude Code) |

---

### Fontes (origem das referências)
Identidade derivada de 5 referências enviadas pelo usuário: landing page "Torne-se Psicanalista Profissional", seções de equipe/entregáveis de uma agência, mockups mobile de clínicas (Marcelo Hanato, Binder, Meditação Transcendental) e uma arte "Justiça & Liberdade". Todas compartilham: fundo escuro quente, dourado champanhe, serifa Didone de alto contraste, pílulas/eyebrows, fotografia P&B.

> 📎 **Lembrete:** para compartilhar este sistema com a sua organização, defina o tipo de arquivo como **Design System** no menu *Share*.
