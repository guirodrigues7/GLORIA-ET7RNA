let nomeTimeUsuario = "";
let tecnicoEscolhido = "";
let formacaoAtual = "4-3-3";
let estiloAtual = "Equilibrado";
let modoAtual = "Sem filtro";
let draftIniciado = false;

let timesDisponiveis = [];
let timeSorteadoAtual = null;
let jogadoresEscalados = {};

const FORMATIONS = {
    "4-3-3": [
        { id: "GOL", label: "GOL", posBase: "GOL", top: "86%", left: "50%" },
        { id: "LD", label: "LD", posBase: "LD", top: "64%", left: "82%" },
        { id: "ZAG1", label: "ZAG", posBase: "ZAG", top: "67%", left: "62%" },
        { id: "ZAG2", label: "ZAG", posBase: "ZAG", top: "67%", left: "38%" },
        { id: "LE", label: "LE", posBase: "LE", top: "64%", left: "18%" },
        { id: "VOL", label: "VOL", posBase: "VOL", top: "46%", left: "50%" },
        { id: "MC1", label: "MC", posBase: "MC", top: "33%", left: "68%" },
        { id: "MC2", label: "MC", posBase: "MC", top: "33%", left: "32%" },
        { id: "PD", label: "PD", posBase: "PD", top: "16%", left: "80%" },
        { id: "ATA", label: "ATA", posBase: "ATA", top: "13%", left: "50%" },
        { id: "PE", label: "PE", posBase: "PE", top: "16%", left: "20%" }
    ],
    "4-4-2": [
        { id: "GOL", label: "GOL", posBase: "GOL", top: "86%", left: "50%" },
        { id: "LD", label: "LD", posBase: "LD", top: "64%", left: "82%" },
        { id: "ZAG1", label: "ZAG", posBase: "ZAG", top: "67%", left: "62%" },
        { id: "ZAG2", label: "ZAG", posBase: "ZAG", top: "67%", left: "38%" },
        { id: "LE", label: "LE", posBase: "LE", top: "64%", left: "18%" },
        { id: "MEI1", label: "MEI", posBase: "MEI", top: "42%", left: "80%" },
        { id: "MC1", label: "MC", posBase: "MC", top: "45%", left: "62%" },
        { id: "MC2", label: "MC", posBase: "MC", top: "45%", left: "38%" },
        { id: "MEI2", label: "MEI", posBase: "MEI", top: "42%", left: "20%" },
        { id: "ATA1", label: "ATA", posBase: "ATA", top: "17%", left: "62%" },
        { id: "ATA2", label: "ATA", posBase: "ATA", top: "17%", left: "38%" }
    ],
    "4-2-3-1": [
        { id: "GOL", label: "GOL", posBase: "GOL", top: "86%", left: "50%" },
        { id: "LD", label: "LD", posBase: "LD", top: "64%", left: "82%" },
        { id: "ZAG1", label: "ZAG", posBase: "ZAG", top: "67%", left: "62%" },
        { id: "ZAG2", label: "ZAG", posBase: "ZAG", top: "67%", left: "38%" },
        { id: "LE", label: "LE", posBase: "LE", top: "64%", left: "18%" },
        { id: "VOL1", label: "VOL", posBase: "VOL", top: "50%", left: "62%" },
        { id: "VOL2", label: "VOL", posBase: "VOL", top: "50%", left: "38%" },
        { id: "PD", label: "PD", posBase: "PD", top: "32%", left: "78%" },
        { id: "MEI", label: "MEI", posBase: "MEI", top: "30%", left: "50%" },
        { id: "PE", label: "PE", posBase: "PE", top: "32%", left: "22%" },
        { id: "ATA", label: "ATA", posBase: "ATA", top: "14%", left: "50%" }
    ],
    "4-2-4": [
        { id: "GOL", label: "GOL", posBase: "GOL", top: "86%", left: "50%" },
        { id: "LD", label: "LD", posBase: "LD", top: "64%", left: "82%" },
        { id: "ZAG1", label: "ZAG", posBase: "ZAG", top: "67%", left: "62%" },
        { id: "ZAG2", label: "ZAG", posBase: "ZAG", top: "67%", left: "38%" },
        { id: "LE", label: "LE", posBase: "LE", top: "64%", left: "18%" },
        { id: "MC1", label: "MC", posBase: "MC", top: "45%", left: "62%" },
        { id: "MC2", label: "MC", posBase: "MC", top: "45%", left: "38%" },
        { id: "PD", label: "PD", posBase: "PD", top: "18%", left: "84%" },
        { id: "ATA1", label: "ATA", posBase: "ATA", top: "14%", left: "62%" },
        { id: "ATA2", label: "ATA", posBase: "ATA", top: "14%", left: "38%" },
        { id: "PE", label: "PE", posBase: "PE", top: "18%", left: "16%" }
    ],
    "3-5-2": [
        { id: "GOL", label: "GOL", posBase: "GOL", top: "86%", left: "50%" },
        { id: "ZAG1", label: "ZAG", posBase: "ZAG", top: "66%", left: "72%" },
        { id: "ZAG2", label: "ZAG", posBase: "ZAG", top: "68%", left: "50%" },
        { id: "ZAG3", label: "ZAG", posBase: "ZAG", top: "66%", left: "28%" },
        { id: "ALA1", label: "ALA", posBase: "LD", top: "46%", left: "86%" },
        { id: "VOL1", label: "VOL", posBase: "VOL", top: "48%", left: "62%" },
        { id: "VOL2", label: "VOL", posBase: "VOL", top: "48%", left: "38%" },
        { id: "ALA2", label: "ALA", posBase: "LE", top: "46%", left: "14%" },
        { id: "MEI", label: "MEI", posBase: "MEI", top: "30%", left: "50%" },
        { id: "ATA1", label: "ATA", posBase: "ATA", top: "15%", left: "62%" },
        { id: "ATA2", label: "ATA", posBase: "ATA", top: "15%", left: "38%" }
    ],
    "5-3-2": [
        { id: "GOL", label: "GOL", posBase: "GOL", top: "86%", left: "50%" },
        { id: "LD", label: "LD", posBase: "LD", top: "60%", left: "86%" },
        { id: "ZAG1", label: "ZAG", posBase: "ZAG", top: "66%", left: "68%" },
        { id: "ZAG2", label: "ZAG", posBase: "ZAG", top: "68%", left: "50%" },
        { id: "ZAG3", label: "ZAG", posBase: "ZAG", top: "66%", left: "32%" },
        { id: "LE", label: "LE", posBase: "LE", top: "60%", left: "14%" },
        { id: "VOL", label: "VOL", posBase: "VOL", top: "45%", left: "50%" },
        { id: "MC1", label: "MC", posBase: "MC", top: "32%", left: "66%" },
        { id: "MC2", label: "MC", posBase: "MC", top: "32%", left: "34%" },
        { id: "ATA1", label: "ATA", posBase: "ATA", top: "15%", left: "62%" },
        { id: "ATA2", label: "ATA", posBase: "ATA", top: "15%", left: "38%" }
    ],
    "4-5-1": [
        { id: "GOL", label: "GOL", posBase: "GOL", top: "86%", left: "50%" },
        { id: "LD", label: "LD", posBase: "LD", top: "64%", left: "82%" },
        { id: "ZAG1", label: "ZAG", posBase: "ZAG", top: "67%", left: "62%" },
        { id: "ZAG2", label: "ZAG", posBase: "ZAG", top: "67%", left: "38%" },
        { id: "LE", label: "LE", posBase: "LE", top: "64%", left: "18%" },
        { id: "PD", label: "PD", posBase: "PD", top: "38%", left: "82%" },
        { id: "MC1", label: "MC", posBase: "MC", top: "45%", left: "64%" },
        { id: "MEI", label: "MEI", posBase: "MEI", top: "35%", left: "50%" },
        { id: "MC2", label: "MC", posBase: "MC", top: "45%", left: "36%" },
        { id: "PE", label: "PE", posBase: "PE", top: "38%", left: "18%" },
        { id: "ATA", label: "ATA", posBase: "ATA", top: "14%", left: "50%" }
    ],
    "3-4-3": [
        { id: "GOL", label: "GOL", posBase: "GOL", top: "86%", left: "50%" },
        { id: "ZAG1", label: "ZAG", posBase: "ZAG", top: "66%", left: "72%" },
        { id: "ZAG2", label: "ZAG", posBase: "ZAG", top: "68%", left: "50%" },
        { id: "ZAG3", label: "ZAG", posBase: "ZAG", top: "66%", left: "28%" },
        { id: "MEI1", label: "MEI", posBase: "MEI", top: "42%", left: "80%" },
        { id: "MC1", label: "MC", posBase: "MC", top: "45%", left: "62%" },
        { id: "MC2", label: "MC", posBase: "MC", top: "45%", left: "38%" },
        { id: "MEI2", label: "MEI", posBase: "MEI", top: "42%", left: "20%" },
        { id: "PD", label: "PD", posBase: "PD", top: "16%", left: "80%" },
        { id: "ATA", label: "ATA", posBase: "ATA", top: "13%", left: "50%" },
        { id: "PE", label: "PE", posBase: "PE", top: "16%", left: "20%" }
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    // Garante que a lista de times globais está carregada do times.js
    if (typeof TIMES_LIBERTADORES !== 'undefined') {
        timesDisponiveis = [...TIMES_LIBERTADORES];
    }

    setupOptionGroup("formation-grid", val => {
        if (draftIniciado) return;
        formacaoAtual = val;
        montarCampinhoTatico();
    });

    setupOptionGroup("style-grid", val => {
        if (draftIniciado) return;
        estiloAtual = val;
        montarCampinhoTatico();
    });

    setupOptionGroup("mode-grid", val => {
        if (draftIniciado) return;
        modoAtual = val;
        atualizarVisibilidadeOvrTopo();
    });

    montarCampinhoTatico();
});

