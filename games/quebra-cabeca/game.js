const $=id=>document.getElementById(id),cv=$('c'),x=cv.getContext('2d'),BX=30,BY=95,BW=540,BH=405,LV=[{c:3,r:2},{c:4,r:3},{c:5,r:4}];
if(!x.roundRect)x.roundRect=function(a,b,w,h){this.rect(a,b,w,h)};
const mkc=()=>{const o=document.createElement('canvas');o.width=BW;o.height=BH;return o};
function sd(n){let s=n*9301+49297;return()=>{s=(s*9301+49297)%233280;return s/233280}}
function scene(n){const o=mkc(),g=o.getContext('2d'),R=sd(n+3),f=(c,a,b,w,h)=>{g.fillStyle=c;g.fillRect(a,b,w,h)},ci=(c,a,b,r)=>{g.fillStyle=c;g.beginPath();g.arc(a,b,r,0,7);g.fill()},tri=(c,a,b,d,e,h,i)=>{g.fillStyle=c;g.beginPath();g.moveTo(a,b);g.lineTo(d,e);g.lineTo(h,i);g.fill()};
 let q=g.createLinearGradient(0,0,0,BH);
 if(n==0){q.addColorStop(0,'#6ec6ff');q.addColorStop(1,'#e6f6ff');g.fillStyle=q;g.fillRect(0,0,BW,BH);ci('#ffd43b',460,70,42);for(let i=0;i<12;i++){g.strokeStyle='#ffd43b';g.lineWidth=5;g.beginPath();g.moveTo(460+Math.cos(i/12*6.28)*50,70+Math.sin(i/12*6.28)*50);g.lineTo(460+Math.cos(i/12*6.28)*66,70+Math.sin(i/12*6.28)*66);g.stroke()}
  for(const[a,b]of[[90,80],[250,55],[330,110]]){ci('#fff',a,b,26);ci('#fff',a+28,b+6,22);ci('#fff',a-26,b+8,20)}
  g.fillStyle='#7bd36b';g.beginPath();g.ellipse(120,420,260,140,0,0,7);g.fill();g.fillStyle='#4fb84a';g.beginPath();g.ellipse(430,440,300,130,0,0,7);g.fill();
  f('#ff6b6b',170,230,130,95);tri('#8d4b2e',155,232,235,160,315,232);f('#ffd43b',200,262,34,34);f('#8d4b2e',262,265,30,60);f('#fff',230,300,5,0);
  f('#8d4b2e',410,230,16,100);ci('#2f9e44',418,215,48);ci('#40c057',395,235,30);ci('#40c057',440,240,30);for(let i=0;i<24;i++)ci(['#ff6b6b','#ffd43b','#fff','#f783ac'][i%4],20+R()*500,330+R()*60,5);f('#e8c07a',255,325,40,90)}
 else if(n==1){q.addColorStop(0,'#0b0836');q.addColorStop(1,'#3b2a7a');g.fillStyle=q;g.fillRect(0,0,BW,BH);for(let i=0;i<80;i++)ci('#fff',R()*BW,R()*BH,R()*2+.5);
  ci('#ff922b',110,110,60);g.strokeStyle='#ffd43b';g.lineWidth=9;g.beginPath();g.ellipse(110,110,95,22,-.4,0,7);g.stroke();ci('#ff6b6b',100,95,10);ci('#e8590c',130,130,14);
  ci('#4dabf7',450,320,70);ci('#51cf66',430,300,26);ci('#51cf66',475,345,18);ci('#e9ecef',440,60,34);ci('#ced4da',430,50,8);ci('#ced4da',452,72,6);
  g.save();g.translate(280,220);g.rotate(.5);f('#f8f9fa',-30,-80,60,130);tri('#e03131',-30,-80,30,-80,0,-135);tri('#e03131',-30,30,-62,70,-30,-10);tri('#e03131',30,30,62,70,30,-10);ci('#4dabf7',0,-35,16);ci('#fff',-4,-39,5);tri('#ffd43b',-20,50,20,50,0,110);tri('#ff922b',-10,50,10,50,0,85);g.restore();ci('#ffd43b',60,330,16);ci('#ffd43b',200,370,10)}
 else{q.addColorStop(0,'#35a7ff');q.addColorStop(1,'#0b4a8f');g.fillStyle=q;g.fillRect(0,0,BW,BH);f('#e8c07a',0,360,BW,45);for(let i=0;i<5;i++){g.strokeStyle='#2f9e44';g.lineWidth=9;g.beginPath();g.moveTo(40+i*105,365);g.bezierCurveTo(10+i*105,320,70+i*105,280,40+i*105,230);g.stroke()}
  const fish=(a,b,c,s)=>{g.fillStyle=c;g.beginPath();g.ellipse(a,b,38*s,22*s,0,0,7);g.fill();tri(c,a-34*s,b,a-62*s,b-22*s,a-62*s,b+22*s);ci('#fff',a+18*s,b-6*s,7*s);ci('#222',a+20*s,b-6*s,3*s)};
  fish(150,120,'#ffd43b',1.3);fish(390,90,'#ff6b6b',1);fish(330,230,'#f783ac',1.4);fish(110,280,'#51cf66',.9);for(let i=0;i<25;i++){g.strokeStyle='#cfeaff';g.lineWidth=2;g.beginPath();g.arc(R()*BW,R()*340,3+R()*7,0,7);g.stroke()}
  f('#8d4b2e',400,320,90,45);f('#ffd43b',400,322,90,8);ci('#ffd43b',445,343,6);tri('#ff922b',230,365,250,330,270,365);tri('#ff922b',270,365,290,330,310,365)}
 return o}
