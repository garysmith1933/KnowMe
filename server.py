from flask import Flask
from flask_cors import CORS, cross_origin
import db

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/data")
@cross_origin()
def get_data():
  return db.get_questions()


if __name__ == "__main__":
  app.run(debug=True, port=8080)