function salvarConfiguracaoInicial() {
    const inputName = document.getElementById("welcome-input-name").value.trim();
    nomeTimeUsuario = inputName !== "" ? inputName : "Meu Esquadrão FC";
    tecnicoEscolhido = document.getElementById("welcome-select-coach").value;

    document.getElementById("display-team-name-badge").innerText = nomeTimeUsuario;
    document.getElementById("header-coach-tag").innerText = `TÉCNICO: ${tecnicoEscolhido.toUpperCase()}`;
    
    // Esconde o modal de boas-vindas com segurança
    document.getElementById("welcome-modal").classList.add("hidden");
}

function abrirManualAjuda() {
    document.getElementById("help-modal").classList.remove("hidden");
}

function fecharManualAjuda() {
    document.getElementById("help-modal").classList.add("hidden");
}

function setupOptionGroup(containerId, callback) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const buttons = container.querySelectorAll(".opt-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (draftIniciado) return;
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            callback(btn.getAttribute("data-val"));
        });
    });
}

function atualizarVisibilidadeOvrTopo() {
    const ovrPill = document.getElementById("ovr-header-pill");
    if (!ovrPill) return;
    if (modoAtual === "Com filtro") {
        ovrPill.classList.add("hidden");
    } else {
        ovrPill.classList.remove("hidden");
    }
}