let lvl=0,pcs=[],img=null,drag=null,tl=0,total=0,st='play',tmr=0,ghost=0,fx=[],msg='';
function load(n){lvl=n;img=scene(n);const{c,r}=LV[n],w=BW/c,h=BH/r;pcs=[];for(let j=0;j<r;j++)for(let i=0;i<c;i++)pcs.push({i,j,hx:BX+i*w,hy:BY+j*h,w,h,x:600+Math.random()*(330-w),y:BY+Math.random()*(500-h),p:0});
 pcs.sort(()=>Math.random()-.5);tl=0;st='play';ghost=0;drag=null;fx=[];msg=''}
function update(dt){fx.forEach(f=>{f.x+=f.vx*dt;f.y+=f.vy*dt;f.l-=dt});fx=fx.filter(f=>f.l>0);if(ghost>0)ghost-=dt;
 if(st=='play')tl+=dt;else if(st=='done'){tmr-=dt;if(tmr<=0){if(lvl<LV.length-1)load(lvl+1);else{st='end';finish()}}}}
function draw(){const g=x.createLinearGradient(0,0,0,600);g.addColorStop(0,'#7ec8ff');g.addColorStop(1,'#ffd1e8');x.fillStyle=g;x.fillRect(0,0,960,600);
 x.fillStyle='#fff8';x.beginPath();x.roundRect(BX-10,BY-10,BW+20,BH+20,16);x.fill();x.fillStyle='#ffffffaa';x.fillRect(BX,BY,BW,BH);
 x.strokeStyle='#8888cc';x.lineWidth=1;x.setLineDash([6,6]);const{c,r}=LV[lvl];for(let i=1;i<c;i++){x.beginPath();x.moveTo(BX+i*BW/c,BY);x.lineTo(BX+i*BW/c,BY+BH);x.stroke()}for(let j=1;j<r;j++){x.beginPath();x.moveTo(BX,BY+j*BH/r);x.lineTo(BX+BW,BY+j*BH/r);x.stroke()}x.setLineDash([]);
 if(ghost>0){x.globalAlpha=.45;x.drawImage(img,BX,BY);x.globalAlpha=1}
 x.fillStyle='#ffffff55';x.beginPath();x.roundRect(590,BY-10,350,BH+20+85,16);x.fill();x.fillStyle='#fff';x.font='bold 18px "Trebuchet MS"';x.textAlign='center';x.fillText('Arraste as peças para o quadro',765,BY+4);
 for(const p of pcs.filter(p=>p.p).concat(pcs.filter(p=>!p.p))){if(!p.p){x.shadowColor='#0006';x.shadowBlur=10;x.shadowOffsetY=4}x.drawImage(img,p.i*p.w,p.j*p.h,p.w,p.h,p.x,p.y,p.w,p.h);x.shadowBlur=0;x.shadowOffsetY=0;x.strokeStyle=p.p?'#ffffff66':'#fff';x.lineWidth=p.p?1:3;x.strokeRect(p.x,p.y,p.w,p.h)}
 fx.forEach(f=>{x.fillStyle=f.c;x.beginPath();x.arc(f.x,f.y,5*f.l+2,0,7);x.fill()});
 x.fillStyle='#fff';x.font='bold 20px "Trebuchet MS"';x.textAlign='left';x.fillText('Peças no lugar: '+pcs.filter(p=>p.p).length+'/'+pcs.length,BX,BY+BH+50);
 if(st=='done'){x.fillStyle='#0008';x.fillRect(0,230,960,130);x.font='bold 54px "Trebuchet MS"';x.textAlign='center';x.fillStyle='#fff';x.fillText(msg,480,310)}
 $('lv').textContent='Fase '+(lvl+1)+'/'+LV.length;$('tm').textContent='⏱ '+tl.toFixed(1)+'s (total '+(total+(st=='play'?tl:0)).toFixed(1)+'s)'}
