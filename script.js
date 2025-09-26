document.addEventListener('DOMContentLoaded', () => {
    const conversationDisplay = document.getElementById('conversation-display');
    const choicesArea = document.getElementById('choices-area');
    const restartButton = document.getElementById('restart-button');
    const messageBox = document.getElementById('message-box');
    const messageText = document.getElementById('message-text');
    const closeMessageBtn = document.getElementById('close-message-btn');

    const conversationNodes = {
        'start': {
            message: '🎬 Olá! Bem-vindo(a) ao CineChat Neon. Quer recomendações de filmes ou séries?',
            choices: [
                { text: 'Filmes', nextNodeId: 'movies_genre' },
                { text: 'Séries', nextNodeId: 'series_genre' }
            ]
        },
        'movies_genre': {
            message: 'Qual gênero de filme você prefere?',
            choices: [
                { text: 'Ação', nextNodeId: 'movies_action' },
                { text: 'Comédia', nextNodeId: 'movies_comedy' },
                { text: 'Romance', nextNodeId: 'movies_romance' },
                { text: 'Ficção', nextNodeId: 'movies_scifi' },
                { text: 'Voltar', nextNodeId: 'start' }
            ]
        },
        'series_genre': {
            message: 'Qual gênero de série você prefere?',
            choices: [
                { text: 'Drama', nextNodeId: 'series_drama' },
                { text: 'Terror', nextNodeId: 'series_horror' },
                { text: 'Comédia', nextNodeId: 'series_comedy' },
                { text: 'Fantasia', nextNodeId: 'series_fantasy' },
                { text: 'Voltar', nextNodeId: 'start' }
            ]
        },

        // --- Filmes ---
        'movies_action': {
            message: '🔥 *Monkey Man - Fúria Primitiva* (2024)\nResumo: Um ex-soldado enfrenta criminosos para proteger sua cidade.\nOnde assistir: [Prime Video](https://www.primevideo.com)',
            choices: [{ text: 'Voltar', nextNodeId: 'movies_genre' }]
        },
        'movies_comedy': {
            message: '😂 *Assassino por Acaso* (2024)\nResumo: Um professor se envolve em uma trama hilária após um incidente inesperado.\nOnde assistir: [Netflix](https://www.netflix.com)',
            choices: [{ text: 'Voltar', nextNodeId: 'movies_genre' }]
        },
        'movies_romance': {
            message: '❤️ *Me Apaixonei Online* (2023)\nResumo: Um romance moderno surge entre duas pessoas que se conhecem em um aplicativo.\nOnde assistir: [Amazon Prime](https://www.primevideo.com)',
            choices: [{ text: 'Voltar', nextNodeId: 'movies_genre' }]
        },
        'movies_scifi': {
            message: '🚀 *Galaxy Raiders* (2022)\nResumo: Uma equipe de exploradores espaciais enfrenta alienígenas em uma galáxia distante.\nOnde assistir: [Disney+](https://www.disneyplus.com)',
            choices: [{ text: 'Voltar', nextNodeId: 'movies_genre' }]
        },

        // --- Séries ---
        'series_drama': {
            message: '🎭 *A Queda da Casa de Usher* (2023)\nResumo: Segredos obscuros de uma família antiga começam a surgir.\nOnde assistir: [Netflix](https://www.netflix.com)',
            choices: [{ text: 'Voltar', nextNodeId: 'series_genre' }]
        },
        'series_horror': {
            message: '👻 *Neon Shadows* (2024)\nResumo: Um grupo de amigos enfrenta eventos sobrenaturais em uma cidade futurista.\nOnde assistir: [HBO Max](https://www.hbomax.com)',
            choices: [{ text: 'Voltar', nextNodeId: 'series_genre' }]
        },
        'series_comedy': {
            message: '😂 *Rindo na Madrugada* (2023)\nResumo: Uma série de sketches engraçados sobre a vida urbana moderna.\nOnde assistir: [Prime Video](https://www.primevideo.com)',
            choices: [{ text: 'Voltar', nextNodeId: 'series_genre' }]
        },
        'series_fantasy': {
            message: '🧙 *Lendas de Neon* (2024)\nResumo: Magia e aventura em um mundo onde o neon ilumina os reinos místicos.\nOnde assistir: [Disney+](https://www.disneyplus.com)',
            choices: [{ text: 'Voltar', nextNodeId: 'series_genre' }]
        }
    };

    let currentNodeId = 'start';

    function addMessageToDisplay(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', `${sender}-message`);

        // Suporte para links Markdown
        msgDiv.innerHTML = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

        conversationDisplay.appendChild(msgDiv);
        conversationDisplay.scrollTop = conversationDisplay.scrollHeight;
    }

    function displayNode(nodeId) {
        const node = conversationNodes[nodeId];
        if (!node) return;

        addMessageToDisplay(node.message, 'bot');
        choicesArea.innerHTML = '';

        node.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.classList.add('choice-button');
            btn.textContent = choice.text;
            btn.addEventListener('click', () => handleChoice(choice.text, choice.nextNodeId));
            choicesArea.appendChild(btn);
        });
    }

    function handleChoice(choiceText, nextNodeId) {
        addMessageToDisplay(choiceText, 'user');
        currentNodeId = nextNodeId;
        displayNode(currentNodeId);
    }

    function restartConversation() {
        conversationDisplay.innerHTML = '';
        addMessageToDisplay('Bem-vindo(a) ao CineChat Neon!', 'bot');
        currentNodeId = 'start';
        displayNode(currentNodeId);
    }

    restartButton.addEventListener('click', restartConversation);
    closeMessageBtn.addEventListener('click', () => (messageBox.style.display = 'none'));
    messageBox.addEventListener('click', e => { if (e.target === messageBox) messageBox.style.display = 'none'; });

    displayNode(currentNodeId);
});
// --- Theme Toggle ---
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    if(document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        themeToggle.textContent = '🌙';
    } else {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        themeToggle.textContent = '☀️';
    }
});

// Inicializa tema escuro por padrão
document.body.classList.add('dark');
