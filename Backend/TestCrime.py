from flask import Flask, request
from flask import jsonify
app = Flask(__name__)
import pymongo
from pymongo import MongoClient

from bson import Binary, Code
from bson.json_util import dumps
import json
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

connection = MongoClient("mongodb://XXX")
db = connection['safety_predict']
collection = db.crime

@app.after_request 
def after_request(response): 
	response.headers.add('Access-Control-Allow-Credentials', 'true') 
	response.headers.add('Access-Control-Allow-Origin', '*') 
	response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization') 
	response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS') 
	return response

@app.route("/", methods=['GET'])
def fetch_crime():
	return jsonify(collection.find().count()),200

@app.route("/getDayNightData", methods=['GET'])
def fetchDayNightData():
	print(request.args['City'])
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

@app.route("/getCrimeType", methods=['GET'])
def fetchCrimeType():
	
	list1 = ['theft','shoplifting', 'burglary', 'robbery','pickpocket', 'snatching', 'stolen']
	list2 = ['arson', 'weapon', 'battery', 'child', 'homicide', 'kidnapping']
	list3 = ['unauthorized','computer','access','trespassing', 'conspiracy', 'counterfeit', 'fraud', 'disturbing','peace','forgery', 'illegal', 'false', 'vandalism', 'violation', 'traffic', 'narcotic']
	list4 = ['harrasment', 'stalking', 'rape', 'sex']
	jsonResult={}
	jsonResult['burglary'] = 0
	jsonResult['assault'] = 0
	jsonResult['violation'] = 0
	jsonResult['sexualcrimes'] = 0
	jsonResult['others'] = 0

	result = collection.find({"City": "Los Angeles","Area Name" : "Central"},{"Crime Type": 1, "_id": 0})
	#return dumps(result)

	for item in result:
		if any(word in item['Crime Type'].lower() for word in list1):
				print(item['Crime Type'])
				jsonResult['burglary'] += 1
		elif any(word in item['Crime Type'].lower() for word in list2):
			jsonResult['assault'] += 1
		elif any (word in item['Crime Type'].lower() for word in list3):
			jsonResult['violation'] += 1
		elif any (word in item['Crime Type'].lower() for word in list4):
			jsonResult['sexualcrimes'] += 1
		else:
			jsonResult['others'] += 1
	#result = collection.aggregate([{$match: {"City": "Los Angeles","Area Name" : "77th Street"}},{"$group" : {_id:"$Crime Type", count:{"$sum":1}}}])
	
	return dumps(jsonResult)


