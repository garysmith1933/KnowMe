from flask import Flask, send_from_directory
from flask_cors import CORS
import db

app = Flask(__name__, static_url_path='', static_folder='client/build')
cors = CORS(app, supports_credentials=True)

@app.route("/")
def serve():
    return send_from_directory(app.static_folder,'index.html')

@app.route("/questions")
def get_data():
  return db.get_questions()

if __name__ == "__main__":
  app.run(debug=True, port=8000)