function travarPainelTatico() {
    if (!draftIniciado) {
        draftIniciado = true;
        const panel = document.getElementById("tactics-panel");
        const notice = document.getElementById("lock-notice");
        if (panel) panel.classList.add("locked");
        if (notice) notice.classList.remove("hidden");
    }
}

function montarCampinhoTatico() {
    const field = document.getElementById("tactical-field");
    if (!field) return;
    field.innerHTML = "";
    const slotsDef = FORMATIONS[formacaoAtual];

    let deslocamentoY = 0;
    if (estiloAtual === "Defensivo") deslocamentoY = 7;
    if (estiloAtual === "Ofensivo") deslocamentoY = -7;

    slotsDef.forEach(slot => {
        const div = document.createElement("div");
        div.className = "pos-slot";
        div.id = `slot-${slot.id}`;
        
        let topNumerico = parseFloat(slot.top);
        if (slot.id !== "GOL") {
            topNumerico = Math.max(8, Math.min(76, topNumerico + deslocamentoY));
        }

        div.style.top = `${topNumerico}%`;
        div.style.left = slot.left;
        div.setAttribute("data-posbase", slot.posBase);
        div.innerHTML = `
            <span class="pos-label">${slot.label}</span>
            <span class="player-name">Vazio</span>
        `;
        field.appendChild(div);
    });
}

function jogadorCompativelComSlot(posicoesJogador, posBaseSlot) {
    if (posicoesJogador.includes(posBaseSlot)) return true;
    const grupoSlot = getGrupoPosicao(posBaseSlot);
    return posicoesJogador.some(p => getGrupoPosicao(p) === grupoSlot);
}

