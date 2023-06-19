import psycopg2
import os

db_url = os.environ.get("DATABASE_URL")
db_conn = psycopg2.connect(db_url)

def seed():
    with db_conn.cursor() as cur:
      cur.execute("DROP TABLE IF EXISTS question")
      cur.execute("CREATE TABLE question (id SERIAL PRIMARY KEY, title VARCHAR, option1 VARCHAR, option2 VARCHAR, option3 VARCHAR, answer VARCHAR);")

      questions = [
          {"title":'What is my middle name?', "option1": 'Kenneth', "option2": 'No middle name', "option3": 'Kyle', "answer": 'Lee'}, 
          {"title":'How old am I?', "option1": '27', "option2": '24', "option3": '25', "answer": '26'}, 
          {"title":'What year did I get married?', "option1": '2019', "option2": '2022', "option3": '2017', "answer": '2020'}, 
          {"title":'What is my favorite food?', "option1": 'French Fries', "option2": 'Ribs', "option3": 'Sushi', "answer": 'Chinese Food'}, 
          {"title":'What is my favorite anime?', "option1": 'Steins Gate', "option2": 'My Hero Academia', "option3": 'Demon Slayer', "answer": 'Attack On Titan'},
          {"title":'What is my favorite color?', "option1": 'Red', "option2": 'Purple', "option3": 'Green', "answer": 'Blue'},
          {"title":'What are my 2 cats names?', "option1": 'Nikko & Roman', "option2": 'Mittens & Missy', "option3": 'You dont have cats!', "answer": 'Bojji & Luma'},
          {"title":'What is my favorite movie?', "option1": 'Ready Player 1', "option2": 'Sonic the Hedgehog 2', "option3": 'Jumanji', "answer": 'You dont have a favorite!'},
          {"title":'Which Pokemon Gen do I like most?', "option1": 'Kanto', "option2": 'Sinnoh', "option3": 'Unova', "answer": 'Johto'},
          {"title":'Which shoe brand do I like most?', "option1": 'Nike', "option2": 'Addias', "option3": 'Puma', "answer": 'Which ever one is most comfy'},
        ]

      for question in questions:
        values = (question['title'], question['option1'], question['option2'], question['option3'], question['answer'])
        cur.execute("INSERT INTO question (title, option1, option2, option3, answer) VALUES(%s,%s,%s,%s,%s)", values)

    db_conn.commit()

def get_questions():
  db_conn = psycopg2.connect(db_url)
  with db_conn.cursor() as cur:
    cur.execute("SELECT * FROM question ORDER BY RANDOM() LIMIT 5;")
    data = cur.fetchall()
    return data
  
seed()

if db_conn:
   db_conn.close()