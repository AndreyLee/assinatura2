from flask import Flask, request, send_file
from PIL import Image, ImageDraw, ImageFont
import io

app = Flask(__name__)

@app.route('/gerar_assinatura', methods=['POST'])
def gerar_assinatura():
    # Obter dados do formulário
    nome = request.form['nome']
    setor = request.form['setor']
    ramal = request.form['ramal']

    # Criar imagem
    largura = 400
    altura = 120
    img = Image.new('RGB', (largura, altura), color = (255, 255, 255))

    # Adicionar logo
    try:
        logo = Image.open("logo.png").resize((80, 80))
        img.paste(logo, (20, 20))
    except FileNotFoundError:
        pass  # Se a logo não for encontrada, continua sem ela

    # Adicionar texto
    draw = ImageDraw.Draw(img)
    try:
        fonte_nome = ImageFont.truetype("arial.ttf", 20)
        fonte_info = ImageFont.truetype("arial.ttf", 15)
    except IOError:
        fonte_nome = ImageFont.load_default()
        fonte_info = ImageFont.load_default()

    draw.text((120, 20), nome, font=fonte_nome, fill=(0, 0, 0))
    draw.text((120, 50), f"Setor: {setor}", font=fonte_info, fill=(0, 0, 0))
    draw.text((120, 75), f"Ramal: {ramal}", font=fonte_info, fill=(0, 0, 0))

    # Salvar imagem em um buffer
    buffer = io.BytesIO()
    img.save(buffer, format='JPEG')
    buffer.seek(0)

    return send_file(buffer, mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