function getGrupoPosicao(pos) {
    if (pos === "GOL") return "GOL";
    if (["ZAG", "LD", "LE", "ALA"].includes(pos)) return "DEF";
    if (["VOL", "MC", "MEI"].includes(pos)) return "MEI";
    if (["ATA", "PE", "PD", "SA"].includes(pos)) return "ATA";
    return "OUTRO";
}

function temVagaParaJogador(posicoesJogador) {
    const slots = document.querySelectorAll(".pos-slot");
    for (let slot of slots) {
        const slotId = slot.id.replace("slot-", "");
        const posBase = slot.getAttribute("data-posbase");
        if (!jogadoresEscalados[slotId] && jogadorCompativelComSlot(posicoesJogador, posBase)) {
            return true;
        }
    }
    return false;
}

function rolarDado() {
    travarPainelTatico();

    if (timesDisponiveis.length === 0 && typeof TIMES_LIBERTADORES !== 'undefined') {
        timesDisponiveis = [...TIMES_LIBERTADORES];
    }

    if (timesDisponiveis.length === 0) {
        alert("Erro: A base de times (times.js) não foi carregada corretamente!");
        return;
    }

    const randomIndex = Math.floor(Math.random() * timesDisponiveis.length);
    timeSorteadoAtual = timesDisponiveis.splice(randomIndex, 1)[0];

    document.getElementById("drawn-team-name").innerText = timeSorteadoAtual.clube;
    document.getElementById("drawn-team-year").innerText = timeSorteadoAtual.ano;

    renderizarListaJogadoresSorteados();

    document.getElementById("team-reveal").classList.remove("hidden");
    document.getElementById("draft-start-box").classList.add("hidden");
}

function renderizarListaJogadoresSorteados() {
    const playerListDiv = document.getElementById("player-list");
    playerListDiv.innerHTML = "";
    let algumDisponivel = false;

    const mostrarOvr = (modoAtual === "Sem filtro");

    const obterPesoPosicao = (posArray) => {
        const p = posArray[0];
        if (p === "GOL") return 1;
        if (["ZAG", "LD", "LE", "ALA"].includes(p)) return 2;
        if (["VOL", "MC", "MEI"].includes(p)) return 3;
        return 4;
    };

    let elencoOrdenado = [...timeSorteadoAtual.elenco].sort((a, b) => {
        let pesoA = obterPesoPosicao(a.pos);
        let pesoB = obterPesoPosicao(b.pos);
        if (pesoA !== pesoB) return pesoA - pesoB;
        return Math.random() - 0.5;
    });

    elencoOrdenado.forEach(jogador => {
        const btn = document.createElement("button");
        btn.className = "player-btn";
        const posTexto = jogador.pos.join("/");
        
        const ovrHtml = mostrarOvr ? `<span class="ovr-tag">${jogador.ovr}</span>` : "";

        btn.innerHTML = `
            <span>${jogador.nome}</span>
            <div class="badges-right">
                <span class="pos-tag">${posTexto}</span>
                ${ovrHtml}
            </div>
        `;
        
        let jaEscalado = Object.values(jogadoresEscalados).some(j => j && j.nome === jogador.nome);
        let cabeNoTime = temVagaParaJogador(jogador.pos);

        if (jaEscalado || !cabeNoTime) {
            btn.disabled = true;
        } else {
            algumDisponivel = true;
            btn.onclick = () => destacarSlotsParaJogador(jogador, btn);
        }
        playerListDiv.appendChild(btn);
    });

    if (!algumDisponivel) {
        const rerollBtn = document.createElement("button");
        rerollBtn.innerText = "🔄 Sem vagas compatíveis! Rolar novamente";
        rerollBtn.className = "btn-gold-action";
        rerollBtn.style.marginTop = "10px";
        rerollBtn.onclick = rolarDado;
        playerListDiv.appendChild(rerollBtn);
    }
}

function destacarSlotsParaJogador(jogador, btnClicado) {
    document.querySelectorAll(".player-btn").forEach(b => b.style.borderColor = "");
    btnClicado.style.borderColor = "#c59b27";

    const slots = document.querySelectorAll(".pos-slot");
    slots.forEach(slot => {
        slot.style.border = "";
        slot.style.transform = "";
        slot.onclick = null;

        const posBase = slot.getAttribute("data-posbase");
        const slotId = slot.id.replace("slot-", "");
        
        if (!jogadoresEscalados[slotId] && jogadorCompativelComSlot(jogador.pos, posBase)) {
            slot.style.border = "3px solid #f7e199";
            slot.style.transform = "translate(-50%, -50%) scale(1.12)";
            slot.onclick = () => confirmarEscalacao(slotId, jogador);
        }
    });
}

