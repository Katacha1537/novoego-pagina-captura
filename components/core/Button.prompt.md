Brand CTA button, gilt primary, gold-outline secondary, quiet ghost; use one gilt button per view.

```jsx
<Button variant="primary" size="lg">Agende sua consulta</Button>
<Button variant="secondary">Conheça os procedimentos</Button>
<Button variant="ghost" iconRight={<ArrowRight size={16} />}>Saiba mais</Button>
```

Variants: `primary` (metallic sweep + glow, dark text), `secondary` (gold hairline, transparent), `ghost` (text only). Sizes: `sm` / `md` / `lg`. Labels auto-uppercase + track on primary/secondary. Pass icons via `iconLeft` / `iconRight`.
