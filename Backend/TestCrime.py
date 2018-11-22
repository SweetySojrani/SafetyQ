from __future__ import division
from flask import Flask, request
from flask import jsonify
app = Flask(__name__)
import pymongo
from pymongo import MongoClient

from bson import Binary, Code
from bson.json_util import dumps
import json
from flask_cors import CORS
import config

app = Flask(__name__)
CORS(app)

connection = MongoClient(config.uri)
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
	city = request.args['City']
    
	area = request.args['Area Name']

	result = collection.find({"City": city,"Area Name" : area})
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

	city = request.args['City']
    
	area = request.args['Area Name']

	result = collection.find({"City": city,"Area Name" : area})

	for item in result:
		if any(word in item['Crime Type'].lower() for word in list1):
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

@app.route("/getGenderData", methods=['GET'])

def fetchGenderData():

	city = request.args['City']
    
	area = request.args['Area Name']

	result = collection.find({"City": city,"Area Name" : area})
    
	jsonResult={}

	jsonResult['male'] = 0

	jsonResult['female'] = 0
    	
	for item in result:

		genderofVictim = (item["Victim Sex"])

		if genderofVictim == 'M' :

			jsonResult['male']=jsonResult['male']+1

		elif genderofVictim == 'F':

			jsonResult['female']=jsonResult['female']+1
            
		

	#resultCount = [day, night]

	return dumps(jsonResult)


@app.route("/getAgeData", methods=['GET'])

def fetchAgeData():

	city = request.args['City']
    
	area = request.args['Area Name']

	result = collection.find({"City": city,"Area Name" : area})
    
	jsonResult={}

	jsonResult['child'] = 0

	jsonResult['mid1'] = 0

	jsonResult['mid2'] = 0

	jsonResult['mid3'] = 0

	jsonResult['old'] = 0

	for item in result:

		ageofVictim = (item["Victim Age"])

		if ageofVictim >= '1' and ageofVictim <= '18':

			jsonResult['child']=jsonResult['child']+1

		elif ageofVictim >= '19' and ageofVictim <= '25':

			jsonResult['mid1']=jsonResult['mid1']+1

		elif ageofVictim >= '26' and ageofVictim <= '40':

			jsonResult['mid2']=jsonResult['mid2']+1

		elif ageofVictim >= '41' and ageofVictim <= '60':

			jsonResult['mid3']=jsonResult['mid3']+1

		else:

			jsonResult['old']=jsonResult['old']+1

	#resultCount = [day, night]

	return dumps(jsonResult)


@app.route("/getRaceData", methods=['GET'])

def fetchRaceData():

	city = request.args['City']
    
	area = request.args['Area Name']

	result = collection.find({"City": city,"Area Name" : area})
    
	jsonResult={}

	jsonResult['white'] = 0

	jsonResult['other'] = 0
    	
	jsonResult['hispanic'] = 0

	jsonResult['black'] = 0
    
	jsonResult['asian'] = 0

	jsonResult['caucasian'] = 0
    
	for item in result:

		raceofVictim = (item["Victim Descent"])

		if raceofVictim == 'A' or raceofVictim == 'K' or raceofVictim == 'I':

			jsonResult['asian']=jsonResult['asian']+1

		elif raceofVictim == 'B' or raceofVictim == 'J':

			jsonResult['black']=jsonResult['black']+1
            
		elif raceofVictim == 'H' or raceofVictim == 'L':

			jsonResult['hispanic']=jsonResult['hispanic']+1

		elif raceofVictim == 'W':

			jsonResult['white']=jsonResult['white']+1
        
		elif raceofVictim == 'C' or raceofVictim == 'F' or raceofVictim == 'G' or raceofVictim == 'P':

			jsonResult['caucasian']=jsonResult['caucasian']+1
            
		else:

			jsonResult['other']=jsonResult['other']+1

	#resultCount = [day, night]

	return dumps(jsonResult)

@app.route("/getDateData", methods=['GET'])

