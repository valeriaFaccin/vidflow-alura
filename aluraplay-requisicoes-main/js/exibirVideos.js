import { conectaAPI } from "./conectaAPI.js";

const lista = document.querySelector('[data-lista]');

export default function constroiCard(titulo, descricao, url, imagem){
    //cria novo elemento html, tag li
    const video = document.createElement('li');
    //adiciona uma classe css para o novo elemento
    video.className = 'videos__item';
    //define o conteúdo do novo elemento
    video.innerHTML = `
        <iframe width="100%" height="72%" src="${url}"
            title="${titulo}" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
        <div class="descricao-video">
            <img src="${imagem}" alt="logo canal alura">
            <h3>${titulo}</h3>
            <p>${descricao}</p>
        </div>
    `;

    return video;
}

async function listaVideos() {
    //testa o caso, se algum erro acontecer, lança a mensagem de erro
    try{
        const listaApi = await conectaAPI.listaVideos();
        //para cada elemento da listaApi, adiciona um novo nó filho, construido pela função constroiCard
        listaApi.forEach(elemento => lista.appendChild(constroiCard(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem)));
    } catch {
        lista.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar lista de vídeos</h2>`;
    }
}

listaVideos();
