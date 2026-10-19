const cv=document.getElementById('c'),x=cv.getContext('2d'),T=32,K={f:{l:'KeyA',r:'KeyD',u:'KeyW'},w:{l:'ArrowLeft',r:'ArrowRight',u:'ArrowUp'}};
if(!x.roundRect)x.roundRect=function(a,b,w,h){this.rect(a,b,w,h)};
// Níveis: h(linha,colIni,colFim,tipo)  # parede  F fogo  W água  G lama  r rubi  d diamante  f/w portas  B botão  D porta  1/2 início
function mk(f){const g=Array.from({length:20},(_,r)=>Array.from({length:30},(_,c)=>r==0||r==19||c==0||c==29?'#':'.'));f((r,a,b,ch)=>{for(let i=a;i<=b;i++)g[r][i]=ch});return g}
const LV=[
mk(h=>{h(18,1,28,'#');h(18,10,12,'F');h(18,15,17,'W');h(15,19,24,'#');h(12,22,28,'#');h(17,2,2,'1');h(17,3,3,'2');
 h(16,11,11,'r');h(16,16,16,'d');h(14,21,21,'r');h(14,23,23,'d');h(11,23,23,'r');h(11,24,24,'d');h(11,27,27,'f');h(11,25,25,'w')}),
mk(h=>{h(18,1,28,'#');for(let r=1;r<18;r++)h(r,14,14,'#');h(14,14,14,'D');h(15,14,14,'D');h(16,14,14,'D');h(17,14,14,'D');
 h(18,9,10,'F');h(18,18,19,'W');h(18,22,23,'F');h(17,6,6,'B');h(17,20,20,'B');h(17,2,2,'1');h(17,3,3,'2');
 h(16,9,9,'r');h(16,18,18,'d');h(16,22,22,'r');h(16,19,19,'d');h(17,26,26,'f');h(17,28,28,'w')}),
mk(h=>{h(18,1,28,'#');h(18,8,9,'F');h(18,12,14,'G');h(18,17,18,'W');h(15,21,28,'#');h(12,13,19,'#');h(9,2,12,'#');
 for(let r=1;r<9;r++)h(r,16,16,'#');h(9,16,16,'D');h(10,16,16,'D');h(11,16,16,'D');
 h(17,5,5,'B');h(8,9,9,'B');h(17,2,2,'1');h(17,3,3,'2');h(8,3,3,'f');h(8,5,5,'w');
 h(16,9,9,'r');h(16,18,18,'d');h(11,14,14,'r');h(11,18,18,'d');h(8,7,7,'r');h(8,11,11,'d')})];
const HZ={F:['#ff4d1a','#ffb347'],W:['#1f8fff','#8fd3ff'],G:['#3f7d22','#8bd04a']},bad=(t,k)=>k=='G'||(t=='f'?k=='W':k=='F');
let lv=0,M,P,op=0,gem,tot,state='menu',timer=0,msg='',tm=0;const down={};
function load(n){lv=n;if(n==0){tt=0;mortes=0}M=LV[n].map(r=>r.slice());P=[];gem={r:0,d:0};tot={r:0,d:0};
 M.forEach((row,r)=>row.forEach((ch,c)=>{if(ch=='1'||ch=='2'){const t=ch=='1'?'f':'w';P.push({t,k:K[t],x:c*T+5,y:r*T+4,w:22,h:28,vx:0,vy:0,g:0,e:0});M[r][c]='.'}if(ch=='r')tot.r++;if(ch=='d')tot.d++}));state='play';msg=''}
const solid=(c,r)=>{if(c<0||r<0||c>=30||r>=20)return 1;const k=M[r][c];return '#FWG'.includes(k)||(k=='D'&&!op)};
function mv(p,dx,dy){p.x+=dx;p.y+=dy;const x0=Math.floor(p.x/T),x1=Math.floor((p.x+p.w-.01)/T),y0=Math.floor(p.y/T),y1=Math.floor((p.y+p.h-.01)/T);
 for(let r=y0;r<=y1;r++)for(let c=x0;c<=x1;c++)if(solid(c,r)){if(dx>0)p.x=c*T-p.w;else if(dx<0)p.x=(c+1)*T;if(dy>0){p.y=r*T-p.h;p.vy=0;p.g=1}else if(dy<0){p.y=(r+1)*T;p.vy=0}return}}
