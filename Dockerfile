FROM python:3.12-slim 
WORKDIR /app
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 80
CMD ["gunicorn", "--bind","0.0.0.0:80","--timeout","600", "run:app"]
