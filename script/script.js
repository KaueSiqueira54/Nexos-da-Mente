//Mensagem

document.addEventListener("DOMContentLoaded", function() {
  alert("Bem-vindo ao Paradoxo do Saber!\nSite em fase de Desenvolvimento.");
});

//Botôes

let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let box = document.querySelector(".box");
let boxx = document.querySelector(".boxx"); // A seção com o fundo

function updateBackground() {
  let items = document.querySelectorAll(".item");
  let centerItem = items[3]; // A imagem central no layout
  let bg = centerItem.getAttribute("data-bg");
  boxx.style.backgroundImage = bg;
}

// Botão "next"
next.addEventListener("click", function () {
  let items = document.querySelectorAll(".item");
  box.appendChild(items[0]);
  // Espera o append terminar e então atualiza o fundo
  requestAnimationFrame(() => {
    updateBackground();
  });
});

// Botão "prev"
prev.addEventListener("click", function () {
  let items = document.querySelectorAll(".item");
  box.prepend(items[items.length - 1]);
  // Espera o prepend terminar e então atualiza o fundo
  requestAnimationFrame(() => {
    updateBackground();
  });
});

// Fundo inicial
updateBackground();
