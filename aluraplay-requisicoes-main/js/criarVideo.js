import { conectaAPI } from "./conectaAPI.js";

const formulario = document.querySelector('[data-formulario]');

async function criarVideo(evento){
    //se o evento não for explicitamente manuseado, previne a ação default padrão
    evento.preventDefault();

    //seleciona o input da página e o valor contido nele no instante
    const titulo = document.querySelector('[data-titulo]').value;
    const imagem = document.querySelector('[data-imagem]').value;
    const url = document.querySelector('[data-url]').value;
    //Math.random() = escolhe um número pseudo aleatório, Math.floor() = arredonda esse número para seu inteiro mais próximo
    const descricao = Math.floor(Math.random() * 10).toString();

    //testa o caso, se algum erro aparecer lança um alerta com evento
    try{
        //espera e cria um novo item de vídeo, redirecionando para uma nova página de confirmação
        await conectaAPI.criaVideos(titulo, descricao, url, imagem);
        window.location.href = "../pages/envio-concluido.html";
    } catch (e){
        alert(e);
    }
}

//cria novo vídeo após o envio do formulário de preenchimento
formulario.addEventListener('submit', evento => criarVideo(evento))
