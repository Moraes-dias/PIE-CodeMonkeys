//codigo do gregory
//cria uma funcao para ele fazer scroll e coloca a duraçao do tempo que demorara para descer

    let scrollAnimacao = null;
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
    contatoScroll: 'contato'
  };

  //ele vai pegar todas as chaves de mapScroll e percorrer elas para achar a que esta sendo usada
  Object.keys(mapScroll).forEach(btnId => 
    {
        //cria uma const para usar de referencia dos botoes usando a variavel temporal criada
        const botoao = document.getElementById(btnId);
        //ele vai pegar o elemento achado e colocando numa outra const
        const secaoId = mapScroll[btnId];
        //e aqui pega os id do botoes e faz que quando for clicado um deles ele vai scrollar
        botoao.addEventListener('click', () => scrollPara(secaoId));
    });

// Espera o documento HTML ser completamente carregado para rodar o script
document.addEventListener('DOMContentLoaded', () => {

    // 1. Selecionar todos os elementos que vamos usar
    const productCards = document.querySelectorAll('.product-card');
    const modalOverlay = document.getElementById('productModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    // Elementos dentro do modal que vamos atualizar
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    // 2. Funções para controlar o modal
    function openModal(card) {
        // Pegar os dados do card que foi clicado usando o .dataset
        const title = card.dataset.title;
        const description = card.dataset.description;
        const imageUrl = card.dataset.image;

        // Atualizar o conteúdo do modal com os dados do card
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalImage.src = imageUrl;
        modalImage.alt = title; // Boa prática de acessibilidade

        // Mostrar o modal adicionando a classe .visible
        modalOverlay.classList.add('visible');
    }

    function closeModal() {
        modalOverlay.classList.remove('visible');
    }

    // 3. Adicionar os "escutadores de eventos" (Event Listeners)

    // Para cada card de produto, adicione um evento de clique
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            openModal(card);
        });
    });

    // Evento de clique no botão de fechar
    closeModalBtn.addEventListener('click', closeModal);

    // Evento para fechar o modal se o usuário clicar no fundo escuro
    modalOverlay.addEventListener('click', (event) => {
        // Se o local clicado (event.target) for o próprio fundo...
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

});