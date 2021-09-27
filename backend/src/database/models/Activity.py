from flask import request,Response
from database import config
from pymongo import DESCENDING
from bson import json_util
from util import response,environment
from util.request_api import request_ufps

mongo = config.mongo

class Activity:
    
    def createActivity(self):
        data = request.get_json()
        newActivity = mongo.db.activity.insert(data)
        # res = request_ufps().get(f"{environment.API_URL}/{data['riesgo']}_{data['nivelRiesgo']}").json()
        # for student in res: 
        #     student['correo']    
        # print("hola",res, 'este es el correo') 
        return response.success("todo ok",{ **data,"_id":str(newActivity)},"") 
      
    def listActivities(self):
        activities =mongo.db.activity.find().sort("date", DESCENDING)
        res= json_util.dumps(activities)
        return Response(res, mimetype="applicaton/json")     
        
      