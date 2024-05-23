import { conectaAPI } from "./conectaAPI.js";
import constroiCard from "./exibirVideos.js";

//em resumo, apaga todos os elementos da página e readiciona apenas aqueles da categoria da busca
async function buscarVideo(evento) {
    //previne o default
    evento.preventDefault();

    //armazena o valor presente no input pesquisa
    const pesquisa = document.querySelector('[data-pesquisa]').value;
    const busca = await conectaAPI.buscaVideo(pesquisa);

    const lista = document.querySelector('[data-lista]');

    //enquanto lista possuir um primeiro filho, remover esse filho
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }

    //cria um novo elemento na página a partir da requisição da busca
    busca.foreach(elemento => lista.appendChild(constroiCard(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem)));

    //se a busca não retornar nenhum elemento, lança uma mensagem de erro
    if(busca.length == 0){
        lista.innerHTML = `<h2 class="mensagem__titulo">Não existem vídeos com esse termo</h2>`;
    }
}

const botaoPesquisa = document.querySelector('[data-botao-pesquisa]');

//realiza a pesquisa quando o botão for clicado
botaoPesquisa.addEventListener('click', evento => buscarVideo(evento));