function at(p,f,ex=0){for(let r=Math.floor(p.y/T);r<=Math.floor((p.y+p.h-.01+ex)/T);r++)for(let c=Math.floor(p.x/T);c<=Math.floor((p.x+p.w-.01)/T);c++){const k=M[r]&&M[r][c];if(k&&f(k,r,c))return k}return ''}
function step(){tm++;if(state=='play')tt++;if(tm%6==0){const e=document.getElementById('tm');if(e)e.textContent='⏱ '+(tt/60+2*mortes).toFixed(1)+'s'}
 if(state=='dead'){if(--timer<=0)load(lv);return}
 if(state=='win'){if(--timer<=0){if(lv<LV.length-1)load(lv+1);else{state='end';finish()}}return}
 if(state!='play')return;
 op=P.some(p=>at(p,k=>k=='B'||k=='D'))?1:0;
 for(const p of P){p.vx=((down[p.k.r]?1:0)-(down[p.k.l]?1:0))*3.2;if(down[p.k.u]&&p.g){p.vy=-11;p.g=0;BLIB.som('pulo')}
  p.vy=Math.min(p.vy+.5,12);p.g=0;mv(p,p.vx,0);mv(p,0,p.vy);
  at(p,(k,r,c)=>{const q=p.t=='f'?'r':'d';if(k==q){M[r][c]='.';gem[q]++;BLIB.som('gem')}return 0});
  if(at(p,k=>'FWG'.includes(k)&&bad(p.t,k),1)){state='dead';mortes++;timer=60;BLIB.som('erro');msg=(p.t=='f'?'O Foguinho':'A Água')+' não pode tocar nisso! Reiniciando...';return}
  p.e=at(p,(k,r,c)=>k==(p.t=='f'?'f':'w')&&Math.abs(c*T+16-(p.x+p.w/2))<14)?1:0}
 if(P.every(p=>p.e)){state='win';timer=110;BLIB.som('ok')}}
