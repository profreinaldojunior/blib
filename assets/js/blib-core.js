/* BLIB core: Supabase, ranking, apelido, sons e caixas de diálogo. Usado por todos os jogos. */
(function(){
'use strict';
const URL_='https://lvfhxcmnqylioalsluvy.supabase.co',KEY_='sb_publishable_gZ4FF1BgIlhIzK1b4y91bQ_YPw9WfXN';
let sb=null;try{if(window.supabase)sb=window.supabase.createClient(URL_,KEY_,{auth:{persistSession:false,autoRefreshToken:false}})}catch(e){}
const esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const BAD=['porra','merda','caralho','puta','buceta','viado','fdp','pqp','cu'];
function limpo(n){const t=n.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ');return !t.split(' ').some(w=>BAD.includes(w))}
const apelido=()=>localStorage.getItem('blib_apelido')||'';
let ac=null;
function som(t){if(localStorage.getItem('blib_mudo')==='1')return;try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();
 const S={ok:[[660,.08],[880,.12]],erro:[[220,.15],[160,.2]],gol:[[523,.1],[659,.1],[784,.2]],pulo:[[400,.06]],gem:[[900,.05],[1200,.08]],boom:[[120,.25,'sawtooth']],clique:[[500,.04]]}[t]||[];
 let at=ac.currentTime;for(const[f,d,w]of S){const o=ac.createOscillator(),g=ac.createGain();o.type=w||'sine';o.frequency.value=f;g.gain.setValueAtTime(.12,at);g.gain.exponentialRampToValueAtTime(.0001,at+d);o.connect(g);g.connect(ac.destination);o.start(at);o.stop(at+d);at+=d*.9}}catch(e){}}
function box(h){let o=document.getElementById('blib-ov');if(!o){o=document.createElement('div');o.id='blib-ov';o.innerHTML='<div class="bx" id="blib-bx"></div>';document.body.appendChild(o)}const b=document.getElementById('blib-bx');b.innerHTML=h;o.classList.add('on');return b}
function fecha(){const o=document.getElementById('blib-ov');if(o)o.classList.remove('on')}
async function save(slug,campos,nome){if(!sb)return 'Ranking indisponível (sem conexão com o Supabase).';
 const row=c=>Object.assign({jogo_slug:slug,nome_jogador:nome},c);let r=await sb.from('blib_rankings').insert(row(campos));
 if(r.error&&campos.tempo_segundos!=null)r=await sb.from('blib_rankings').insert(row(Object.assign({},campos,{tempo_segundos:Math.round(campos.tempo_segundos)})));
 return r.error?'Não foi possível salvar: '+r.error.message:''}
async function top(slug,col,asc,n){if(!sb)return[];const q=()=>sb.from('blib_rankings').select('*').eq('jogo_slug',slug);
 let r=await q().eq('visivel',true).order(col,{ascending:asc}).order('created_at',{ascending:true}).limit(n||5);
 if(r.error)r=await q().order(col,{ascending:asc}).limit(n||5);return r.data||[]}
/* fim({slug,titulo,resumo,campos,ordem,asc,linha,denovo,home}) -> pede apelido, salva e mostra Top 5 */
function fim(o){const bx=box('<h2>'+o.titulo+'</h2><p>'+o.resumo+'</p><input id="blib-nm" maxlength="15" placeholder="Seu apelido" value="'+esc(apelido())+'"><br><button class="b" id="blib-sv">Salvar no ranking</button><p id="blib-ms"></p>');
 const mostrar=async erro=>{const l=await top(o.slug,o.ordem,o.asc),h=document.createElement('div');h.innerHTML='<h2>🏆 Top 5</h2>';
  if(erro){const p=document.createElement('p');p.textContent=erro;h.appendChild(p)}
  const ol=document.createElement('ol');l.forEach(r=>{const li=document.createElement('li');li.textContent=o.linha(r);ol.appendChild(li)});
  if(!l.length){const p=document.createElement('p');p.textContent='Ainda não há pontuações.';h.appendChild(p)}h.appendChild(ol);
  const b1=document.createElement('button');b1.className='b';b1.textContent='Jogar novamente';b1.onclick=()=>{fecha();o.denovo()};
  const a=document.createElement('a');a.className='b';a.textContent='Voltar ao BLIB';a.href=o.home||'../../index.html';h.appendChild(b1);h.appendChild(a);bx.innerHTML='';bx.appendChild(h)};
 document.getElementById('blib-sv').onclick=async()=>{const n=document.getElementById('blib-nm').value.trim().slice(0,15),ms=document.getElementById('blib-ms');
  if(!n){ms.textContent='Digite um apelido!';return}if(!limpo(n)){ms.textContent='Escolha outro apelido, por favor 🙂';return}
  localStorage.setItem('blib_apelido',n);document.getElementById('blib-sv').disabled=true;mostrar(await save(o.slug,o.campos,n))}}
document.addEventListener('DOMContentLoaded',()=>{const bar=document.getElementById('bar');if(!bar)return;const b=document.createElement('button');b.className='b';
 const up=()=>b.textContent=localStorage.getItem('blib_mudo')==='1'?'🔇':'🔊';up();b.title='Som';b.onclick=()=>{localStorage.setItem('blib_mudo',localStorage.getItem('blib_mudo')==='1'?'0':'1');up()};bar.appendChild(b)});
window.BLIB={sb,esc,apelido,som,box,fecha,save,top,fim};
})();
