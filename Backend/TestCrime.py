from flask import Flask
from flask import jsonify
app = Flask(__name__)
import pymongo
from pymongo import MongoClient
@app.route("/", methods=['GET'])
def fetch_crime():
	#client = MongoClient()
	#connection = Connection()
	connection = MongoClient("mongodb://dbuser:dbuser1@ds039707.mlab.com:39707/safety_predict")
	#connection = MongoClient("mongodb://ds039707.mlab.com:39707/safety_predict")
	db = connection['safety_predict']
	db = connection['safety_predict']
	collection = db.crime
	#for post in collection.find():
	#	print(post)
	return jsonify(collection.find().count()),200