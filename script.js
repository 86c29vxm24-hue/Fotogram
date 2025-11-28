// Meine Bilder
const IMGS = [
  "building-2397605_640.jpg",
  "cami-4793225_640.jpg",
  "cappadocia-765498_640.jpg",
  "island-7079425_640.jpg",
  "lake-6238866_640.jpg",
  "lamps-4196132_640.jpg",
  "light-house-8627430_640.jpg",
  "oludeniz-3595030_640.jpg",
  "pamukkale-14998_640.jpg",
  "sanliurfa-2793508_640.jpg",
  "sumela-5035247_640.jpg",
  "turkiye-7383043_640.jpg"
];

// Manuelle Beschreibungen (gleiche Reihenfolge!)
const CAPTIONS = [
  "Mevlana/Konya",
  "Mosque/Istanbul",
  "Balloons/Cappadocia",
  "Beach/Antalya",
  "Lake/Bolu",
  "Lamps/Istanbul",
  "Lighthouse/Finike",
  "Kelebekler Vadisi/Fethiye",
  "Travertine Terraces/Pamukkale",
  "Pool of Sacred Fish/Sanliurfa",
  "Sumela/Trabzon",
  "Streets of Istanbul/Istanbul"
];

// Elemente holen
const gallery = document.getElementById("gallery"); // <ul>
const viewer = document.getElementById("viewer");
const bigImg = document.getElementById("bigImg");
const viewerCaption = document.getElementById("viewerCaption");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const btnClose = document.getElementById("btnClose");
const counter = document.getElementById("counter");

let index = 0;

// Thumbnails als Liste anzeigen
for (let i = 0; i < IMGS.length; i++) {
  // <li>
  const li = document.createElement("li");
  li.className = "gallery-item";

  // <article>
  const article = document.createElement("article");
  article.className = "photo-card";

  // <figure>
  const figure = document.createElement("figure");

  // <img>
  const img = document.createElement("img");
  img.src = "./IMG/" + IMGS[i];
  img.alt = CAPTIONS[i]; // Alt-Text = deine Beschreibung
  img.onclick = function () {
    index = i;
    openViewer();
  };

  // <figcaption>
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = CAPTIONS[i];

  // zusammenbauen
  figure.appendChild(img);
  figure.appendChild(figcaption);
  article.appendChild(figure);
  li.appendChild(article);
  gallery.appendChild(li);
}

// Großes Bild im Dialog aktualisieren
function updateViewer() {
  bigImg.src = "./IMG/" + IMGS[index];
  bigImg.alt = CAPTIONS[index];
  counter.textContent = (index + 1) + " / " + IMGS.length;
  viewerCaption.textContent = CAPTIONS[index];
}

// Dialog öffnen / schließen
function openViewer() {
  updateViewer();
  viewer.showModal();
  viewer.classList.add("opened");
}

function closeViewer() {
  viewer.close();
  viewer.classList.remove("opened");
}

// Links-Button (Endlos-Schleife)
btnPrev.onclick = function () {
  index = index - 1;
  if (index < 0) {
    index = IMGS.length - 1;
  }
  updateViewer();
};

// Rechts-Button (Endlos-Schleife)
btnNext.onclick = function () {
  index = index + 1;
  if (index >= IMGS.length) {
    index = 0;
  }
  updateViewer();
};

// X-Button
btnClose.onclick = function () {
  closeViewer();
};

// Tastatursteuerung
document.onkeydown = function (e) {
  if (!viewer.open) return;
  if (e.key === "ArrowRight") btnNext.onclick();
  if (e.key === "ArrowLeft") btnPrev.onclick();
  if (e.key === "Escape") closeViewer();
};
