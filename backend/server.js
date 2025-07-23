const express = require('express');
const sharp = require('sharp');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Endpoint para gerar a assinatura
app.post('/gerar-assinatura', async (req, res) => {
    const { nome, setor, ramal } = req.body;

    if (!nome || !setor || !ramal) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    try {
        const width = 500;
        const height = 120;
        const logoPath = path.join(__dirname, '..', 'assets', 'logo.png');

        // Cria o texto SVG
        const svgText = `
        <svg width="${width}" height="${height}">
            <text x="140" y="40" font-family="Arial, sans-serif" font-size="20" fill="#333">${nome}</text>
            <text x="140" y="70" font-family="Arial, sans-serif" font-size="14" fill="#555">Setor: ${setor}</text>
            <text x="140" y="95" font-family="Arial, sans-serif" font-size="14" fill="#555">Ramal: ${ramal}</text>
        </svg>
        `;

        const image = await sharp({
            create: {
                width: width,
                height: height,
                channels: 4,
                background: { r: 255, g: 255, b: 255, alpha: 1 }
            }
        })
        .composite([
            { input: logoPath, top: 20, left: 20 },
            { input: Buffer.from(svgText), top: 0, left: 0 }
        ])
        .jpeg()
        .toBuffer();

        res.set('Content-Type', 'image/jpeg');
        res.send(image);

    } catch (error) {
        console.error('Erro ao gerar a imagem:', error);
        res.status(500).send('Erro interno ao gerar a assinatura.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
