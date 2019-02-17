from flask import Flask, jsonify, json, request
from flask_cors import CORS

import sentiment
app = Flask(__name__)
CORS(app)

@app.route("/", methods = ['GET'])

def index():
	mood = request.args.get('mood')
	song_polarity_list = []
	if request.method == 'GET':
		try:
			song = sentiment.input_shit(mood)
			empDict = {
			'Song': song
			}

			song_polarity_list.append(empDict)

			# convert to json data
			# jsonStr = json.dumps(song_polarity_list)
		except Exception as e:
			print(e)

	return jsonify(song_polarity_list)
