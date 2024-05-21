//chamada da ul do html que conterá cada vídeo
const videosContainer = document.querySelector('.videos__container');

//async = realiza uma promise por debaixo dos panos, mas de forma mais legível
async function mostrarBuscarVideos(){
    //exectuta o código até encontrar algum erro (catch error)
    try{
        //await = pausa a execução de async até que a promise seja concluída
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json();
        
        videos.forEach((video) => {
            //joga um novo erro caso a validação seja falha
            if(video.categoria == ""){
                throw new Error("Vídeo não possui categoria");
            }
            //adiciona a lista de vídeos para sua tag ul container
            videosContainer.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p>
                </div>
            </li>
            `;
        })
        //caso algum erro seja encontrado, executa esse código
    } catch(error) {
        videosContainer.innerHTML = `
            <p>Houve um erro ao carregar os vídeos: ${error}</p>
        `;
    }
}

mostrarBuscarVideos();

//habilitando barra de pesquisa

//seleciona o elemento html que apresenta o input da barra
const pesquisa = document.querySelector(".pesquisar__input");
//chama a função filtrarPesquisa para cada evento input = campo pesquisa ser preenchido
pesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
    //seleciona os elementos dos vídeos (criados nas linhas 12-22)
    const videos = document.querySelectorAll('.videos__item');
    
    //para cada elemento vídeo
    videos.forEach((video) => {
        //seleciona o título individual de cada vídeo, e o transforma para letras minúsculas
        const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
    
        //caso o input da pesquisa (também transformado em minúsculas para comparação) for igual a titulo, apresenta todos os vídeos relacionados a  pesquisa, caso contrário apresenta toda a lista de vídeos
        video.style.display = pesquisa.value.toLowerCase() ? titulo.includes(pesquisa.value.toLowerCase()) ? 'block' : 'none' : 'block';
    });
}

//habilitando menu de categorias

//seleciona todos os elementos do menu
const categoriaBtn = document.querySelectorAll('.superior__item');

//para cada elemento, pega seu atributo nome e chama a função filtrarPorCategoria no evento de 'click'
categoriaBtn.forEach((button) => {
    let nomeCategoria = button.getAttribute('name');
    button.addEventListener('click', () => filtrarPorCategoria(nomeCategoria));
});

function filtrarPorCategoria(filtro){
    //seleciona toda a lista de elementos de vídeos (criada nas linhas 12-22)
    const videos = document.querySelectorAll(".videos__item");
    //para cada um desses elementos: 
    videos.forEach((video) => {
        //seleciona sua categoria => valor.categoria da tag p hidden, em letras minúsculas para comparação
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();

        //caso a categoria de cada elemento de video for igual a categoria do botão do menu de categorias, mostra apenas os vídeos relacionados aquela categoria ou mostra a tela incial com todos os vídeos
        video.style.display = filtro.toLowerCase() ? categoria.includes(filtro.toLowerCase()) ? 'block' : 'none' : 'block';
    });
}
