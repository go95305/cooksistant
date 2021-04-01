FROM python:3.7
WORKDIR /app
COPY . .
# RUN pip freeze > requirements.txt
RUN pip install -r requirements.txt
RUN apt-get install openjdk-8-jdk python-dev python3-dev
# RUN pip install JPype1-1.1.2-cp37-cp37m-win_amd64.whl
ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java
EXPOSE 5000
CMD ["python","app.py"]