// Meine Bilder
let IMGS = [
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

// Elemente holen
let gallery = document.getElementById("gallery");
let viewer = document.getElementById("viewer");
let bigImg = document.getElementById("bigImg");
let btnPrev = document.getElementById("btnPrev");
let btnNext = document.getElementById("btnNext");
let btnClose = document.getElementById("btnClose");
let counter = document.getElementById("counter");

let index = 0;

// Bilder anzeigen (Thumbnails)
for (let i = 0; i < IMGS.length; i++) {
  let img = document.createElement("img");
  img.src = "./IMG/" + IMGS[i];
  img.alt = "Bild aus der Türkei";
  img.onclick = function () {
    index = i;
    openViewer();
  };
  gallery.appendChild(img);
}

// Großes Bild zeigen
function updateViewer() {
  bigImg.src = "./IMG/" + IMGS[index];
  bigImg.alt = "Bild aus der Türkei groß";
  counter.textContent = (index + 1) + " / " + IMGS.length;

  // Klicks auf das große Bild sollen NICHT das Schließen auslösen
  bigImg.onclick = function (e) {
    e.stopPropagation();
  };
}

// Dialog öffnen und schließen
function openViewer() {
  updateViewer();
  viewer.showModal();
  viewer.classList.add("opened");
}

function closeViewer() {
  viewer.close();
  viewer.classList.remove("opened");
}

// Buttons (Endlos-Schleife + kein Event-Bubbling nach oben)
btnPrev.onclick = function (e) {
  e.stopPropagation();      // verhindert, dass viewer.onclick mit ausgelöst wird
  index = index - 1;
  if (index < 0) {
    index = IMGS.length - 1;  // von Bild 1 zurück → letztes Bild
  }
  updateViewer();
};

btnNext.onclick = function (e) {
  e.stopPropagation();
  index = index + 1;
  if (index >= IMGS.length) {
    index = 0;               // von letztem Bild weiter → erstes Bild
  }
  updateViewer();
};

btnClose.onclick = function (e) {
  e.stopPropagation();
  closeViewer();
};

// Wenn man außerhalb klickt, schließen
viewer.onclick = function (e) {
  // Nur schließen, wenn wirklich auf den Dialog-Hintergrund geklickt wird
  if (e.target === viewer) {
    closeViewer();
  }
};

// Tastatursteuerung
document.onkeydown = function (e) {
  if (!viewer.open) return;
  if (e.key === "ArrowRight") btnNext.onclick(e);
  if (e.key === "ArrowLeft") btnPrev.onclick(e);
  if (e.key === "Escape") closeViewer();
};
