document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signature-form');
    const previewDiv = document.getElementById('preview');
    const copyBtn = document.getElementById('copy-btn');
    let generatedImageUrl = '';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const setor = document.getElementById('setor').value;
        const ramal = document.getElementById('ramal').value;

        if (!nome || !setor || !ramal) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const data = { nome, setor, ramal };

        try {
            const response = await fetch('/gerar-assinatura', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Falha ao gerar a imagem.');

            const imageBlob = await response.blob();
            generatedImageUrl = URL.createObjectURL(imageBlob);

            previewDiv.innerHTML = `<img src="${generatedImageUrl}" alt="Assinatura Gerada">`;
            copyBtn.disabled = false;

        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao gerar a assinatura.');
        }
    });

    copyBtn.addEventListener('click', () => {
        if (generatedImageUrl) {
            const htmlToCopy = `<img src="${generatedImageUrl}" alt="Assinatura">`;
            navigator.clipboard.writeText(htmlToCopy)
                .then(() => alert('Código HTML da assinatura copiado!'))
                .catch(() => alert('Falha ao copiar.'));
        }
    });
});
