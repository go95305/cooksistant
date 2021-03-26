FROM python:3.7
COPY . .
WORKDIR /app
RUN pip freeze > requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8083
CMD ["python","app.py"]