function confirmarEscalacao(slotId, jogador) {
    const slot = document.getElementById(`slot-${slotId}`);
    slot.classList.add("filled");
    
    if (modoAtual === "Sem filtro") {
        slot.querySelector(".player-name").innerText = `${jogador.nome} (${jogador.ovr})`;
    } else {
        slot.querySelector(".player-name").innerText = jogador.nome;
    }
    
    jogadoresEscalados[slotId] = jogador;
    const total = Object.keys(jogadoresEscalados).length;
    document.getElementById("count-escalados").innerText = total;

    const somaOvr = Object.values(jogadoresEscalados).reduce((acc, j) => acc + j.ovr, 0);
    document.getElementById("team-ovr-display").innerText = Math.round(somaOvr / total);

    document.querySelectorAll(".pos-slot").forEach(s => {
        s.style.border = "";
        s.style.transform = "";
        s.onclick = null;
    });

    document.getElementById("team-reveal").classList.add("hidden");

    if (total === 11) {
        document.getElementById("sim-ready-box").classList.remove("hidden");
    } else {
        document.getElementById("draft-start-box").classList.remove("hidden");
    }
}

// ==========================================
// SIMULAÇÃO DA LIBERTADORES
// ==========================================
let grupoTimes = [];
let rodadaGrupo = 1;
let faseAtual = "GRUPOS";
let adversarioMataMata = null;
let intervaloSimulacao = null;

function calcularForcaTimeObj(elenco) {
    const ordenados = [...elenco].sort((a, b) => b.ovr - a.ovr).slice(0, 11);
    const soma = ordenados.reduce((acc, j) => acc + j.ovr, 0);
    return Math.round(soma / ordenados.length);
}

function iniciarSimulacao() {
    document.getElementById("modal-sim").classList.remove("hidden");
    
    const listaEscalados = Object.values(jogadoresEscalados);
    const somaOvr = listaEscalados.reduce((acc, j) => acc + j.ovr, 0);
    const ovrUsuario = Math.round(somaOvr / 11);

    let embaralhados = [...TIMES_LIBERTADORES].sort(() => 0.5 - Math.random());
    
    grupoTimes = [
        { nome: nomeTimeUsuario, isUser: true, pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, forca: ovrUsuario, elenco: listaEscalados },
        { nome: `${embaralhados[0].clube} (${embaralhados[0].ano})`, isUser: false, pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, forca: calcularForcaTimeObj(embaralhados[0].elenco), elenco: embaralhados[0].elenco },
        { nome: `${embaralhados[1].clube} (${embaralhados[1].ano})`, isUser: false, pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, forca: calcularForcaTimeObj(embaralhados[1].elenco), elenco: embaralhados[1].elenco },
        { nome: `${embaralhados[2].clube} (${embaralhados[2].ano})`, isUser: false, pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, forca: calcularForcaTimeObj(embaralhados[2].elenco), elenco: embaralhados[2].elenco }
    ];

    rodadaGrupo = 1;
    faseAtual = "GRUPOS";
    renderizarTelaPreJogo();
}

function renderizarTabelaGrupo() {
    let ordenados = [...grupoTimes].sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        let sgA = a.gp - a.gc;
        let sgB = b.gp - b.gc;
        if (sgB !== sgA) return sgB - sgA;
        return b.gp - a.gp;
    });

    let html = `<table class="group-table"><thead><tr><th>Pos</th><th>Clube</th><th>PTS</th><th>J</th><th>V</th><th>E</th><th>D</th><th>SG</th></tr></thead><tbody>`;
    ordenados.forEach((t, index) => {
        let sg = t.gp - t.gc;
        let classe = t.isUser ? "highlight-user" : "";
        let zona = index < 2 ? "✅ " : "";
        html += `<tr class="${classe}"><td>${zona}${index + 1}º</td><td style="text-align:left;">${t.nome}</td><td><b>${t.pts}</b></td><td>${t.j}</td><td>${t.v}</td><td>${t.e}</td><td>${t.d}</td><td>${sg > 0 ? '+' + sg : sg}</td></tr>`;
    });
    html += `</tbody></table>`;
    return html;
}

