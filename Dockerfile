# Estágio 1: Definir a imagem base do Python
FROM python:3.9-slim

# Estágio 2: Configurar o ambiente
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Estágio 3: Copiar os arquivos da aplicação
COPY . .

# Estágio 4: Expor a porta e definir o comando de execução
EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