function rr(a,b,w,h,r,f){x.fillStyle=f;x.beginPath();x.roundRect(a,b,w,h,r);x.fill()}
function txt(s,X,Y,sz,c,al='center'){x.font='bold '+sz+'px "Trebuchet MS",sans-serif';x.textAlign=al;x.fillStyle=c;x.fillText(s,X,Y)}
function draw(){const g=x.createLinearGradient(0,0,0,640);g.addColorStop(0,'#bfe6ff');g.addColorStop(1,'#ffe3f1');x.fillStyle=g;x.fillRect(0,0,960,640);
 if(!M)return;
 M.forEach((row,r)=>row.forEach((k,c)=>{const X=c*T,Y=r*T;
  if(k=='#'){rr(X,Y,T,T,6,'#7a5ea8');rr(X+2,Y+2,T-4,7,4,'#a58bd6')}
  else if(HZ[k]){rr(X,Y,T,T,4,'#5d4690');x.fillStyle=HZ[k][0];x.beginPath();x.moveTo(X,Y+T);for(let i=0;i<=T;i+=4)x.lineTo(X+i,Y+7+Math.sin((tm/10)+(X+i)/9)*2.5);x.lineTo(X+T,Y+T);x.fill();rr(X+4,Y+10,6,4,2,HZ[k][1])}
  else if(k=='D'){if(!op){rr(X+4,Y,T-8,T,4,'#f2b632');rr(X+8,Y+4,T-16,T-8,3,'#ffd978')}else rr(X+14,Y,4,T,2,'#f2b63266')}
  else if(k=='B'){const pr=op?5:0;rr(X+3,Y+T-8+pr,T-6,8-pr,3,op?'#51cf66':'#e03131')}
  else if(k=='f'||k=='w'){const f=k=='f';rr(X+1,Y-12,30,44,12,f?'#ff6a3d':'#3da5ff');rr(X+6,Y-6,20,38,9,f?'#ffd0b8':'#cfeaff');x.fillStyle=f?'#e03131':'#1c7ed6';x.beginPath();x.arc(X+16,Y+12,5,0,7);x.fill()}
  else if(k=='r'||k=='d'){const f=k=='r',yy=Y+16+Math.sin(tm/12+c)*3;x.fillStyle=f?'#e8262f':'#2aa0ff';x.beginPath();x.moveTo(X+16,yy-11);x.lineTo(X+25,yy);x.lineTo(X+16,yy+11);x.lineTo(X+7,yy);x.fill();x.fillStyle='#fff8';x.beginPath();x.moveTo(X+16,yy-8);x.lineTo(X+20,yy-1);x.lineTo(X+16,yy-2);x.fill()}}));
 for(const p of P){const f=p.t=='f',cx=p.x+11,y=p.y,col=f?'#ff6a3d':'#3da5ff';
  x.fillStyle=col;x.beginPath();if(f){x.moveTo(cx-8,y+3);x.quadraticCurveTo(cx-6,y-8,cx,y-15);x.quadraticCurveTo(cx+6,y-8,cx+8,y+3)}else{x.moveTo(cx,y-15);x.quadraticCurveTo(cx+9,y-3,cx+8,y+3);x.lineTo(cx-8,y+3);x.quadraticCurveTo(cx-9,y-3,cx,y-15)}x.fill();
  rr(p.x,y+2,22,26,9,col);rr(p.x+3,y+4,16,9,4,f?'#ffd0b8':'#cfeaff');
  x.fillStyle='#222';x.beginPath();x.arc(cx-4,y+14,2.6,0,7);x.arc(cx+4,y+14,2.6,0,7);x.fill();
  if(p.e){x.strokeStyle='#fff';x.lineWidth=3;x.strokeRect(p.x-2,y-2,26,32)}}
 x.fillStyle='#4b3a78';x.fillRect(0,0,960,T);
 txt('Nível '+(lv+1)+'/'+LV.length,16,23,18,'#fff','left');txt('Rubis: '+gem.r+'/'+tot.r,330,23,18,'#ff8a65');txt('Diamantes: '+gem.d+'/'+tot.d,520,23,18,'#8fd3ff');txt('[R] Reiniciar',944,23,16,'#fff','right');
 if(state!='play'){x.fillStyle='#000a';x.fillRect(0,200,960,230);
  if(state=='menu'){txt('Foguinho e Água',480,265,56,'#ffb347');txt('Foguinho: A / D andar, W pular   (só pisa no FOGO)',480,320,22,'#fff');txt('Água: setas ← → andar, ↑ pular   (só pisa na ÁGUA)',480,352,22,'#fff');txt('Lama verde mata os dois! Levem os dois às portas ao mesmo tempo.',480,384,20,'#d3f9d8');txt('Pressione qualquer tecla ou clique para começar',480,416,18,'#ffd978')}
  else if(state=='dead'){txt('Ops!',480,290,50,'#ff8a65');txt(msg,480,350,22,'#fff')}
  else if(state=='win'){txt('Fase concluída! 🎉',480,310,46,'#8ce99a');txt('Rubis '+gem.r+'/'+tot.r+'  Diamantes '+gem.d+'/'+tot.d,480,360,24,'#fff')}
  else{txt('Parabéns! Vocês venceram! 🏆',480,310,44,'#ffd43b');txt('Pressione R para jogar de novo',480,360,22,'#fff')}}}
addEventListener('keydown',e=>{if(e.target&&e.target.tagName=='INPUT')return;if(e.code.startsWith('Arrow')||e.code=='Space')e.preventDefault();down[e.code]=1;
 if(state=='menu'){load(0);return}if(e.code=='KeyR')restart()});
addEventListener('keyup',e=>down[e.code]=0);cv.addEventListener('pointerdown',()=>{if(state=='menu')load(0)});
addEventListener('blur',()=>{for(const k in down)down[k]=0});
let last=0,acc=0;function loop(t){acc+=Math.min(t-last,100);last=t;while(acc>=16.667){step();acc-=16.667}draw();requestAnimationFrame(loop)}requestAnimationFrame(t=>{last=t;loop(t)});

let tt=0,mortes=0;
function restart(){if(state=='play')mortes++;load(state=='end'?0:lv)}
function finish(){const t=tt/60+2*mortes;BLIB.fim({slug:'foguinho',titulo:'🔥💧 Vocês venceram!',resumo:'Tempo: <b>'+t.toFixed(2)+'s</b> com '+mortes+' queda(s)/reinício(s)<br><small>(cada um soma +2s)</small>',campos:{tempo_segundos:+t.toFixed(2)},ordem:'tempo_segundos',asc:true,linha:r=>r.nome_jogador+' — '+Number(r.tempo_segundos).toFixed(2)+'s',denovo:()=>{load(0)}})}
document.getElementById('rs').onclick=restart;
