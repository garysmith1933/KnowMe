import psycopg2
conn = psycopg2.connect(dbname='trivia', password='root', user='postgres')

def seed():
  with conn: # commits automatically when completed
    with conn.cursor() as cur: # closes cursor when completed
      cur.execute("DROP TABLE IF EXISTS question")
      cur.execute("CREATE TABLE question (id SERIAL PRIMARY KEY, title VARCHAR, option1 VARCHAR, option2 VARCHAR, option3 VARCHAR, answer VARCHAR);")

      questions = [
          {"title":'What is my middle name?', "option1": 'Kenneth', "option2": 'No middle name', "option3": 'Kyle', "answer": 'Lee'}, 
          {"title":'How old am I?', "option1": '27', "option2": '24', "option3": '26', "answer": '25'}, 
          {"title":'What year did I get married?', "option1": '2019', "option2": '2022', "option3": '2017', "answer": '2020'}, 
          {"title":'What is my favorite food?', "option1": 'French Fries', "option2": 'Ribs', "option3": 'Sushi', "answer": 'Chinese Food'}, 
          {"title":'What is my favorite anime?', "option1": 'Steins Gate', "option2": 'My Hero Academia', "option3": 'Demon Slayer', "answer": 'Attack On Titan'}
        ]

      for question in questions:
        values = (question['title'], question['option1'], question['option2'], question['option3'], question['answer'])
        cur.execute("INSERT INTO question (title, option1, option2, option3, answer) VALUES(%s,%s,%s,%s,%s)", values)

def get_questions():
  with conn.cursor() as cur: # closes cursor when completed
    cur.execute("SELECT * FROM question ORDER BY RANDOM();")
    data = cur.fetchall()
    return data
    
seed()