import pymysql

db = pymysql.connect(
    host='host',
    user='user',
    passwd='passwd',
    db='cooksistant',
    charset='utf8'
)

cursor = db.cursor(pymysql.cursors.DictCursor)
