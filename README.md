# BLIB — Portal de Jogos

Portal de jogos educativos em HTML5 (Canvas + JavaScript puro), com ranking no Supabase.

## Estrutura
```
index.html                 portal (lista de jogos, contador de visitas)
assets/css/blib.css        estilo compartilhado (barra, botões, caixas)
assets/js/blib-core.js     ranking, apelido, sons, caixa de fim de jogo
assets/js/vendor/          supabase.min.js (versão 2.45.4, local)
games/<jogo>/index.html    página do jogo
games/<jogo>/game.js       código do jogo
sql/blib_setup.sql         tabela blib_rankings com validações
```
Jogos: `moto`, `penalty`, `memoria`, `quebra-cabeca`, `foguinho-e-agua` (slugs no ranking: moto, penalty, memoria, quebracabeca, foguinho).

## Publicar no GitHub Pages
1. Suba esta pasta inteira para um repositório.
2. Em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`.
3. Acesse `https://SEU_USUARIO.github.io/NOME_DO_REPO/`.

Os caminhos são relativos, então funciona em subpasta. Abrir por duplo clique (`file://`) também funciona.

## Supabase
- Rode `sql/blib_setup.sql` no SQL Editor (cria/atualiza `blib_rankings`, validações e RLS).
- A URL e a chave pública ficam em `assets/js/blib-core.js` (e no portal, para as visitas).
- Para esconder um apelido: `update blib_rankings set visivel=false where id=...;`

## Como criar um jogo novo
Copie uma pasta de `games/`, mantenha a barra `#bar`, o `<canvas id="c">` e termine o jogo chamando `BLIB.fim({...})` (veja `games/memoria/game.js`).
