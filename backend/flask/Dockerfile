FROM python:3
MAINTAINER "go95305@naver.com" 

COPY requirements.txt ./ 
RUN pip install -r requirements.txt 
COPY . . 
EXPOSE 80 
ENTRYPOINT ["python"]
CMD ["app.py" ]
