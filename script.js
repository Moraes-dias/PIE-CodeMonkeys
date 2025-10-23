//codigo do gregory
//cria uma funcao para ele fazer scroll
function scrollPara(id) 
{
    //cria uma constante para pegar o id que sera pasado (parametro)
    const elemento = document.getElementById(id);
    //o scrollIntoView fara ele rolar ate a parte indicada
    //ele faz que o elemento faza um scroll suave e nao imediato por isso o smooth
    elemento.scrollIntoView({behavior: 'smooth'})
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