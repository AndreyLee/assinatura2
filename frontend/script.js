document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signature-form');
    const previewDiv = document.getElementById('previewAssinatura');
    const copyBtn = document.getElementById('copiarAssinaturaBtn');
    let imageUrl = '';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (!data.nome || !data.setor || !data.ramal) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch('/gerar-assinatura', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Erro do servidor: ${response.statusText}`);
            }

            const imageBlob = await response.blob();
            imageUrl = URL.createObjectURL(imageBlob);

            previewDiv.innerHTML = `<img src="${imageUrl}" alt="Assinatura Gerada">`;
            copyBtn.disabled = false;

        } catch (error) {
            console.error('Erro ao gerar assinatura:', error);
            alert('Falha ao gerar a assinatura. Verifique o console para mais detalhes.');
        }
    });

    copyBtn.addEventListener('click', () => {
        if (!imageUrl) return;

        const htmlToCopy = `<img src="${imageUrl}" alt="Assinatura Profissional">`;
        navigator.clipboard.writeText(htmlToCopy).then(() => {
            alert('Código HTML da assinatura copiado para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            alert('Falha ao copiar. Seu navegador pode não suportar esta ação.');
        });
    });
});
