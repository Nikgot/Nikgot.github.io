GOOGLE = "AIzaSyANP9uVSmUQKO45T3Ccs8mu1QEOQIxqCcY"
TOM = "zenXdUtzBIr8t0RWhcvKgYJuhiPFUgRg"
IP = "8a3ba821098026"

from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
import requests

app = Flask(__name__)

CORS(app)

@app.route("/")
def index():
	return send_from_directory("static", "assignment2.html")

@app.route("/script.js")
def js():
	return send_from_directory("static", "script.js")

@app.route("/images/<path:filename>")
def image(filename):
	return send_from_directory("images", filename)



@app.route("/api/location")
def location():
	u_ip = request.remote_addr# line works but not for testing locally
	response = requests.get(f"https://ipinfo.io/{u_ip}/json?token={IP}")
	data = response.json()
	return jsonify(data)

@app.route("/api/geocode", methods=["GET"])
def geocode():
	address = request.args.get("address")
	response = requests.get(f"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={GOOGLE}")
	#(response.text)
	data = response.json()
	return jsonify(data["results"])


@app.route("/weather", methods = ["GET"])
def weather():
	lat = request.args.get("lat")
	lng = request.args.get("lng")

	response = requests.get(f'https://api.tomorrow.io/v4/timelines?location={lat},{lng}&fields=temperature,temperatureApparent,temperatureMin,temperatureMax,windSpeed,windDirection,humidity,pressureSeaLevel,uvIndex,weatherCode,precipitationProbability,precipitationType,sunriseTime,sunsetTime,visibility,moonPhase,cloudCover&units=imperial&timezone=America/Los_Angeles&timesteps=1d&startTime=now&endTime=nowPlus5d&apikey={TOM}')
	data = response.json()
	return jsonify(data)

@app.route("/weather2", methods = ["GET"])
def weather2():
	lat = request.args.get("lat")
	lng = request.args.get("lng")

	response = requests.get(f'https://api.tomorrow.io/v4/timelines?location={lat},{lng}&fields=temperature,temperatureApparent,temperatureMin,temperatureMax,windSpeed,windDirection,humidity,pressureSeaLevel&units=imperial&timezone=America/Los_Angeles&timesteps=1h&startTime=now&endTime=nowPlus5d&apikey={TOM}')
	data = response.json()
	return jsonify(data)


if __name__ == '__main__':
	app.run(debug=True)