def fetchDateData():



	city = request.args['City']
    
	area = request.args['Area Name']

	result = collection.find({"City": city,"Area Name" : area})
    
	jsonResult={}

	jsonResult['2013'] = 0

	jsonResult['2014'] = 0

	jsonResult['2015'] = 0

	jsonResult['2016'] = 0

	jsonResult['2017'] = 0

	for item in result:

		dateofCrime = (item["Occurred Date"])

		if dateofCrime == '2013':

			jsonResult['2013']=jsonResult['2013']+1

		elif dateofCrime == '2014':

			jsonResult['2014']=jsonResult['2014']+1

		elif dateofCrime == '2015':

			jsonResult['2015']=jsonResult['2015']+1

		elif dateofCrime == '2016':

			jsonResult['2016']=jsonResult['2016']+1

		elif dateofCrime == '2017':

			jsonResult['2017']=jsonResult['2017']+1

	#resultCount = [day, night]

	return dumps(jsonResult)



@app.route("/getYearOnYearPrediction", methods=['GET'])
def fetchPrediction():
	city = request.args['City']
	area = request.args['Area Name']
	result = collection.find({"City": city,"Area Name" : area})
	jsonResult={}
	jsonResult['2013'] = 0
	jsonResult['2014'] = 0
	jsonResult['2015'] = 0
	jsonResult['2016'] = 0
	jsonResult['2017'] = 0
	for item in result:
		dateofCrime = (item["Occurred Date"])
		if dateofCrime == '2013':
			jsonResult['2013']=jsonResult['2013']+1
		elif dateofCrime == '2014':
			jsonResult['2014']=jsonResult['2014']+1
		elif dateofCrime == '2015':
			jsonResult['2015']=jsonResult['2015']+1
		elif dateofCrime == '2016':
			jsonResult['2016']=jsonResult['2016']+1
		elif dateofCrime == '2017':
			jsonResult['2017']=jsonResult['2017']+1
	jsonPercent = {}
	percentSum=0
	count=0
	final=0

	if jsonResult['2013'] > 0 and jsonResult['2014'] > 0:
		diff = jsonResult['2014'] - jsonResult['2013']
		jsonPercent['2013to2014'] = diff/jsonResult['2013'] * 100
		percentSum +=jsonPercent['2013to2014'] 
		count+=1
		final = jsonResult['2014']

	if jsonResult['2014'] > 0 and jsonResult['2015'] > 0:
		diff = jsonResult['2015'] - jsonResult['2014']
		print(diff)
		print(float(diff/jsonResult['2014']))
		jsonPercent['2014to2015'] = diff/jsonResult['2014'] * 100
		percentSum +=jsonPercent['2014to2015']
		count+=1
		final = jsonResult['2015']

	if jsonResult['2015'] > 0 and jsonResult['2016'] > 0:
		diff = jsonResult['2016'] - jsonResult['2015']
		jsonPercent['2015to2016'] = diff/jsonResult['2015'] * 100
		percentSum +=jsonPercent['2015to2016']
		count+=1
		final = jsonResult['2016']

	if jsonResult['2016'] > 0 and jsonResult['2017'] > 0:
		diff = jsonResult['2017'] - jsonResult['2016']
		print(diff/jsonResult['2016'])
		jsonPercent['2016to2017'] = diff/jsonResult['2016'] * 100
		percentSum +=jsonPercent['2016to2017']
		count+=1
		final = jsonResult['2017']
	
	jsonArr = []
	for key in jsonResult:
		jsonArr.append(jsonResult[key])
	print('jsonArr')
	print(jsonArr)
	if count > 0:
		averageGrowth = percentSum/count

		#Projecting
		n=2
		projectedValue=[]
		
		
		#y=a(1+r)^x
		for i in range(0, n):
			projectedVal = final * (1+(averageGrowth/100))
			final = projectedVal
			projectedValue.append(projectedVal)

		print('Projected Value')
		print(projectedValue)
		return dumps(jsonArr + projectedValue)
		
	#for value in jsonPercent:
	#return dumps(jsonPercent)

	return dumps(jsonArr)
	