function renderizarTelaPreJogo() {
    const body = document.getElementById("sim-results-body");

    if (faseAtual === "GRUPOS") {
        document.getElementById("modal-stage-title").innerText = `Fase de Grupos • Rodada ${rodadaGrupo}/3`;
        let adv = grupoTimes[rodadaGrupo];
        let infoOvr = (modoAtual === "Sem filtro") ? `(OVR ${grupoTimes[0].forca} vs OVR ${adv.forca})` : "";
        
        body.innerHTML = `
            ${renderizarTabelaGrupo()}
            <div style="background:#fff; padding:15px; border-radius:8px; border:1px solid #cfc7b8; margin: 15px 0;">
                <p style="font-size:0.75rem; color:#777; font-weight:800;">PRÓXIMO CONFRONTO ${infoOvr}</p>
                <h2 style="margin:8px 0;">${nomeTimeUsuario} vs ${adv.nome}</h2>
                <p style="font-size:0.8rem; color:#9e7b1c; font-weight:bold;">Técnico: ${tecnicoEscolhido} • Estilo: ${estiloAtual}</p>
            </div>
            <button onclick="comecarPartidaAoVivo(grupoTimes[${rodadaGrupo}])" class="btn-gold-action">⚽ Iniciar Partida Ao Vivo</button>
        `;
    } else {
        document.getElementById("modal-stage-title").innerText = `Mata-Mata • ${faseAtual}`;
        body.innerHTML = `
            <div style="background:#fff; padding:20px; border-radius:8px; border:2px solid #c59b27; margin: 15px 0;">
                <p style="font-size:0.78rem; color:#9e7b1c; font-weight:800;">JOGO ÚNICO ELIMINATÓRIO</p>
                <h2 style="margin:10px 0;">${nomeTimeUsuario} vs ${adversarioMataMata.nome}</h2>
            </div>
            <button onclick="comecarPartidaAoVivo(adversarioMataMata)" class="btn-gold-action">⚽ Iniciar Decisão Ao Vivo</button>
        `;
    }
}

