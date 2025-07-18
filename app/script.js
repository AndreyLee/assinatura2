document.getElementById('assinatura-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const copiarBtn = document.getElementById('copiar-btn');
    const assinaturaImg = document.getElementById('assinatura-img');

    assinaturaImg.src = ""; // Limpa a imagem anterior
    copiarBtn.disabled = true;

    try {
        const response = await fetch('/gerar_assinatura', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Falha ao gerar a assinatura.');
        }

        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);

        assinaturaImg.src = imageUrl;
        assinaturaImg.alt = "Assinatura gerada";
        copiarBtn.disabled = false;

    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao gerar a assinatura. Verifique o console para mais detalhes.');
    }
});

document.getElementById('copiar-btn').addEventListener('click', function() {
    const assinaturaImg = document.getElementById('assinatura-img');
    const imageUrl = assinaturaImg.src;

    if (!imageUrl) return;

    // Tenta copiar a imagem para a área de transferência
    try {
        // A API Clipboard para imagens ainda é experimental em alguns navegadores
        // Esta é uma abordagem mais robusta
        const htmlToCopy = `<img src="${imageUrl}" alt="Assinatura">`;
        navigator.clipboard.writeText(htmlToCopy).then(() => {
            alert('Código HTML da imagem copiado para a área de transferência!');
        }, () => {
            alert('Falha ao copiar o código HTML.');
        });
    } catch (err) {
        console.error('Erro ao copiar:', err);
        alert('Seu navegador pode não suportar esta funcionalidade.');
    }
});
