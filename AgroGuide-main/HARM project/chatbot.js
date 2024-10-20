function sendMessage() {
    const chatWindow = document.getElementById('chat-window');
    const userMessage = document.getElementById('userMessage').value;

    // Display user message
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'user-message';
    userMessageElement.innerText = userMessage;
    chatWindow.appendChild(userMessageElement);

    // Clear input
    document.getElementById('userMessage').value = '';

    // If user asks about disease, trigger image upload or analysis
    if (userMessage.toLowerCase().includes('disease')) {
        const form = document.getElementById('uploadForm');
        const formData = new FormData(form);

        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            const botMessageElement = document.createElement('div');
            botMessageElement.className = 'bot-message';
            botMessageElement.innerText = `Disease: ${data.disease}, Prevention: ${data.prevention}, Solution: ${data.solution}`;
            chatWindow.appendChild(botMessageElement);
            chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        const botMessageElement = document.createElement('div');
        botMessageElement.className = 'bot-message';
        botMessageElement.innerText = 'I can help you with plant diseases. Ask me anything!';
        chatWindow.appendChild(botMessageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom
    }
}
