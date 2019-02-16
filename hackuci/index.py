from flask import Flask, jsonify, json, request
import sentiment
app = Flask(__name__)

@app.route("/", methods = ['GET'])
def index():
	artist = 'Kendrick Lamar'
	songs = ['BLOOD.', ' DNA', 'YAH', 'ELEMENT.', 'FEEL.', 'LOYALTY.', 'PRIDE',
		'HUMBLE.', 'LUST.', 'LOVE.', 'XXX.', 'FEAR.', 'GOD.', 'DUCKWORTH']
	song_polarity_list = []
	if request.method == 'GET':
		try:
			for song in songs:
				lyrics = sentiment.main(song, artist)

				empDict = {
				'Polarity': sentiment.text_to_sentiment(lyrics),
				'Song': song
				}

				song_polarity_list.append(empDict)

			# convert to json data
			# jsonStr = json.dumps(song_polarity_list)
		except Exception as e: 
			print(e)

	return jsonify(song_polarity_list)
