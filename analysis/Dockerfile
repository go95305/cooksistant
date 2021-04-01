FROM python:3.7
WORKDIR /app
COPY . .
# RUN pip freeze > requirements.txt
RUN pip install -r requirements.txt
RUN pip install JPype1-1.1.2-cp37-cp37m-win_amd64.whl
EXPOSE 5000
CMD ["python","app.py"]