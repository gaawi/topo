(function () {
  const D = window.DATA;
  const view = document.getElementById("view");
  const title = document.getElementById("view-title");
  const dateEl = document.getElementById("today-date");

  // Estado en memoria (el prototipo no persiste).
  const state = { filter: "all", done: {} };

  const fmtDate = (d) =>
    d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  dateEl.textContent = fmtDate(D.date);

  const projName = (id) => (D.projects.find((p) => p.id === id) || {}).name || id;
  const badge = (t) =>
    t === "reply"
      ? '<span class="badge reply">Responder</span>'
      : '<span class="badge new">Nuevo</span>';

  /* ---------- Vistas ---------- */

  function renderToday() {
    const list = D.emails.filter(
      (e) => state.filter === "all" || e.type === state.filter
    );
    const replies = D.emails.filter((e) => e.type === "reply").length;
    const news = D.emails.filter((e) => e.type === "new").length;

    view.innerHTML = `
      <div class="stats">
        <div class="stat orange"><div class="n">${D.emails.length}</div><div class="l">Sugeridos hoy</div></div>
        <div class="stat blue"><div class="n">${replies}</div><div class="l">Para responder</div></div>
        <div class="stat green"><div class="n">${news}</div><div class="l">Nuevos / seguimiento</div></div>
        <div class="stat"><div class="n">${D.projects.length}</div><div class="l">Proyectos activos</div></div>
      </div>

      <div class="section-head">
        <h2>Cola de revisión</h2>
        <div class="filters">
          ${chip("all", "Todos")}
          ${chip("reply", "Responder")}
          ${chip("new", "Nuevos")}
        </div>
      </div>

      <div class="cards">
        ${list.map(cardHTML).join("")}
      </div>
    `;

    view.querySelectorAll(".chip").forEach((c) =>
      c.addEventListener("click", () => {
        state.filter = c.dataset.f;
        renderToday();
      })
    );
    view.querySelectorAll(".card").forEach((el) =>
      el.addEventListener("click", (ev) => {
        if (ev.target.closest("[data-act]")) return;
        openModal(+el.dataset.id);
      })
    );
    view.querySelectorAll("[data-act]").forEach((b) =>
      b.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const id = +b.closest(".card").dataset.id;
        if (b.dataset.act === "approve") approve(id);
        else openModal(id);
      })
    );
  }

  const chip = (f, label) =>
    `<button class="chip ${state.filter === f ? "active" : ""}" data-f="${f}">${label}</button>`;

  function cardHTML(e) {
    const done = state.done[e.id];
    return `
      <article class="card ${done ? "done" : ""}" data-id="${e.id}">
        <div class="card-top">
          ${badge(e.type)}
          <span class="tag">${projName(e.project)}</span>
          <span class="prio">● Prioridad ${e.priority}</span>
        </div>
        <div class="card-to">${e.to} <span class="card-meta">· ${e.org} · ${e.email}</span></div>
        <div class="card-subject">${e.subject}</div>
        <div class="card-preview">${e.body.split("\n")[0]}</div>
        <div class="card-foot">
          <span class="card-meta">${done ? "✓ Borrador creado en Gmail" : "💡 " + e.why}</span>
          <div class="card-actions">
            <button class="btn ghost sm" data-act="edit">Editar</button>
            <button class="btn sm" data-act="approve">✓ Aprobar</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderProjects() {
    view.innerHTML = `
      <div class="proj-grid">
        ${D.projects
          .map((p) => {
            const pct = Math.round(((p.contacts - p.pending) / p.contacts) * 100);
            return `
            <div class="proj">
              <h3>${p.name}</h3>
              <p class="muted">${p.desc}</p>
              <div class="bar"><span style="width:${pct}%"></span></div>
              <div class="row"><span>${p.contacts} contactos</span><span>${p.pending} pendientes</span></div>
            </div>`;
          })
          .join("")}
      </div>
    `;
  }

  function renderContacts() {
    const dot = (s) => `<span class="dot ${s}"></span>`;
    const label = { warm: "Activo", cool: "Templado", cold: "Frío" };
    view.innerHTML = `
      <table class="table">
        <thead><tr><th>Contacto</th><th>Organización</th><th>Ciudad</th><th>Proyecto</th><th>Estado</th><th>Último contacto</th></tr></thead>
        <tbody>
          ${D.contacts
            .map(
              (c) => `<tr>
              <td><strong>${c.name}</strong></td>
              <td>${c.org}</td>
              <td>${c.city}</td>
              <td>${c.project}</td>
              <td>${dot(c.status)}${label[c.status]}</td>
              <td class="muted">${c.last}</td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
      <p class="muted" style="margin-top:14px">Mostrando ${D.contacts.length} de ~miles. Datos de ejemplo hasta conectar HubSpot + Gmail.</p>
    `;
  }

  function renderHow() {
    const steps = [
      ["Lee Gmail", "Detecta hilos de teatros sin responder o que tocan seguimiento."],
      ["Consulta HubSpot", "Por cada proyecto: a quién no contactas hace X días, deals abiertos, notas previas."],
      ["Claude prioriza y redacta", "Genera los 10 borradores (mitad respuestas, mitad nuevos), repartidos por proyecto."],
      ["Crea borradores en Gmail", "Y una tarea/nota en HubSpot por cada contacto. Nada se envía solo."],
      ["Tú revisas y envías", "Apruebas o editas aquí; al enviar queda registrado en el CRM."],
    ];
    view.innerHTML = `
      <div class="steps">
        ${steps
          .map(
            (s, i) =>
              `<div class="step"><div class="num">${i + 1}</div><div><strong>${s[0]}</strong><div class="muted">${s[1]}</div></div></div>`
          )
          .join("")}
      </div>
      <div class="note">
        <strong>Esto es un prototipo navegable.</strong> Los datos son de ejemplo. El siguiente paso (Fase 0)
        es construir una lista limpia y etiquetada de teatros a partir de tu historial de Gmail y tus Excel,
        porque hoy HubSpot está mezclado con spam y datos de una tienda. El plan completo está en
        <a href="https://github.com/gaawi/topo/blob/claude/theater-crm-email-automation-azvaD/docs/PLAN.md">docs/PLAN.md</a>.
      </div>
    `;
  }

  /* ---------- Modal ---------- */
  const modal = document.getElementById("modal");
  let current = null;

  function openModal(id) {
    const e = D.emails.find((x) => x.id === id);
    if (!e) return;
    current = e;
    const mtype = document.getElementById("m-type");
    mtype.className = "badge " + (e.type === "reply" ? "reply" : "new");
    mtype.textContent = e.type === "reply" ? "Responder" : "Nuevo";
    document.getElementById("m-project").textContent = projName(e.project);
    document.getElementById("m-to").value = `${e.to} <${e.email}>`;
    document.getElementById("m-subject").value = e.subject;
    document.getElementById("m-body").value = e.body;
    document.getElementById("m-why").textContent = "Por qué se sugiere: " + e.why;
    modal.hidden = false;
  }
  function closeModal() {
    modal.hidden = true;
    current = null;
  }

  document.getElementById("m-close").addEventListener("click", closeModal);
  document.getElementById("m-snooze").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.getElementById("m-approve").addEventListener("click", () => {
    if (current) approve(current.id);
    closeModal();
  });

  function approve(id) {
    state.done[id] = true;
    toast("✓ Borrador creado en Gmail (simulado)");
    if (title.textContent.includes("10")) renderToday();
  }

  /* ---------- Toast ---------- */
  let toastT;
  function toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastT);
    toastT = setTimeout(() => (t.hidden = true), 2200);
  }

  /* ---------- Navegación ---------- */
  const titles = {
    today: "Los 10 de hoy",
    projects: "Proyectos",
    contacts: "Contactos",
    how: "Cómo funciona",
  };
  const renderers = { today: renderToday, projects: renderProjects, contacts: renderContacts, how: renderHow };

  document.querySelectorAll(".nav-item").forEach((b) =>
    b.addEventListener("click", () => {
      document.querySelectorAll(".nav-item").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      const v = b.dataset.view;
      title.textContent = titles[v];
      renderers[v]();
    })
  );

  renderToday();
})();
