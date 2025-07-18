# Usar uma imagem base do Python
FROM python:3.9-slim

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos da aplicação
COPY . /app

# Instalar as dependências
RUN pip install Flask Pillow

# Expor a porta que a aplicação vai rodar
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["python", "app.py"]
