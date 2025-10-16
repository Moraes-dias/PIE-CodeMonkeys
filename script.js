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