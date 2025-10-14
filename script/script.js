//Mensagem

// document.addEventListener("DOMContentLoaded", function () {
//   alert("Bem-vindo ao Paradoxo do Saber!\nSite em fase de Desenvolvimento.");
// });

// Teste

const links = document.querySelectorAll(".link");

links.forEach((link) => {
  link.addEventListener("click", function () {
    links.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
  });
});

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

//Botôes

let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let box = document.querySelector(".box");
// let boxx = document.querySelector(".boxx"); // A seção com o fundo

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

//Linkando as páginas

document.querySelectorAll(".timeline-content").forEach((element) => {
  element.addEventListener("click", () => {
    window.open("index2.html", "_blank");
  });
});

//Script imagens

// Detectar clique nas imagens e mover até o centro
document.querySelectorAll(".item").forEach((item, index) => {
  item.addEventListener("click", () => {
    const currentItems = Array.from(document.querySelectorAll(".item"));
    const clickedIndex = currentItems.indexOf(item);

    // Se o item já estiver no centro (posição 3), apenas ignore
    if (clickedIndex === 3) return;

    // Calcular quantas vezes devemos rotacionar
    let rotations = clickedIndex - 3;

    if (rotations > 0) {
      // Avançar (next)
      for (let i = 0; i < rotations; i++) {
        box.appendChild(box.firstElementChild);
      }
    } else {
      // Retroceder (prev)
      for (let i = 0; i < Math.abs(rotations); i++) {
        box.prepend(box.lastElementChild);
      }
    }

    // Atualizar fundo após movimentação
    requestAnimationFrame(() => {
      updateBackground();
    });
  });
});

let autoplayInterval = 3000; // tempo normal entre trocas (3s)
let autoplayPauseAfterClick = 15000; // tempo de pausa após interação (15s)
let autoplay;
let isHovering = false; // flag para hover sobre imagem
let hoverPaused = false;

// Atualiza o fundo
function updateBackground() {
  let items = document.querySelectorAll(".item");
  let centerItem = items[3];
  let bg = centerItem.getAttribute("data-bg");
  // document.querySelector(".boxx").style.backgroundImage = bg;
}

// Inicia o autoplay
function startAutoplay() {
  autoplay = setInterval(() => {
    if (!isHovering) {
      let items = document.querySelectorAll(".item");
      box.appendChild(items[0]);
      requestAnimationFrame(updateBackground);
    }
  }, autoplayInterval);
}

// Para o autoplay
function stopAutoplay() {
  clearInterval(autoplay);
}

// Inicia ao carregar
startAutoplay();

// Pausa ao passar o mouse sobre QUALQUER item do carrossel
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    isHovering = true;
    hoverPaused = true;
    stopAutoplay();
  });

  item.addEventListener("mouseleave", () => {
    isHovering = false;
    if (hoverPaused) {
      startAutoplay();
      hoverPaused = false;
    }
  });
});

// Função que pausa e reinicia após clique
function resetAutoplayWithDelay() {
  stopAutoplay();
  setTimeout(() => {
    if (!isHovering) {
      startAutoplay();
    } else {
      hoverPaused = true;
    }
  }, autoplayPauseAfterClick);
}

// Botões
next.addEventListener("click", () => {
  let items = document.querySelectorAll(".item");
  box.appendChild(items[0]);
  requestAnimationFrame(updateBackground);
  resetAutoplayWithDelay();
});

prev.addEventListener("click", () => {
  let items = document.querySelectorAll(".item");
  box.prepend(items[items.length - 1]);
  requestAnimationFrame(updateBackground);
  resetAutoplayWithDelay();
});

// Clique nas imagens
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", () => {
    const currentItems = Array.from(document.querySelectorAll(".item"));
    const clickedIndex = currentItems.indexOf(item);

    if (clickedIndex === 3) return;

    let rotations = clickedIndex - 3;

    if (rotations > 0) {
      for (let i = 0; i < rotations; i++) {
        box.appendChild(box.firstElementChild);
      }
    } else {
      for (let i = 0; i < Math.abs(rotations); i++) {
        box.prepend(box.lastElementChild);
      }
    }

    requestAnimationFrame(updateBackground);
    resetAutoplayWithDelay();
  });
});
