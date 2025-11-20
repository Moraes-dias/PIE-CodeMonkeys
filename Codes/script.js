
//cria uma funcao para ele fazer scroll
    let scrollAnimacao = null;
//cria uma funcao para ele fazer scroll
function scrollPara(id, duracao = 800) {
    //cria uma constante para identificar os elementos
    const elemento = document.getElementById(id);
    //testa se o elemento se nao for invalido
    if (!elemento) return;

    // Cancela animação anterior, se houver
    if (scrollAnimacao) cancelAnimationFrame(scrollAnimacao);

    //coloca o inicio no topo da pagina
    const inicio = window.scrollY;
    //ele mede a distancia que ele vai percorrer do inicio ate o destino
    const destino = elemento.getBoundingClientRect().top + window.scrollY;
    //ele faz o calculo do destino e do inicio 
    const distancia = destino - inicio;
    //inicia o tempo em null
    let inicioTempo = null;

    // criar uma funcao para determinar o tempo que vai demorar 
    function animarScroll(tempoAtual) {
        //Se ainda não definimos o início da animação, guardamos o tempo atual como referência inicial.
        if (!inicioTempo) inicioTempo = tempoAtual;
        //Calcula quanto tempo já passou desde o começo da animação.
        const tempoDecorrido = tempoAtual - inicioTempo;
        //tempoDecorrido / duracao → percentual de progresso da animação (0 = início, 1 = fim).
        //Math.min(..., 1) → garante que a proporção não passe de 1, evitando ultrapassar o destino.
        const proporcao = Math.min(tempoDecorrido / duracao, 1);
        /*Move a página verticalmente (window.scrollTo) para a posição atual da animação:
        inicio + distancia * proporcao → cálculo da posição interpolada entre início e destino.
        Isso cria a movimentação suave uniforme, sem depender da distância. */
        window.scrollTo(0, inicio + distancia * proporcao);
        // quando foir atindido a distancia ele vai parar
        if (tempoDecorrido < duracao) {
            requestAnimationFrame(animarScroll);
        }
    }
    //Inicia a animação chamando a função no próximo frame do navegador.
    requestAnimationFrame(animarScroll);
}

//cria uma const que tera todos os id para conseguir mapear
//dentro do conteudo tem as chaves e o value com o nome de cada
const mapScroll = {
    inicioScroll: 'inicio',
    produtoScroll: 'produtos',
    materiasScroll: 'materiais',
    contatoScroll: 'contato',

    botonDireita: 'produtos'
};

//ele vai pegar todas as chaves de mapScroll e percorrer elas para achar a que esta sendo usada
Object.keys(mapScroll).forEach(btnId => {
    //cria uma const para usar de referencia dos botoes usando a variavel temporal criada
    const botoao = document.getElementById(btnId);
    //ele vai pegar o elemento achado e colocando numa outra const
    const secaoId = mapScroll[btnId];
    //e aqui pega os id do botoes e faz que quando for clicado um deles ele vai scrollar
    botoao.addEventListener('click', () => scrollPara(secaoId));
});


// ==========================================================
// PARTE 2: CÓDIGO DO MODAL (VERSÃO CORRIGIDA)
// ==========================================================
// Espera o documento HTML ser completamente carregado para rodar o script
document.addEventListener('DOMContentLoaded', () => {

    // 1. Selecionar todos os elementos que vamos usar
    // CORRIGIDO: Renomeei a variável para corresponder ao que ela realmente seleciona.
    const productImageWrappers = document.querySelectorAll('.product-card__image-wrapper');
    const modalOverlay = document.getElementById('productModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Elementos dentro do modal que vamos atualizar
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    // 2. Funções para controlar o modal (sem alterações aqui, estavam perfeitas)
    function openModal(card) {
        const title = card.dataset.title;
        const description = card.dataset.description;
        const imageUrl = card.dataset.image;

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalImage.src = imageUrl;
        modalImage.alt = title;

        modalOverlay.classList.add('visible');
    }

    function closeModal() {
        modalOverlay.classList.remove('visible');
    }

    // 3. Adicionar os "escutadores de eventos" (Event Listeners)

    // CORRIGIDO: Usando a variável correta 'productImageWrappers' no loop.
    productImageWrappers.forEach(imageWrapper => {
        imageWrapper.addEventListener('click', () => {
            const card = imageWrapper.closest('.product-card');
            openModal(card);
        });
    });

    // CORRIGIDO: MOVI ESTES DOIS EVENTOS PARA DENTRO DO DOMContentLoaded.
    // Agora eles podem "enxergar" as variáveis 'closeModalBtn', 'modalOverlay' e a função 'closeModal'.
    
    // Evento de clique no botão de fechar
    closeModalBtn.addEventListener('click', closeModal);

    // Evento para fechar o modal se o usuário clicar no fundo escuro
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

}); // <-- FIM DO DOMContentLoaded. Todo o código do modal está aqui dentro.

// ==========================================================
// PARTE 3: CÓDIGO - HOVER DAS IMAGENS (Com Fade e sem reverter)
// ==========================================================

const imagemPrincipal = document.querySelector('.imagensDasMadeiras');
const todosBotoes = document.querySelectorAll('.modeloMadeira, .acabamento');

// Verifica se a imagem principal existe na página
if (imagemPrincipal) {

    // A variável 'imagemPadrao' não é mais necessária,
    // pois a imagem não vai mais reverter.

    // Mapa de imagens com o caminho CORRETO (../)
    const mapaImagens = {
        'carvalho': '../Img/carvalho.jpg',
        'cedro': '../Img/cedro.png',
        'pinus': '../Img/pinus.jpg',
        'mogno': '../Img/mogno.jpg',
        'natural': '../Img/natural.avif',
        'vernizfosco': '../Img/vernizfosco.avif',
        'vernizbrilhante': '../Img/vernizbrilhante.avif',
        'encerado': '../Img/encerado.avif',
        'laca': '../Img/lacabranca.avif',
        'tingimento': '../Img/tingimentoescuro.avif'
    };

    // Variável para guardar qual imagem está selecionada
    let imagemAtual = imagemPrincipal.src;

    todosBotoes.forEach(botao => {
        
        // Evento para QUANDO O MOUSE ENTRA no botão
        botao.addEventListener('mouseenter', () => {
            const idDoBotao = botao.id;
            const novoSrc = mapaImagens[idDoBotao];

            // Só executa a troca se a imagem for DIFERENTE da que já está lá
            if (novoSrc && imagemAtual !== novoSrc) {
                
                // Guarda a nova imagem como "imagem atual"
                imagemAtual = novoSrc;

                // 1. Inicia o fade-out
                imagemPrincipal.style.opacity = '0';

                // 2. Espera a animação de fade-out terminar (300ms)
                setTimeout(() => {
                    // 3. Troca a imagem (enquanto ela está invisível)
                    imagemPrincipal.src = novoSrc;
                    
                    // 4. Inicia o fade-in
                    imagemPrincipal.style.opacity = '1';
                }, 300); // Este tempo (300ms) DEVE ser igual ao do CSS
            }
        });

        // O evento 'mouseleave' FOI REMOVIDO.
    });
}