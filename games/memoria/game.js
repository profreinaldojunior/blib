const $=id=>document.getElementById(id),cv=$('c'),x=cv.getContext('2d');
if(!x.roundRect)x.roundRect=function(a,b,w,h){this.rect(a,b,w,h)};
const SYM=['📚','✏️','🎒','🔬','🌎','🎨','🎵','⚽','🧮','🔭'],LV=[{c:4,r:3},{c:4,r:4},{c:5,r:4}],COL=['#ff6b6b','#4dabf7','#51cf66','#ffd43b','#cc5de8'];
let lvl=0,cards=[],sel=[],lock=0,mv=0,tl=0,total=0,tmv=0,st='play',tmr=0,fx=[],msg='',tk=0;
function load(n){lvl=n;const{c,r}=LV[n],gap=14,cw=Math.min((900-gap*(c-1))/c,(570-gap*(r-1))/r),ox=(960-(cw*c+gap*(c-1)))/2,oy=(600-(cw*r+gap*(r-1)))/2;
 const a=[];for(let i=0;i<c*r/2;i++)a.push(SYM[i%SYM.length],SYM[i%SYM.length]);for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
 cards=a.map((s,i)=>({s,x:ox+(i%c)*(cw+gap),y:oy+Math.floor(i/c)*(cw+gap),w:cw,f:0,face:0,m:0}));sel=[];lock=0;mv=0;tl=0;st='play';msg='';fx=[]}
function flip(cd){if(st!='play'||lock>0||cd.m||cd.face||sel.length>=2)return;cd.face=1;sel.push(cd);if(sel.length==2){mv++;lock=.9}}
function resolve(){const[a,b]=sel;if(a.s==b.s){a.m=b.m=1;BLIB.som('ok');for(const k of[a,b])for(let i=0;i<14;i++)fx.push({x:k.x+k.w/2,y:k.y+k.w/2,vx:(Math.random()-.5)*400,vy:(Math.random()-.5)*400,l:.7,c:COL[i%5]})}else{a.face=b.face=0;BLIB.som('erro')}sel=[];
 if(cards.every(k=>k.m)){st='done';tmr=1.6;total+=tl;tmv+=mv;msg=lvl<LV.length-1?'Fase '+(lvl+1)+' concluída! 🎉':'Você completou tudo! 🏆'}}
function update(dt){tk+=dt;fx.forEach(f=>{f.x+=f.vx*dt;f.y+=f.vy*dt;f.l-=dt});fx=fx.filter(f=>f.l>0);
 cards.forEach(k=>{k.f+=Math.sign(k.face-k.f)*Math.min(Math.abs(k.face-k.f),dt*5)});
 if(st=='play'){tl+=dt;if(lock>0){lock-=dt;if(lock<=0&&sel.length==2)resolve()}}
 else if(st=='done'){tmr-=dt;if(tmr<=0){if(lvl<LV.length-1)load(lvl+1);else{st='end';finish()}}}}
function draw(){const g=x.createLinearGradient(0,0,0,600);g.addColorStop(0,'#7ec8ff');g.addColorStop(1,'#ffd1e8');x.fillStyle=g;x.fillRect(0,0,960,600);
 for(const k of cards){const sx=Math.abs(Math.cos(k.f*Math.PI)),cx=k.x+k.w/2;x.save();x.translate(cx,0);x.scale(Math.max(.02,sx),1);x.translate(-cx,0);
  x.fillStyle='#0003';x.beginPath();x.roundRect(k.x+3,k.y+5,k.w,k.w,14);x.fill();
  if(k.f<.5){const q=x.createLinearGradient(k.x,k.y,k.x+k.w,k.y+k.w);q.addColorStop(0,'#7b5cff');q.addColorStop(1,'#c77dff');x.fillStyle=q;x.beginPath();x.roundRect(k.x,k.y,k.w,k.w,14);x.fill();x.fillStyle='#fff9';x.font='bold '+k.w*.5+'px "Trebuchet MS"';x.textAlign='center';x.textBaseline='middle';x.fillText('?',cx,k.y+k.w/2)}
  else{x.fillStyle=k.m?'#d3f9d8':'#fff';x.beginPath();x.roundRect(k.x,k.y,k.w,k.w,14);x.fill();x.strokeStyle=k.m?'#51cf66':'#ffd43b';x.lineWidth=5;x.stroke();x.font=k.w*.55+'px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillStyle='#000';x.fillText(k.s,cx,k.y+k.w/2+2)}x.restore()}
 fx.forEach(f=>{x.fillStyle=f.c;x.beginPath();x.arc(f.x,f.y,6*f.l+2,0,7);x.fill()});
 if(st=='done'){x.fillStyle='#0008';x.fillRect(0,230,960,130);x.font='bold 54px "Trebuchet MS"';x.textAlign='center';x.fillStyle='#fff';x.fillText(msg,480,310)}
 $('lv').textContent='Fase '+(lvl+1)+'/'+LV.length;$('tm').textContent='⏱ '+tl.toFixed(1)+'s (total '+(total+(st=='play'?tl:0)).toFixed(1)+'s)';$('mv').textContent='Jogadas: '+mv}
function finish(){BLIB.fim({slug:'memoria',titulo:'🏁 Parabéns!',resumo:'Tempo total: <b>'+total.toFixed(2)+'s</b> em <b>'+tmv+'</b> jogadas<br><small>(cada reinício soma +3s)</small>',campos:{tempo_segundos:+total.toFixed(2),pontuacao:tmv},ordem:'tempo_segundos',asc:true,linha:r=>r.nome_jogador+' — '+Number(r.tempo_segundos).toFixed(2)+'s'+(r.pontuacao!=null?' ('+r.pontuacao+' jogadas)':''),denovo:()=>{total=0;tmv=0;load(0)}})}
function restart(){if(st=='end')return;if(st=='play')total+=3;load(lvl)}
cv.addEventListener('pointerdown',e=>{const r=cv.getBoundingClientRect(),px=(e.clientX-r.left)*960/r.width,py=(e.clientY-r.top)*600/r.height;const k=cards.find(k=>px>=k.x&&px<=k.x+k.w&&py>=k.y&&py<=k.y+k.w);if(k)flip(k)});
addEventListener('keydown',e=>{if(e.target.tagName=='INPUT')return;if(e.code=='KeyR')restart()});$('rs').onclick=restart;
load(0);let last=0;function loop(ts){update(Math.min((ts-last)/1000,.1));last=ts;draw();requestAnimationFrame(loop)}requestAnimationFrame(ts=>{last=ts;loop(ts)});
