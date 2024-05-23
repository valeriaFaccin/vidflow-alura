async function listaVideos(){
    //conexão com a base de dados json
    const conexao = await fetch("http://localhost:3000/videos");
    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

async function criaVideos(titulo, descricao, url, imagem){
    const conexao = await fetch("http://localhost:3000/videos", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        //convertendo objeto em string
        body: JSON.stringify({
            titulo: titulo,
            descricao: `${descricao} mil visualizações`,
            url: url,
            imagem: imagem
        })
    });

    //se a conexão não estiver ok, lança um erro
    if(!conexao.ok){
        throw new Error('Não foi possível adicionar novo vídeo');
    }
    
    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

async function buscaVideo(termoDaBusca){
    const conexao = await fetch(`http://localhost:3000/videos?q=${termoDaBusca}`);
    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

export const conectaAPI = {
    listaVideos,
    criaVideos,
    buscaVideo
};