function comecarPartidaAoVivo(adversarioObj) {
    const body = document.getElementById("sim-results-body");
    const forcaUser = grupoTimes[0].forca;
    const forcaAdv = adversarioObj.forca;

    let minuto = 0;
    let golsUser = 0;
    let golsAdv = 0;

    let bonusTecnicoAtaque = 0;
    let bonusTecnicoDefesa = 0;

    if (tecnicoEscolhido === "Telê Santana") { bonusTecnicoAtaque += 0.035; }
    else if (tecnicoEscolhido === "Jorge Jesus") { bonusTecnicoAtaque += 0.04; }
    else if (tecnicoEscolhido === "Abel Ferreira") { bonusTecnicoDefesa += 0.035; }
    else if (tecnicoEscolhido === "Marcelo Gallardo") { bonusTecnicoAtaque += 0.03; }
    else if (tecnicoEscolhido === "Carlos Bianchi") { bonusTecnicoDefesa += 0.04; }
    else if (tecnicoEscolhido === "Luiz Felipe Scolari") { bonusTecnicoDefesa += 0.035; }
    else if (tecnicoEscolhido === "Renato Gaúcho") { bonusTecnicoAtaque += 0.035; }
    else if (tecnicoEscolhido === "Tite") { bonusTecnicoDefesa += 0.045; }

    let diffOvr = (forcaUser - forcaAdv) * 0.008;
    let modDificuldade = (modoAtual === "Com filtro") ? -0.025 : 0;

    let ataqueEstilo = (estiloAtual === "Ofensivo") ? 0.035 : (estiloAtual === "Defensivo" ? -0.03 : 0);
    let defesaEstilo = (estiloAtual === "Defensivo") ? -0.04 : (estiloAtual === "Ofensivo" ? 0.03 : 0);

    let probGolUser = Math.max(0.05, Math.min(0.28, 0.13 + diffOvr + modDificuldade + ataqueEstilo + bonusTecnicoAtaque));
    let probGolAdv = Math.max(0.04, Math.min(0.28, 0.13 - diffOvr - modDificuldade + defesaEstilo - bonusTecnicoDefesa));

    let jogadoresUser = Object.values(jogadoresEscalados);
    let artilheirosUser = jogadoresUser.filter(j => !j.pos.includes("GOL"));
    let defensoresUser = jogadoresUser.filter(j => j.pos.some(p => ["ZAG", "LD", "LE", "VOL"].includes(p)));
    if (defensoresUser.length === 0) defensoresUser = artilheirosUser;

    let jogadoresAdv = adversarioObj.elenco.filter(j => !j.pos.includes("GOL"));
    let defensoresAdv = adversarioObj.elenco.filter(j => j.pos.some(p => ["ZAG", "LD", "LE", "VOL"].includes(p)));
    if (defensoresAdv.length === 0) defensoresAdv = jogadoresAdv;

    body.innerHTML = `
        <div class="scoreboard">
            <span class="timer-badge" id="live-timer">0'</span>
            <div class="score-main">${nomeTimeUsuario} <span id="score-user">0</span> x <span id="score-adv">0</span> ${adversarioObj.nome}</div>
        </div>
        <div class="match-feed" id="match-feed">
            <p>📢 <b>0'</b> Bola rolando pela Glória E7erna!</p>
        </div>
        <div id="post-match-action"></div>
    `;

    const feed = document.getElementById("match-feed");

    intervaloSimulacao = setInterval(() => {
        minuto += 5;
        document.getElementById("live-timer").innerText = `${minuto}'`;

        let sorte = Math.random();

        if (sorte < probGolUser) {
            golsUser++;
            document.getElementById("score-user").innerText = golsUser;
            if (Math.random() < 0.05) {
                let zagueiroAdv = defensoresAdv[Math.floor(Math.random() * defensoresAdv.length)].nome;
                feed.innerHTML += `<p>⚽ <b>${minuto}'</b> - ${zagueiroAdv} (Gol Contra)</p>`;
            } else {
                let autor = artilheirosUser[Math.floor(Math.random() * artilheirosUser.length)].nome;
                feed.innerHTML += `<p>⚽ <b>${minuto}'</b> - ${autor}</p>`;
            }
            feed.scrollTop = feed.scrollHeight;
        } else if (sorte > (1 - probGolAdv)) {
            golsAdv++;
            document.getElementById("score-adv").innerText = golsAdv;
            if (Math.random() < 0.05) {
                let defensorUser = defensoresUser[Math.floor(Math.random() * defensoresUser.length)].nome;
                feed.innerHTML += `<p style="color:#b22222;">❌ <b>${minuto}'</b> - ${defensorUser} (Gol Contra)</p>`;
            } else {
                let autorAdv = jogadoresAdv[Math.floor(Math.random() * jogadoresAdv.length)].nome;
                feed.innerHTML += `<p style="color:#b22222;">❌ <b>${minuto}'</b> - ${autorAdv}</p>`;
            }
            feed.scrollTop = feed.scrollHeight;
        }

        if (minuto >= 90) {
            clearInterval(intervaloSimulacao);

            if (faseAtual !== "GRUPOS" && golsUser === golsAdv) {
                if (Math.random() > 0.4) {
                    golsUser++;
                    feed.innerHTML += `<p>🎯 <b>Pênaltis:</b> Vitória do ${nomeTimeUsuario}!</p>`;
                } else {
                    golsAdv++;
                    feed.innerHTML += `<p style="color:#b22222;">💔 <b>Pênaltis:</b> Vitória do ${adversarioObj.nome}.</p>`;
                }
            }

            feed.innerHTML += `<p>🏁 <b>90' Fim de jogo!</b> Placar final: ${golsUser} x ${golsAdv}</p>`;
            feed.scrollTop = feed.scrollHeight;
            finalizarPartida(golsUser, golsAdv);
        }
    }, 300);
}

