document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const previewArea = document.getElementById('signature-preview-area');

    generateBtn.addEventListener('click', () => {
        const nome = document.getElementById('nome').value;
        const setor = document.getElementById('setor').value;
        const ramal = document.getElementById('ramal').value;

        if (nome && setor && ramal) {
            const signatureHTML = `
                <div style="font-family: Arial, sans-serif; font-size: 12px; color: #333;">
                    <p style="margin: 0;"><strong>${nome}</strong></p>
                    <p style="margin: 0;">${setor}</p>
                    <p style="margin: 0;">Ramal: ${ramal}</p>
                </div>
            `;
            previewArea.innerHTML = signatureHTML;
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    copyBtn.addEventListener('click', () => {
        const signatureHTML = previewArea.innerHTML;
        if (signatureHTML) {
            navigator.clipboard.writeText(signatureHTML)
                .then(() => {
                    alert('Assinatura copiada para a área de transferência!');
                })
                .catch(err => {
                    console.error('Erro ao copiar a assinatura: ', err);
                    alert('Não foi possível copiar a assinatura.');
                });
        } else {
            alert('Gere uma assinatura primeiro.');
        }
    });
});
