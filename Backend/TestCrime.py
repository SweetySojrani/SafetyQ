from flask import Flask
from flask import jsonify
app = Flask(__name__)
import pymongo
from pymongo import MongoClient

from bson import Binary, Code
from bson.json_util import dumps
import json

connection = MongoClient("mongodb://dbuser:dbuser1@ds039707.mlab.com:39707/safety_predict")
db = connection['safety_predict']
collection = db.crime


@app.route("/", methods=['GET'])
def fetch_crime():
	return jsonify(collection.find().count()),200

@app.route("/getCrimeData", methods=['GET'])
def fetchDayNightData():
	result = collection.find({"City": "Los Angeles","Area Name" : "77th Street"})
	jsonResult={}
	jsonResult['day'] = 0
	jsonResult['night'] = 0
	for item in result:
		timeOfIncident = int(item["Time Occurred"])
		if timeOfIncident >= 500 and timeOfIncident <= 1800:
			jsonResult['day']=jsonResult['day']+1
		else:
			jsonResult['night']=jsonResult['night']+1
	#resultCount = [day, night]
	return dumps(jsonResult)



