import os
import sys
import re
import json
import urllib.request


def getTrend():
    client_id = "st9xvPkKYLgT7c3bdZVa"
    client_secret = "4NTYUN_MVb"
    encText = urllib.parse.quote("자취생 간단 요리 레시피")
    url = "https://openapi.naver.com/v1/search/blog?query=" + encText  # json 결과
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id", client_id)
    request.add_header("X-Naver-Client-Secret", client_secret)
    response = urllib.request.urlopen(request)
    rescode = response.getcode()
    if(rescode == 200):
        response_body = response.read().decode('utf-8')
        dict = json.loads(response_body)
        dict = dict['items']
        tmp={}
        trend=[]
        for i in dict:
            title_tmp = re.sub('(<([^>]+)>)', '', i['title'])
            title_tmp = re.sub('[&quotlg;]', '', title_tmp)
            tmp['title']=title_tmp
            tmp['link']=i['link']
            trend.append(tmp)
        return trend
    else:
        return rescode
