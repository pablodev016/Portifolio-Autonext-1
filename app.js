const ST=['Aguardando','Em andamento','Pronto','Entregue'];
const COR={'Aguardando':'#f59e0b','Em andamento':'#60a5fa','Pronto':'#4ade80','Entregue':'#2dd4bf'};
const PAS={'Aguardando':'#f4a672','Em andamento':'#8aa4f5','Pronto':'#86efac','Entregue':'#5eead4'};
const IC={painel:'<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2 .7 3.5 2.6 3.5 5.5"/>',
car:'<path d="M3 13l2-6h14l2 6v5h-3v-2H6v2H3z"/><circle cx="7.5" cy="14" r="1"/><circle cx="16.5" cy="14" r="1"/>',
clip:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/>',
out:'<path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"/>',
arr:'<path d="M7 17L17 7M8 7h9v9"/>',plus:'<path d="M12 5v14M5 12h14"/>',search:'<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4"/>',
trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',chl:'<path d="M15 6l-6 6 6 6"/>',chr:'<path d="M9 6l6 6-6 6"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',
wrench:'<path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2.6-.6-.6-2.6z"/>',
cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
wallet:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/>',
box:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
chart:'<path d="M3 20h18M6 20v-6M11 20V9M16 20v-9"/>',
bot:'<rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 4v4M9 13v1M15 13v1"/>',
sliders:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>'};
const ic=(n,s=20)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]}</svg>`;
const brl=n=>Number(n||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fd=d=>new Date(d+'T12:00:00').toLocaleDateString('pt-BR');
const $=i=>document.getElementById(i);
const PG=5;
const seed={clientes:[{id:1,nome:'Marcos Silva',tel:'(16) 99999-1111'},{id:2,nome:'Ana Pereira',tel:'(16) 98888-2222'},{id:3,nome:'Carlos Souza',tel:'(16) 97777-3333'}],
 veiculos:[{id:1,cid:1,placa:'ABC1D23',modelo:'Gol 2014'},{id:2,cid:2,placa:'XYZ9K88',modelo:'Onix 2019'},{id:3,cid:3,placa:'QWE4R56',modelo:'Strada 2021'}],
 os:[{id:1,vid:1,desc:'Troca de pastilhas de freio',valor:320,status:'Entregue',data:'2026-11-02'},
 {id:2,vid:2,desc:'Revisão de 40 mil km',valor:780,status:'Pronto',data:'2026-11-03'},
 {id:3,vid:3,desc:'Troca de embreagem',valor:1450,status:'Em andamento',data:'2026-11-04'},
 {id:4,vid:1,desc:'Alinhamento e balanceamento',valor:180,status:'Aguardando',data:'2026-11-05'},
 {id:5,vid:2,desc:'Troca de óleo e filtros',valor:260,status:'Em andamento',data:'2026-11-06'},
 {id:6,vid:3,desc:'Diagnóstico de barulho na suspensão',valor:120,status:'Aguardando',data:'2026-11-07'},
 {id:7,vid:1,desc:'Troca de correia dentada',valor:690,status:'Aguardando',data:'2026-11-08'}]};
let S,tela='painel',logado=false;
const ui={q:'',fs:'',sort:'new',page:1,open:false,del:0,nome:'Pablo'};
function load(){try{const r=localStorage.getItem('oficinapro-v2');if(r)return JSON.parse(r)}catch(e){}return JSON.parse(JSON.stringify(seed))}
function save(){try{localStorage.setItem('oficinapro-v2',JSON.stringify(S))}catch(e){}}
S=load();
S.agenda=S.agenda||[];S.cfg=S.cfg||{zap:''};
const nid=a=>a.reduce((m,x)=>Math.max(m,x.id),0)+1;
const cli=id=>S.clientes.find(c=>c.id===id);
const vei=id=>S.veiculos.find(v=>v.id===id);
function toast(m){const t=$('toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove('on'),2200)}
const head=(t,s)=>`<header class="hd"><div><h1>${t}</h1><p class="mut">${s}</p></div><span class="date">Hoje, ${new Date().toLocaleDateString('pt-BR',{weekday:'short',day:'numeric',month:'short'})}</span></header>`;

function vLogin(){return `<div class="login"><div class="card"><img class="logo-img" src="img/logo.png" alt="AutoNext"><p class="mut">Gestão simples para a sua oficina.</p>
<form id="f-login"><label for="em">E-mail</label><input id="em" type="email" required autocomplete="username">
<label for="se">Senha</label><input id="se" type="password" required autocomplete="current-password">
<button class="btn full" type="submit">Entrar</button></form>
<p class="note">Protótipo: qualquer e-mail e senha entram. O login de verdade vem na etapa do servidor.</p></div></div>`}

function vPainel(){
 const ab=S.os.filter(o=>o.status!=='Entregue'),fat=S.os.filter(o=>o.status==='Entregue').reduce((t,o)=>t+o.valor,0),aberto=ab.reduce((t,o)=>t+o.valor,0);
 const cont=s=>S.os.filter(o=>o.status===s).length,mx=Math.max(1,...ST.map(cont));
 const st=(cls,l,v,go)=>`<div class="card stat ${cls}"><div class="top"><span>${l}</span><button class="ar" data-go="${go}" aria-label="Abrir ${l}">${ic('arr',16)}</button></div><strong>${v}</strong></div>`;
 return head(`Olá, ${esc(ui.nome)}!`,'Veja o que está acontecendo na oficina.')+`<div class="dash">
 ${st('hi','Faturado (entregues)',brl(fat),'os')}${st('','OS abertas',ab.length,'os')}${st('','Valor em aberto',brl(aberto),'os')}${st('','Clientes',S.clientes.length,'clientes')}
 <div class="card tile"><span class="ico">${ic('clip')}</span><div><strong>${S.os.length} ordens</strong><p class="mut">${cont('Aguardando')} <span class="w">aguardando</span> início.</p></div></div>
 <div class="card tile"><span class="ico">${ic('users')}</span><div><strong>${S.clientes.length} clientes</strong><p class="mut">${S.veiculos.length} veículos cadastrados.</p></div></div>
 <div class="card chart"><h3>Ordens por status</h3>${ST.map(s=>`<div class="bar"><span>${s}</span><i style="--c:${COR[s]};--w:${cont(s)/mx*100}%"></i><b>${cont(s)}</b></div>`).join('')}</div></div>`}

function vClientes(){
 const rows=S.clientes.map(c=>`<tr><td><b>${esc(c.nome)}</b></td><td>${esc(c.tel)}</td><td>${S.veiculos.filter(v=>v.cid===c.id).length}</td></tr>`).join('');
 return head('Clientes','Quem confia o carro à sua oficina.')+`<div class="row"><div class="card"><h3>Novo cliente</h3>
 <form id="f-cli"><label for="cn">Nome</label><input id="cn" required><label for="ct">Telefone</label><input id="ct" required>
 <button class="btn full" type="submit">Salvar cliente</button></form></div>
 <div class="card tbl">${rows?`<table style="min-width:420px"><tr><th>Nome</th><th>Telefone</th><th>Veículos</th></tr>${rows}</table>`:'<p class="empty">Cadastre o primeiro cliente ao lado.</p>'}</div></div>`}

function vVeiculos(){
 const opt=S.clientes.map(c=>`<option value="${c.id}">${esc(c.nome)}</option>`).join('');
 const rows=S.veiculos.map(v=>`<tr><td><b>${esc(v.placa)}</b></td><td>${esc(v.modelo)}</td><td>${esc(cli(v.cid)?.nome||'—')}</td></tr>`).join('');
 return head('Veículos','Cada carro ligado ao seu dono.')+`<div class="row"><div class="card"><h3>Novo veículo</h3>
 ${S.clientes.length?`<form id="f-vei"><label for="vc">Cliente</label><select id="vc">${opt}</select>
 <label for="vp">Placa</label><input id="vp" required maxlength="8"><label for="vm">Modelo e ano</label><input id="vm" required>
 <button class="btn full" type="submit">Salvar veículo</button></form>`:'<p class="empty">Cadastre um cliente antes.</p>'}</div>
 <div class="card tbl">${rows?`<table style="min-width:420px"><tr><th>Placa</th><th>Modelo</th><th>Dono</th></tr>${rows}</table>`:'<p class="empty">Nenhum veículo ainda.</p>'}</div></div>`}

function osList(){
 let a=S.os.map(o=>{const v=vei(o.vid);return {...o,v,c:v&&cli(v.cid)}});
 const q=ui.q.toLowerCase();
 a=a.filter(o=>(!ui.fs||o.status===ui.fs)&&(!q||[o.id,o.c?.nome,o.v?.placa,o.v?.modelo,o.desc].join(' ').toLowerCase().includes(q)));
 a.sort(ui.sort==='old'?(x,y)=>x.id-y.id:ui.sort==='val'?(x,y)=>y.valor-x.valor:(x,y)=>y.id-x.id);
 const pages=Math.max(1,Math.ceil(a.length/PG));if(ui.page>pages)ui.page=pages;
 const pg=a.slice((ui.page-1)*PG,ui.page*PG);
 const rows=pg.map(o=>`<tr><td><b>#${o.id}</b></td><td><b>${esc(o.c?.nome||'—')}</b><small>${esc(o.c?.tel||'')}</small></td><td>${esc(o.v?.modelo||'—')}<small>${esc(o.v?.placa||'')}</small></td><td>${esc(o.desc)}</td><td>${brl(o.valor)}</td><td>${fd(o.data)}</td>
 <td><select class="pill" data-os="${o.id}" style="--c:${COR[o.status]}" aria-label="Status da ordem ${o.id}">${ST.map(s=>`<option${s===o.status?' selected':''}>${s}</option>`).join('')}</select></td>
 <td><button class="ib${ui.del===o.id?' danger':''}" data-del="${o.id}" aria-label="Excluir ordem ${o.id}">${ui.del===o.id?'Confirmar':ic('trash',16)}</button></td></tr>`).join('');
 return `<div class="fr"><div class="chips">${ui.fs?`<span class="chip">${ui.fs}<button data-fs="${ui.fs}" aria-label="Remover filtro">${ic('x',12)}</button></span>`:''}<span class="mut">${a.length} ${a.length===1?'ordem':'ordens'}</span></div>
 <div class="pgn"><span class="mut">${ui.page} de ${pages}</span><button data-pg="-1" aria-label="Página anterior"${ui.page<=1?' disabled':''}>${ic('chl',16)}</button><button data-pg="1" aria-label="Próxima página"${ui.page>=pages?' disabled':''}>${ic('chr',16)}</button></div></div>
 <div class="card tbl">${rows?`<table><tr><th>Nº</th><th>Cliente</th><th>Veículo</th><th>Serviço</th><th>Valor</th><th>Abertura</th><th>Status</th><th></th></tr>${rows}</table>`:`<p class="empty">${S.os.length?'Nenhuma ordem encontrada com esses filtros.':'Nenhuma ordem ainda. Clique em Nova OS para abrir a primeira.'}</p>`}</div>`}

function vOS(){
 const cont=s=>S.os.filter(o=>o.status===s).length;
 const opt=S.veiculos.map(v=>`<option value="${v.id}">${esc(v.placa)} · ${esc(v.modelo)}</option>`).join('');
 return head('Ordens de serviço','Acompanhe cada serviço da abertura até a entrega.')+
 `<div class="scs">${ST.map(s=>`<button class="sc${ui.fs===s?' on':''}" data-fs="${s}" style="--p:${PAS[s]}"><span class="sh">${s}</span><strong>${cont(s)}</strong></button>`).join('')}</div>
 <div class="tb"><label class="sr">${ic('search',18)}<input id="q" type="search" placeholder="Buscar por cliente, placa ou número" value="${esc(ui.q)}" aria-label="Buscar ordens"></label>
 <select id="sort" aria-label="Ordenar"><option value="new"${ui.sort==='new'?' selected':''}>Mais recentes</option><option value="old"${ui.sort==='old'?' selected':''}>Mais antigas</option><option value="val"${ui.sort==='val'?' selected':''}>Maior valor</option></select>
 <button class="btn white" data-new>${ic('plus',16)} Nova OS</button></div>
 <div id="os-list">${osList()}</div>
 <dialog id="dlg"><h3>Nova ordem de serviço</h3>${S.veiculos.length?`<form id="f-os"><label for="ov">Veículo</label><select id="ov">${opt}</select>
 <label for="od">Serviço a fazer</label><textarea id="od" rows="3" required></textarea>
 <label for="oval">Valor (R$)</label><input id="oval" type="number" min="0" step="0.01" required>
 <div class="acts"><button class="btn ghost" type="button" data-close>Cancelar</button><button class="btn" type="submit">Abrir ordem</button></div></form>`:`<p class="empty">Cadastre um veículo antes de abrir uma ordem.</p><div class="acts"><button class="btn ghost" type="button" data-close>Fechar</button></div>`}</dialog>`}


/* ===== AGENDAMENTOS (versão simples) ===== */
const AG_ST=['Pendente','Confirmado','Em atendimento','Concluído','Cancelado','Faltou'];
const AG_COR={'Pendente':'#f59e0b','Confirmado':'#60a5fa','Em atendimento':'#a78bfa','Concluído':'#4ade80','Cancelado':'#f87171','Faltou':'#94a3b8'};
const ABRE='08:00',FECHA='18:00',BOXES=1;
const isoLocal=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const hojeISO=()=>isoLocal(new Date());
const fdm=d=>d.slice(8,10)+'/'+d.slice(5,7);
const foneZap=t=>{let n=String(t||'').replace(/\D/g,'');if(n.length>=10&&n.length<=11)n='55'+n;return n};
const pend=()=>S.agenda.filter(a=>a.status==='Pendente').length;
const agCompleta=a=>({...a,c:cli(a.cid),v:vei(a.vid)});
const optVei=cid=>{const l=S.veiculos.filter(v=>v.cid===cid);return l.length?l.map(v=>`<option value="${v.id}">${esc(v.placa)} · ${esc(v.modelo)}</option>`).join(''):'<option value="">Cliente sem veículo cadastrado</option>'};
function abrirZap(fone,msg){
 const n=foneZap(fone);
 if(n.length<12){toast('Telefone não cadastrado ou inválido');return}
 window.open('https://wa.me/'+n+'?text='+encodeURIComponent(msg),'_blank','noopener');
 toast('WhatsApp aberto. Revise e envie a mensagem.')}
const msgCli=a=>`Olá, ${a.c.nome.split(' ')[0]}! Tudo bem?\n\nSeu agendamento na nossa oficina foi registrado!\n\nVeículo: ${a.v.modelo} (${a.v.placa}).\nServiço: ${a.desc}.\nData: ${fdm(a.data)}.\nHorário: ${a.hora}.\n\nAguardamos você!`;
const msgDono=a=>`Novo agendamento: ${a.c.nome} (${a.c.tel}).\nVeículo: ${a.v.modelo} (${a.v.placa}).\nServiço: ${a.desc}.\nData: ${fdm(a.data)} às ${a.hora}.`;

function salvarAg(){
 const g=i=>$(i).value.trim(),vid=Number(g('ag-v')),data=g('ag-d'),hora=g('ag-h');
 if(!vid){toast('Esse cliente não tem veículo cadastrado');return false}
 if(hora<ABRE||hora>=FECHA){toast('Fora do horário de funcionamento ('+ABRE+' às '+FECHA+')');return false}
 const ocupados=S.agenda.filter(a=>a.data===data&&a.hora===hora&&!['Cancelado','Faltou'].includes(a.status)).length;
 if(ocupados>=BOXES){toast('Esse horário já está ocupado. Escolha outro.');return false}
 S.agenda.push({id:nid(S.agenda),cid:Number(g('ag-c')),vid,desc:g('ag-s'),data,hora,obs:g('ag-o'),status:'Pendente'});
 save();toast('Agendamento criado. Use os botões para avisar pelo WhatsApp.');return true}

function agLista(){
 const q=(ui.aq||'').toLowerCase(),hoje=hojeISO(),am=isoLocal(new Date(Date.now()+864e5));
 const a=S.agenda.map(agCompleta).filter(x=>x.c&&x.v&&(!ui.afs||x.status===ui.afs)&&(!q||[x.c.nome,x.v.placa,x.v.modelo,x.desc].join(' ').toLowerCase().includes(q))).sort((x,y)=>(x.data+x.hora).localeCompare(y.data+y.hora));
 if(!a.length)return `<div class="card"><p class="empty">${S.agenda.length?'Nenhum agendamento encontrado.':'Nenhum agendamento ainda. Clique em Novo agendamento.'}</p></div>`;
 let h='',dia='';
 for(const x of a){
  if(x.data!==dia){dia=x.data;h+=`<div class="dia">${dia===hoje?'Hoje':dia===am?'Amanhã':new Date(dia+'T12:00:00').toLocaleDateString('pt-BR',{weekday:'long'})} — ${fdm(dia)}</div>`}
  h+=`<div class="card ag" style="--c:${AG_COR[x.status]}"><div class="hr">${x.hora}</div>
  <div><b>${esc(x.c.nome)}</b> · ${esc(x.v.modelo)} (${esc(x.v.placa)})<small>${esc(x.desc)}${x.obs?' — '+esc(x.obs):''}</small></div>
  <div class="aga"><select class="pill" data-ags="${x.id}" style="--c:${AG_COR[x.status]}" aria-label="Status do agendamento">${AG_ST.map(s=>`<option${s===x.status?' selected':''}>${s}</option>`).join('')}</select>
  <button class="ib" data-act="zapcli" data-id="${x.id}">Avisar cliente</button><button class="ib" data-act="zapdono" data-id="${x.id}">Avisar proprietário</button>
  ${x.osId?`<button class="ib" data-act="verOS">Ver OS #${x.osId}</button>`:`<button class="ib" data-act="gerar" data-id="${x.id}">Gerar OS</button>`}</div></div>`}
 return h}

function vAgenda(){
 const hoje=hojeISO(),cont=s=>S.agenda.filter(a=>a.status===s).length;
 const nHoje=S.agenda.filter(a=>a.data===hoje&&!['Cancelado','Faltou'].includes(a.status)).length;
 const cs=[['Hoje',nHoje,'#8aa4f5',''],['Pendente',cont('Pendente'),'#f4a672','Pendente'],['Confirmado',cont('Confirmado'),'#5eead4','Confirmado'],['Em atendimento',cont('Em atendimento'),'#c4b5fd','Em atendimento']];
 const oc=S.clientes.map(c=>`<option value="${c.id}">${esc(c.nome)}</option>`).join('');
 const pronto=S.clientes.length&&S.veiculos.length;
 return head('Agendamentos','Organize os horários da oficina e avise pelo WhatsApp.')+
 `<div class="scs">${cs.map(([n,v,p,f])=>`<button class="sc${f&&ui.afs===f?' on':''}" data-afs="${f}" style="--p:${p}"><span class="sh">${n}</span><strong>${v}</strong></button>`).join('')}</div>
 <details class="cfg card"><summary>WhatsApp do proprietário${S.cfg.zap?' — '+esc(S.cfg.zap):' (não configurado)'}</summary><form id="f-cfg"><label for="cfg-zap">Número com DDD</label><input id="cfg-zap" type="tel" placeholder="(16) 99999-9999" value="${esc(S.cfg.zap)}"><button class="btn full" type="submit">Salvar número</button></form></details>
 <div class="tb"><label class="sr">${ic('search',18)}<input id="aq" type="search" placeholder="Buscar por cliente, placa ou veículo" value="${esc(ui.aq||'')}" aria-label="Buscar agendamentos"></label><button class="btn white" data-act="novoag">${ic('plus',16)} Novo agendamento</button></div>
 <div id="ag-list">${agLista()}</div>
 <dialog id="dlg-ag"><h3>Novo agendamento</h3>${pronto?`<form id="f-ag"><label for="ag-c">Cliente</label><select id="ag-c">${oc}</select><label for="ag-v">Veículo</label><select id="ag-v" required>${optVei(S.clientes[0].id)}</select>
 <label for="ag-s">Serviço solicitado</label><input id="ag-s" required><label for="ag-d">Data</label><input id="ag-d" type="date" min="${hoje}" value="${hoje}" required><label for="ag-h">Horário (${ABRE} às ${FECHA})</label><input id="ag-h" type="time" min="${ABRE}" max="${FECHA}" required><label for="ag-o">Observações</label><input id="ag-o">
 <div class="acts"><button class="btn ghost" type="button" data-act="fechar">Cancelar</button><button class="btn" type="submit">Agendar</button></div></form>`:`<p class="empty">Cadastre pelo menos um cliente e um veículo antes.</p><div class="acts"><button class="btn ghost" type="button" data-act="fechar">Fechar</button></div>`}</dialog>`}

document.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;const d=t.dataset;
 if('afs' in d){ui.afs=ui.afs===d.afs?'':d.afs;return render()}
 if(d.act==='novoag')return $('dlg-ag').showModal();
 if(d.act==='fechar')return $('dlg-ag').close();
 if(d.act==='verOS'){tela='os';return render()}
 const r=d.id&&S.agenda.find(x=>x.id===Number(d.id));if(!r)return;const a=agCompleta(r);
 if(d.act==='zapcli')return abrirZap(a.c.tel,msgCli(a));
 if(d.act==='zapdono'){if(!S.cfg.zap)return toast('Configure o WhatsApp do proprietário primeiro');return abrirZap(S.cfg.zap,msgDono(a))}
 if(d.act==='gerar'&&!r.osId){const id=nid(S.os);S.os.push({id,vid:r.vid,desc:r.desc,valor:0,status:'Aguardando',data:hojeISO()});r.osId=id;r.status='Em atendimento';save();toast('Ordem #'+id+' criada a partir do agendamento');return render()}});
document.addEventListener('change',e=>{const t=e.target;
 if(t.dataset.ags){const r=S.agenda.find(x=>x.id===Number(t.dataset.ags));if(r){r.status=t.value;save();toast('Agendamento: '+r.status);render()}}
 else if(t.id==='ag-c')$('ag-v').innerHTML=optVei(Number(t.value))});
document.addEventListener('input',e=>{if(e.target.id==='aq'){ui.aq=e.target.value;const l=$('ag-list');if(l)l.innerHTML=agLista()}});

const NAV=[
 {k:'painel',n:'Painel',i:'painel',ok:true},
 {k:'clientes',n:'Clientes',i:'users',ok:true},
 {k:'veiculos',n:'Veículos',i:'car',ok:true},
 {k:'os',n:'Ordens de serviço',i:'clip',ok:true},
 {k:'agenda',n:'Agendamentos',i:'cal',ok:true},
 {k:'financeiro',n:'Financeiro',i:'wallet',ok:false},
 {k:'estoque',n:'Estoque',i:'box',ok:false},
 {k:'relatorios',n:'Relatórios',i:'chart',ok:false},
 {k:'ia',n:'Assistente IA',i:'bot',ok:false},
 {k:'config',n:'Configurações',i:'sliders',ok:false}];
const TELAS={painel:vPainel,clientes:vClientes,veiculos:vVeiculos,os:vOS,agenda:vAgenda};
function render(){
 const r=$('root');
 if(!logado){r.innerHTML=vLogin();return}
 r.innerHTML=`<div class="app${ui.open?' open':''}"><nav><div class="brand"><span class="logo">${ic('wrench')}</span><img class="logo-img lb" src="img/logo.png" alt="AutoNext"></div>
 <button class="tog" id="tog" aria-label="Recolher ou expandir o menu">${ic(ui.open?'chl':'chr',16)}</button>
 ${NAV.map(m=>`<button class="nb${m.k===tela?' on':''}${m.ok?'':' off'}" ${m.ok?`data-t="${m.k}"`:'disabled'} title="${m.n}${m.ok?'':' (em breve)'}" aria-label="${m.n}">${ic(m.i)}<span class="lb">${m.n}</span>${m.k==='agenda'&&pend()?`<i class="bdg">${pend()}</i>`:''}</button>`).join('')}
 <button class="nb out" data-t="sair" title="Sair" aria-label="Sair">${ic('out')}<span class="lb">Sair</span></button></nav><main>${TELAS[tela]()}</main></div>`}
const list=()=>{const l=$('os-list');if(l)l.innerHTML=osList()};

document.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;const d=t.dataset;
 if(t.id==='tog'){ui.open=!ui.open;return render()}
 if(d.t){if(d.t==='sair')logado=false;else tela=d.t;ui.del=0;return render()}
 if(d.go){tela=d.go;return render()}
 if('fs' in d){ui.fs=ui.fs===d.fs?'':d.fs;ui.page=1;return render()}
 if(d.pg){ui.page+=Number(d.pg);return list()}
 if(d.del){const id=Number(d.del);if(ui.del===id){S.os=S.os.filter(o=>o.id!==id);ui.del=0;save();toast('Ordem #'+id+' excluída');return render()}ui.del=id;return list()}
 if('new' in d)return $('dlg').showModal();
 if('close' in d)$('dlg').close()});
document.addEventListener('input',e=>{if(e.target.id==='q'){ui.q=e.target.value;ui.page=1;list()}});
document.addEventListener('change',e=>{const t=e.target;
 if(t.id==='sort'){ui.sort=t.value;ui.page=1;list()}
 else if(t.dataset.os){const o=S.os.find(x=>x.id===Number(t.dataset.os));if(o){o.status=t.value;save();toast('Ordem #'+o.id+': '+o.status);render()}}});
document.addEventListener('submit',e=>{e.preventDefault();const f=e.target.id,v=i=>$(i).value.trim();
 if(f==='f-login'){logado=true;const n=v('em').split('@')[0];ui.nome=n?n[0].toUpperCase()+n.slice(1):'Pablo'}
 else if(f==='f-cli'){S.clientes.push({id:nid(S.clientes),nome:v('cn'),tel:v('ct')});save();toast('Cliente salvo')}
 else if(f==='f-vei'){S.veiculos.push({id:nid(S.veiculos),cid:Number(v('vc')),placa:v('vp').toUpperCase(),modelo:v('vm')});save();toast('Veículo salvo')}
 else if(f==='f-ag'){if(!salvarAg())return}
 else if(f==='f-cfg'){S.cfg.zap=v('cfg-zap');save();toast('Número do proprietário salvo')}
 else if(f==='f-os'){const id=nid(S.os);S.os.push({id,vid:Number(v('ov')),desc:v('od'),valor:Number(v('oval')),status:'Aguardando',data:hojeISO()});save();ui.page=1;ui.sort='new';toast('Ordem #'+id+' aberta')}
 render()});
render();
