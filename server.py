from flask import Flask, send_from_directory
from flask_cors import CORS, cross_origin
import db

app = Flask(__name__, static_url_path='', static_folder='client/build')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/")
@cross_origin()
def serve():
    print('running')
    return send_from_directory(app.static_folder,'index.html')

@app.route("/data")
@cross_origin()
def get_data():
  return db.get_questions()


if __name__ == "__main__":
  app.run(debug=True, port=8000)
