const saudacao = document.getElementById("saudacao");
const horarioTexto = document.getElementById("horarioTexto");
const editarHorario = document.getElementById("editarHorario");
const inputHorario = document.getElementById("inputHorario");
const botao = document.getElementById("jaTomei");
const mensagem = document.getElementById("mensagem");
const diasSpan = document.getElementById("dias");
const temaBtn = document.getElementById("temaBtn");

const mensagens = [
  "É o amor da minha vida",
  "Bebe água amor",
  "Meeeu tuti fruti",
  "Meeeu cuti cuti",
  "Sem pandinha por enquanto",
  "Fica comigo pra sempre?",
  "Te amo te amo te amo",
  "Eee mulhe da minha vida",
  "Te amo mais que tudo",
  "Você é perfeita",
  "Te quero o tempo todo",
  "Vive comigo pra sempre?"

];

function hojeString() {
  const hoje = new Date();
  return hoje.toISOString().split("T")[0];
}

function atualizarSaudacao() {
  const hora = new Date().getHours();

  if (hora < 12) {
    saudacao.textContent = "Bom dia ☀️";
  } else if (hora < 18) {
    saudacao.textContent = "Boa tarde 🌤️";
  } else {
    saudacao.textContent = "Boa noite 🌙";
  }
}

/* =========================
   MODO ESCURO PADRÃO
========================= */
function aplicarTemaPadrao() {
  const temaSalvo = localStorage.getItem("tema");

  if (!temaSalvo) {
    document.body.classList.add("dark");
    localStorage.setItem("tema", "dark");
  } else if (temaSalvo === "dark") {
    document.body.classList.add("dark");
  }
}

temaBtn.onclick = () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("tema", "dark");
  } else {
    localStorage.setItem("tema", "light");
  }
};

/* =========================
   HORÁRIO PADRÃO 08:00
========================= */
function carregarHorario() {
  const horario = localStorage.getItem("horario");

  if (!horario) {
    localStorage.setItem("horario", "08:00");
    horarioTexto.textContent = "08:00";
  } else {
    horarioTexto.textContent = horario;
  }
}

editarHorario.onclick = () => {
  inputHorario.classList.remove("hidden");
};

inputHorario.onchange = () => {
  const novo = inputHorario.value;
  localStorage.setItem("horario", novo);
  horarioTexto.textContent = novo;
  inputHorario.classList.add("hidden");
};

/* =========================
   CONTADOR
========================= */

function carregarDias() {
  const inicializado = localStorage.getItem("inicializado");

  // Se for a primeira vez abrindo
  if (!inicializado) {
    localStorage.setItem("dias", 8);
    localStorage.setItem("inicializado", "true");
  }

  const dias = localStorage.getItem("dias") || 0;
  diasSpan.textContent = dias;
}

function verificarSequencia() {
  const ultimoDia = localStorage.getItem("ultimoDia");
  const hoje = hojeString();

  if (!ultimoDia) return;

  const ontem = new Date();
  ontem.setDate(ontem.getDate() - 1);
  const ontemStr = ontem.toISOString().split("T")[0];

  if (ultimoDia !== ontemStr && ultimoDia !== hoje) {
    localStorage.setItem("dias", 0);
    diasSpan.textContent = 0;
  }
}

function atualizarEstadoBotao() {
  const ultimoDia = localStorage.getItem("ultimoDia");
  const hoje = hojeString();

  if (ultimoDia === hoje) {
    botao.classList.add("hidden");
    mensagem.textContent = "Já tomado hoje 💖";
  }
}

botao.onclick = () => {
  const hoje = hojeString();
  const ultimoDia = localStorage.getItem("ultimoDia");

  if (ultimoDia === hoje) return;

  let dias = parseInt(localStorage.getItem("dias") || 0);
  dias++;
  localStorage.setItem("dias", dias);
  diasSpan.textContent = dias;

  localStorage.setItem("ultimoDia", hoje);

  const msg = mensagens[Math.floor(Math.random() * mensagens.length)];
  mensagem.textContent = msg;

  botao.classList.add("hidden");
  document.body.classList.remove("alerta");
};

/* =========================
   ALERTA DE HORÁRIO
========================= */
function verificarHorario() {
  const agora = new Date();
  const [h, m] = horarioTexto.textContent.split(":");

  const horarioRemedio = new Date();
  horarioRemedio.setHours(h, m, 0);

  const ultimoDia = localStorage.getItem("ultimoDia");
  const hoje = hojeString();

  if (agora >= horarioRemedio && ultimoDia !== hoje) {
    document.body.classList.add("alerta");
  }
}

/* =========================
   INICIALIZAÇÃO
========================= */

aplicarTemaPadrao();
atualizarSaudacao();
carregarHorario();
verificarSequencia();
carregarDias();
atualizarEstadoBotao();
verificarHorario();

setInterval(verificarHorario, 60000);
