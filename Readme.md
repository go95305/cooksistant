# CookSistant [레시피 추천서비스]

### 기능
    1. 재료 기반과 사용자 취향에 맞는 레시피 추천
    2. 영수증을 읽어 재료들을 파악한 후 관련 레시피 추천 (OCR 광학 문자 인식)
    3. 사용자 취향에 맞게 '레시피의 좋아요&싫어요 or  레시피 조회' 수에 따라 인기 레시피 추천
    4. 요즘 핫한 음식 추천 → 네이버 데이터랩
    5. '달다', '맵다', '짜다' 등 맛 표현을 수치화하여 방사형그래프로 통계하여 제공
        - 요리한 레시피에 대한 맛을 **'달다', '맵다', '짜다' ,'쓰다','시다' 수치로 평가 
        (배민리뷰처럼 자신이 완료한 레시피 한에서 평가할 수 있도록)
        - 평가를 할 수 있도록 유도할 필요성 있음
    6. 레시피 등록 
        - '종이컵' 같은 계량 기준도 등록 → 같은 재료가 사용되는 레시피라도 계량에 따라 맛이 다르므로 사용자마다 레시피에 대한 선호도가 달라질 수 있다.
    7. 음식에 필요한 재료의 최저가를 알려줄 오픈마켓 (추가기능)


### Notion Link
- https://www.notion.so/543132e41a604f42bb025e566e64d479?v=67dc21bdb5ff4e04a541ac8719874793
- __WireFrame__  : https://www.notion.so/2-133edde3ee8f4e408b19ac8b36616525
- __요구사항정의__ : https://docs.google.com/document/d/1Bkhzf-KjG0XCGEeLpWBcVIxRqQZ3psmlEWlFFhw9OOE/edit



### 데이터 분석
크롤링 페이지(만개의 레시피): https://www.10000recipe.com/recipe/list.html

Bootstrap Sampling : https://m.blog.naver.com/PostView.nhn?blogId=mathnstat&logNo=221404758083&proxyReferer=https:%2F%2Fwww.google.com%2F