function atualizarTabelaComSimulacaoOutrosJogos(indexAdversarioUser) {
    let userTeam = grupoTimes[0];
    let advTeam = grupoTimes[indexAdversarioUser];

    let gUser = parseInt(document.getElementById("score-user").innerText);
    let gAdv = parseInt(document.getElementById("score-adv").innerText);

    userTeam.j++; advTeam.j++;
    userTeam.gp += gUser; userTeam.gc += gAdv;
    advTeam.gp += gAdv; advTeam.gc += gUser;

    if (gUser > gAdv) { userTeam.pts += 3; userTeam.v++; advTeam.d++; }
    else if (gUser < gAdv) { advTeam.pts += 3; advTeam.v++; userTeam.d++; }
    else { userTeam.pts += 1; advTeam.pts += 1; userTeam.e++; advTeam.e++; }

    let indicesRestantes = [1, 2, 3].filter(i => i !== indexAdversarioUser);
    if (indicesRestantes.length === 2) {
        let tA = grupoTimes[indicesRestantes[0]];
        let tB = grupoTimes[indicesRestantes[1]];

        let gA = Math.floor(Math.random() * 3);
        let gB = Math.floor(Math.random() * 3);

        tA.j++; tB.j++;
        tA.gp += gA; tA.gc += gB;
        tB.gp += gB; tB.gc += gA;

        if (gA > gB) { tA.pts += 3; tA.v++; tB.d++; }
        else if (gA < gB) { tB.pts += 3; tB.v++; tA.d++; }
        else { tA.pts += 1; tB.pts += 1; tA.e++; tB.e++; }
    }
}

function finalizarPartida(golsUser, golsAdv) {
    const actionDiv = document.getElementById("post-match-action");

    if (faseAtual === "GRUPOS") {
        atualizarTabelaComSimulacaoOutrosJogos(rodadaGrupo);

        if (rodadaGrupo < 3) {
            rodadaGrupo++;
            actionDiv.innerHTML = `<button onclick="renderizarTelaPreJogo()" class="btn-gold-action">Próxima Rodada ➡️</button>`;
        } else {
            let ordenados = [...grupoTimes].sort((a, b) => (b.pts - a.pts) || ((b.gp - b.gc) - (a.gp - a.gc)));
            let posicaoUser = ordenados.findIndex(t => t.isUser) + 1;

            if (posicaoUser <= 2) {
                actionDiv.innerHTML = `
                    <p style="color:#1b4d3e; font-weight:bold; margin:10px 0;">🎉 Classificado em ${posicaoUser}º lugar!</p>
                    <button onclick="avancarParaMataMata('QUARTAS DE FINAL')" class="btn-gold-action">Ir para Quartas de Final ➡️</button>
                `;
            } else {
                actionDiv.innerHTML = `
                    <h3 style="color:#b22222; margin:10px 0;">Eliminado na Fase de Grupos</h3>
                    ${renderizarTabelaGrupo()}
                    <button onclick="location.reload()" class="btn-gold-action">Jogar Novamente</button>
                `;
            }
        }
    } else {
        if (golsUser > golsAdv) {
            if (faseAtual === "QUARTAS DE FINAL") {
                actionDiv.innerHTML = `<button onclick="avancarParaMataMata('SEMIFINAL')" class="btn-gold-action">Avançar para Semifinal ➡️</button>`;
            } else if (faseAtual === "SEMIFINAL") {
                actionDiv.innerHTML = `<button onclick="avancarParaMataMata('GRANDE FINAL')" class="btn-gold-action">Ir para a Grande Final 🏆</button>`;
            } else if (faseAtual === "GRANDE FINAL") {
                actionDiv.innerHTML = `
                    <h2 style="color:#9e7b1c; margin:15px 0;">🏆 CAMPEÃO DA GLÓRIA E7ERNA!</h2>
                    <button onclick="location.reload()" class="btn-gold-action">Jogar Novamente</button>
                `;
            }
        } else {
            actionDiv.innerHTML = `
                <h3 style="color:#b22222; margin:10px 0;">Eliminado na ${faseAtual}.</h3>
                <button onclick="location.reload()" class="btn-gold-action">Jogar Novamente</button>
            `;
        }
    }
}

function avancarParaMataMata(proximaFase) {
    faseAtual = proximaFase;
    let nomesGrupo = grupoTimes.map(t => t.nome);
    let possiveis = TIMES_LIBERTADORES.filter(t => !nomesGrupo.includes(`${t.clube} (${t.ano})`));
    let escolhido = possiveis[Math.floor(Math.random() * possiveis.length)];
    
    adversarioMataMata = { 
        nome: `${escolhido.clube} (${escolhido.ano})`, 
        forca: calcularForcaTimeObj(escolhido.elenco),
        elenco: escolhido.elenco
    };
    renderizarTelaPreJogo();
}

