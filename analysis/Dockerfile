FROM python:3.7
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
RUN apt-get update && \
    apt-get install --yes software-properties-common
RUN add-apt-repository ppa:webupd8team/java && \
    echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections && \
    echo debconf shared/accepted-oracle-license-v1-1 seen true | debconf-set-selections    
RUN apt install default-jdk -y
EXPOSE 5000
CMD ["python","app.py"]