function finish(){BLIB.fim({slug:'quebracabeca',titulo:'🧩 Quebra-cabeças completos!',resumo:'Tempo total: <b>'+total.toFixed(2)+'s</b><br><small>(cada reinício soma +3s, cada dica +5s)</small>',campos:{tempo_segundos:+total.toFixed(2)},ordem:'tempo_segundos',asc:true,linha:r=>r.nome_jogador+' — '+Number(r.tempo_segundos).toFixed(2)+'s',denovo:()=>{total=0;load(0)}})}
function drop(p){if(Math.abs(p.x-p.hx)<p.w*.3&&Math.abs(p.y-p.hy)<p.h*.3){p.p=1;p.x=p.hx;p.y=p.hy;BLIB.som('ok');for(let i=0;i<16;i++)fx.push({x:p.hx+p.w/2,y:p.hy+p.h/2,vx:(Math.random()-.5)*300,vy:(Math.random()-.5)*300,l:.6,c:['#ffd43b','#fff','#ff6b6b','#51cf66'][i%4]});
  if(pcs.every(q=>q.p)){st='done';tmr=1.8;total+=tl;msg=lvl<LV.length-1?'Imagem revelada! 🎉':'Você completou tudo! 🏆'}}}
const pt=e=>{const r=cv.getBoundingClientRect();return{x:(e.clientX-r.left)*960/r.width,y:(e.clientY-r.top)*600/r.height}};
cv.addEventListener('pointerdown',e=>{if(st!='play')return;const q=pt(e);for(let i=pcs.length-1;i>=0;i--){const p=pcs[i];if(!p.p&&q.x>=p.x&&q.x<=p.x+p.w&&q.y>=p.y&&q.y<=p.y+p.h){cv.setPointerCapture(e.pointerId);drag={p,dx:q.x-p.x,dy:q.y-p.y};pcs.splice(i,1);pcs.push(p);return}}});
cv.addEventListener('pointermove',e=>{if(!drag)return;const q=pt(e),p=drag.p;p.x=Math.max(0,Math.min(960-p.w,q.x-drag.dx));p.y=Math.max(0,Math.min(600-p.h,q.y-drag.dy))});
cv.addEventListener('pointerup',()=>{if(drag){const p=drag.p;drag=null;drop(p)}});
function hint(){if(st=='play'){tl+=5;ghost=2.5}}
function restart(){if(st=='play')total+=3;if(st!='end')load(lvl)}
addEventListener('keydown',e=>{if(e.target.tagName=='INPUT')return;if(e.code=='KeyR')restart();if(e.code=='KeyH')hint()});$('rs').onclick=restart;$('hn').onclick=hint;
load(0);let last=0;function loop(ts){update(Math.min((ts-last)/1000,.1));last=ts;draw();requestAnimationFrame(loop)}requestAnimationFrame(ts=>{last=ts;loop(ts)});
