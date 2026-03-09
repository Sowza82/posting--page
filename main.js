const form = document.querySelector("#form-post");
const titulo = document.querySelector("#titulo");
const conteudo = document.querySelector("#conteudo");
const tituloRenderizar = document.querySelector("#renderizador-titulo");
const conteudoRenderizar = document.querySelector("#renderizador-conteudo");
const postsContainer = document.querySelector("#posts-container");

// Array para armazenar os posts
let posts = [];

// Preview ao digitar
function preview() {
  tituloRenderizar.textContent = titulo.value || "Título do post";
  conteudoRenderizar.textContent = conteudo.value || "O conteúdo aparecerá aqui conforme você digita.";
}

titulo.addEventListener("input", preview);
conteudo.addEventListener("input", preview);

// Publicar post
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    title: titulo.value,
    body: conteudo.value,
    userId: 1
  };

  // Cria card localmente
  const postCard = document.createElement("div");
  postCard.classList.add("post-card");
  postCard.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.body}</p>
    <a href="#" class="btn-card">Ler</a>
  `;
  postsContainer.prepend(postCard);
  posts.push(data);

  // Limpar form e preview
  form.reset();
  preview();

  // Feedback visual
  const msg = document.createElement("div");
  msg.textContent = "Post publicado com sucesso!";
  msg.style.position = "fixed";
  msg.style.bottom = "20px";
  msg.style.right = "20px";
  msg.style.backgroundColor = "#6a0dad";
  msg.style.color = "#fff";
  msg.style.padding = "10px 15px";
  msg.style.borderRadius = "6px";
  msg.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);

  // Enviar para API
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(data => console.log("Post enviado para API:", data));
});
