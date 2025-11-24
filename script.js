// Meine Bilder
let bilder = [
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

// Bilder anzeigen
for (let i = 0; i < bilder.length; i++) {
  let img = document.createElement("img");
  img.src = "./IMG/" + bilder[i];
  img.onclick = function() {
    index = i;
    openViewer();
  };
  gallery.appendChild(img);
}

// Großes Bild zeigen
function updateViewer() {
  bigImg.src = "./IMG/" + bilder[index];
  counter.textContent = (index + 1) + " / " + bilder.length;
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

// Buttons
btnPrev.onclick = function() {
  index = index - 1;
  if (index < 0) {
    index = bilder.length - 1;
  }
  updateViewer();
};

btnNext.onclick = function() {
  index = index + 1;
  if (index >= bilder.length) {
    index = 0;
  }
  updateViewer();
};

btnClose.onclick = function() {
  closeViewer();
};

// Wenn man außerhalb klickt, schließen
viewer.onclick = function(e) {
  let box = viewer.getBoundingClientRect();
  if (
    e.clientX < box.left ||
    e.clientX > box.right ||
    e.clientY < box.top ||
    e.clientY > box.bottom
  ) {
    closeViewer();
  }
};

// Tastatursteuerung
document.onkeydown = function(e) {
  if (!viewer.open) return;
  if (e.key === "ArrowRight") btnNext.onclick();
  if (e.key === "ArrowLeft") btnPrev.onclick();
  if (e.key === "Escape") closeViewer();
};
