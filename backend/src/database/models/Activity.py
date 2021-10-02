from flask import request,Response
from database import config
from pymongo import DESCENDING
from bson import json_util
from util import response,environment,emails
from util.request_api import request_ufps
from util.helpers import  convertLevelRisk

mongo = config.mongo

class Activity:
    
    def createActivity(self):
        data = request.get_json()
        data ={
            **data,
            "state":True
        }
        newActivity = mongo.db.activity.insert(data) 
        res = request_ufps().get(f"{environment.API_URL}/{data['risk']}_{data['riskLevel']}").json()
        studentEmails = list(map(lambda student : student['correo'], res)) 
        studentEmails = set(studentEmails)
        message=f"Cordial saludo\nTe informamos que estas invitado a la actividad {data['name']} que sera {data['date']} en {data['place']} a  a las {data['hour']} \nTe esperamos   \nGracias por su anteción"
        sub = "Te invitamos a una Actividad"
        emails.sendMultipleEmail(studentEmails,message, sub) 
        return response.success("todo ok",{ **data,"_id":str(newActivity),},"") 
       
    def listActivities(self):
        activities =mongo.db.activity.find().sort("date", DESCENDING)
        res= json_util.dumps(activities)
        return Response(res, mimetype="applicaton/json")  
    
    def  listActivitiesStudente(self, code):
        activities =[]
        res = request_ufps().get(f"{environment.API_URL}/riesgo_{code}").json()
        riskStudent = list(map(lambda risk : {'risk': risk['nombre'], 'riskLevel':convertLevelRisk(risk['puntaje'])} , res['riesgos']))
        for risk in riskStudent:
            activities = [*activities, *list( mongo.db.activity.find({**risk, 'state':True}))]
        resActivities= json_util.dumps(activities)
        return Response(resActivities, mimetype="applicaton/json")
    
    
        
          
            