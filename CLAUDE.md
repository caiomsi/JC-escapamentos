# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## What this is

JC Escapamentos — a **real client** site (truck/heavy-vehicle exhaust shop,
Uberlândia MG, Brazil). **All content is pt-BR** — keep new copy in Portuguese. Static
HTML/CSS/JS, no build step. See the root `../CLAUDE.md` for shared conventions
(preview/deploy commands, SEO expectations, image guidelines).

## Structure

`index.html` at root, `css/style.css`, `js/main.js`, photos/drone stills in
`images/` (see `images/README.md`), video assets in `videos/`. A `_incoming/` folder
holds raw, unprocessed client media (originals, `.DS_Store`, telegram exports) — not
part of the shipped site; don't reference files from it directly, process/move them
into `images/` or `videos/` first.

## Design language

Industrial ember-orange design language, matching the shop's heavy-diesel/trucking
context.

## Lead flow — WhatsApp only

No contact form / MSI-Forms integration. CTAs link straight to WhatsApp:
`https://wa.me/553432115003` with pre-filled Portuguese quote-request text. This is
intentional for a Brazilian real-client site — don't replace with a form unless asked.

## Pre-launch checklist

No custom domain configured yet (`caiomsi.github.io/JC-escapamentos`).
