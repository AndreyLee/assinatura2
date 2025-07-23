from flask import Flask, request, send_file, render_template
from PIL import Image, ImageDraw, ImageFont
import io
import os

app = Flask(__name__, template_folder='.', static_folder='.')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/gerar-assinatura', methods=['POST'])
def gerar_assinatura():
    data = request.get_json()
    nome = data.get('nome')
    setor = data.get('setor')
    ramal = data.get('ramal')

    if not all([nome, setor, ramal]):
        return "Todos os campos são obrigatórios.", 400

    try:
        width, height = 500, 120
        img = Image.new('RGB', (width, height), color='white')
        draw = ImageDraw.Draw(img)

        # Carregar logo
        logo_path = 'logo.png'
        if os.path.exists(logo_path):
            logo = Image.open(logo_path).resize((100, 100))
            img.paste(logo, (10, 10))

        # Carregar fonte (tenta encontrar uma fonte comum)
        try:
            font_bold = ImageFont.truetype("arialbd.ttf", 20)
            font_regular = ImageFont.truetype("arial.ttf", 15)
        except IOError:
            font_bold = ImageFont.load_default()
            font_regular = ImageFont.load_default()

        # Desenhar texto
        draw.text((130, 30), nome, font=font_bold, fill='black')
        draw.text((130, 60), f"Setor: {setor}", font=font_regular, fill='black')
        draw.text((130, 85), f"Ramal: {ramal}", font=font_regular, fill='black')

        # Salvar imagem em buffer
        buf = io.BytesIO()
        img.save(buf, format='JPEG')
        buf.seek(0)

        return send_file(buf, mimetype='image/jpeg')

    except Exception as e:
        print(f"Erro ao gerar imagem: {e}")
        return "Erro interno ao gerar a assinatura.", 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
