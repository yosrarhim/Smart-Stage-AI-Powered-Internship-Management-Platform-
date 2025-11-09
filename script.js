function afficherDashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || {
    nom: "Yassine", service: "Qualité", encadrant: "Mme Bensalem"
  };

  const dateDebut = new Date("2025-06-01");
  const dateAuj = new Date();
  const diff = Math.floor((dateAuj - dateDebut) / (1000 * 60 * 60 * 24)) + 1;

  const dashboard = `
    <h2>Dashboard</h2>
    <p><strong>Nom :</strong> ${user.nom}</p>
    <p><strong>Service :</strong> ${user.service}</p>
    <p><strong>Encadrant :</strong> ${user.encadrant}</p>
    <p><strong>Jour de stage :</strong> ${diff}</p>
  `;
  document.getElementById("dashboard").innerHTML = dashboard;
}

function afficherTaches() {
  const taches = JSON.parse(localStorage.getItem("taches")) || [];

  let html = `<h2>Tâches</h2>
    <input id="newTask" placeholder="Nouvelle tâche..." />
    <button onclick="ajouterTache()">Ajouter</button>
    <ul>`;

  taches.forEach((t, i) => {
    html += `<li>
      <input type="checkbox" ${t.fait ? "checked" : ""} onclick="toggleTache(${i})"/>
      ${t.texte}
      <button onclick="supprimerTache(${i})">🗑️</button>
    </li>`;
  });

  html += `</ul>`;
  document.getElementById("taches").innerHTML = html;
}

function ajouterTache() {
  const texte = document.getElementById("newTask").value;
  if (!texte) return;
  const taches = JSON.parse(localStorage.getItem("taches")) || [];
  taches.push({ texte, fait: false });
  localStorage.setItem("taches", JSON.stringify(taches));
  afficherTaches();
}

function toggleTache(index) {
  const taches = JSON.parse(localStorage.getItem("taches"));
  taches[index].fait = !taches[index].fait;
  localStorage.setItem("taches", JSON.stringify(taches));
  afficherTaches();
}

function supprimerTache(index) {
  const taches = JSON.parse(localStorage.getItem("taches"));
  taches.splice(index, 1);
  localStorage.setItem("taches", JSON.stringify(taches));
  afficherTaches();
}

function afficherJournal() {
  const aujourdHui = new Date().toISOString().slice(0, 10);
  const journal = JSON.parse(localStorage.getItem("journal")) || {};
  const contenu = journal[aujourdHui] || "";

  const html = `
    <h2>Journal de bord – ${aujourdHui}</h2>
    <textarea id="journalTexte">${contenu}</textarea>
    <button onclick="sauvegarderJournal()">Sauvegarder</button>
  `;
  document.getElementById("journal").innerHTML = html;
}

function sauvegarderJournal() {
  const aujourdHui = new Date().toISOString().slice(0, 10);
  const texte = document.getElementById("journalTexte").value;
  const journal = JSON.parse(localStorage.getItem("journal")) || {};
  journal[aujourdHui] = texte;
  localStorage.setItem("journal", JSON.stringify(journal));
  afficherJournal();
}

function afficherRapport() {
  const journal = JSON.parse(localStorage.getItem("journal")) || {};
  const ajd = new Date();
  const lundi = new Date(ajd.setDate(ajd.getDate() - ajd.getDay() + 1));
  const dimanche = new Date(lundi);
  dimanche.setDate(lundi.getDate() + 6);

  let texte = "";
  for (let d = new Date(lundi); d <= dimanche; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10);
    if (journal[dateStr]) {
      texte += `${dateStr} :\n${journal[dateStr]}\n\n`;
    }
  }

  const html = `
    <h2>Rapport Hebdomadaire</h2>
    <textarea rows="10">${texte}</textarea>
    <p>Copiez ce contenu dans votre rapport final.</p>
  `;
  document.getElementById("rapport").innerHTML = html;
}

function afficherPowerBI() {
  const html = `
    <h2>Indicateurs de performance</h2>
    <iframe width="100%" height="400" 
      src="https://app.powerbi.com/view?r=VOTRE-LIEN-PUBLIC"
      frameborder="0" allowfullscreen></iframe>
  `;
  document.getElementById("powerbi").innerHTML = html;
}

window.onload = () => {
  afficherDashboard();
  afficherTaches();
  afficherJournal();
  afficherRapport();
  afficherPowerBI();
};