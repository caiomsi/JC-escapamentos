# Imagens — JC Escapamentos

O site usa fotos de alta qualidade do [Pexels](https://www.pexels.com) (uso livre, sem
necessidade de atribuição) como **provisórias**. Assim que houver fotos reais da
oficina, dos serviços e dos caminhões atendidos, basta substituir os arquivos abaixo
**mantendo os mesmos nomes** — nenhum HTML/CSS precisa mudar.

| Arquivo                          | Onde aparece                      | Tamanho recomendado    |
|----------------------------------|-----------------------------------|------------------------|
| `hero-caminhao-estrada.jpg`      | Fundo do topo (hero)              | ~1920 × 1280, horizontal |
| `soldador-especializado.jpg`     | Seção "Por que a JC" (retrato)    | ~1100 × 1300 (3:4)     |
| `solda-escapamento.jpg`          | Galeria — solda (foto alta)       | ~900 × 1100            |
| `motor-diesel.jpg`               | Galeria — motor diesel            | ~800 × 600             |
| `tubo-escape.jpg`                | Galeria — tubos e ponteiras       | ~800 × 600             |
| `oficina-mecanico.jpg`           | Galeria — na bancada              | ~800 × 600             |
| `caminhao-oficina.jpg`           | Galeria — caminhão em serviço (larga) | ~1400 × 800        |
| `frota-caminhoes.jpg`            | Seção "A oficina" (lateral)       | ~1000 × 900            |

## Dicas

- **Tire fotos reais da oficina:** escapamentos prontos, solda em andamento, ponteiras
  cromadas, caminhões atendidos e a fachada/loja. Fotos reais convertem muito mais.
- Use nomes descritivos, em minúsculas e com hífen — eles são sinal de SEO e o texto
  `alt` das imagens conta com isso.
- **Comprima** antes de subir — [Squoosh](https://squoosh.app) ou
  [TinyPNG](https://tinypng.com). JPG para fotos; SVG/PNG para logos e ícones.
- Cada `<img>` tem um `onerror` que cai para um placeholder de
  [placehold.co](https://placehold.co), então um arquivo faltando não quebra o layout.
- Os ícones dos cards de serviço são SVG embutidos no `index.html`, não arquivos.
