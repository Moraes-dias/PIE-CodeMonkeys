// ==========================================================
// PARTE 1: CÓDIGO DO SCROLL (SEU CÓDIGO ORIGINAL)
// Esta parte parece correta e não precisa de alterações.
// ==========================================================
//cria uma funcao para ele fazer scroll
function scrollPara(id) {
    //cria uma constante para pegar o id que sera pasado (parametro)
    const elemento = document.getElementById(id);
    //o scrollIntoView fara ele rolar ate a parte indicada
    //ele faz que o elemento faza um scroll suave e nao imediato por isso o smooth
    elemento.scrollIntoView({ behavior: 'smooth' });
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