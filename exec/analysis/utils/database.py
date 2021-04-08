import pymysql

db = pymysql.connect(
    host='j4c101.p.ssafy.io',
    user='root',
    passwd='root',
    db='cooksistant',
    charset='utf8'
)

cursor = db.cursor(pymysql.cursors.DictCursor)