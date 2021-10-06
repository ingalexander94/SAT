from datetime import datetime
from bson.objectid import ObjectId
from flask import request,Response
from database import config
from pymongo import ASCENDING
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
        if len(res) > 0:  
            date = datetime.strptime(data['date'], '%Y-%m-%dT%H:%M:%S.%fZ')
            studentEmails = list(map(lambda student : student['correo'], res)) 
            message=f"Cordial saludo\nTe informamos que estas invitado a la actividad {data['name']} que sera {date} en {data['place']}. \nTe esperamos   \nGracias por su atención"
            sub = "Te invitamos a una Actividad"
            studentEmails = set(studentEmails)
            emails.sendMultipleEmail(studentEmails,message, sub) 
        return response.success("todo ok",{ **data,"_id":str(newActivity),},"") 
       
    def listActivities(self):
        activities = list(mongo.db.activity.find({"state":True}).sort("date", ASCENDING))
        activities = list(map(lambda activity : {**activity, "counter":mongo.db.attendance.count_documents({"activity": activity["_id"]})}, activities))
        res= json_util.dumps(activities)
        return Response(res, mimetype="applicaton/json")  
    
    def  listActivitiesStudent(self, code):
        if not code or not code.isdigit() or len(code) != 7:
            return response.error("Se necesita un código de 7 caracteres", 400)
        activities =[]
        res = request_ufps().get(f"{environment.API_URL}/riesgo_{code}").json()
        riskStudent = list(map(lambda risk : {'risk': risk['nombre'], 'riskLevel':convertLevelRisk(risk['puntaje'])} , res['riesgos']))
        for risk in riskStudent:
            aux = list( mongo.db.activity.find({**risk, 'state':True}))
            aux = list(map(lambda activity : {**activity, "counter": mongo.db.attendance.count_documents({"activity": activity["_id"]}), "asistance":mongo.db.attendance.count_documents({"activity": activity["_id"], "student":code}) > 0}, aux))
            activities = [*activities, *aux]
        resActivities= json_util.dumps(activities)
        return Response(resActivities, mimetype="applicaton/json")
    
    def asistActivity(self, code):
        if not code or not code.isdigit() or len(code) != 7:
            return response.error("Se necesita un código de 7 caracteres", 400)
        asist = request.json["asist"]
        idActivity = request.json["activity"]    
        asistActivity = {
            "student": code,
            "activity": ObjectId(idActivity)
            }
        if not asist:
            mongo.db.attendance.delete_one(asistActivity)
        else:
            mongo.db.attendance.insert_one(asistActivity)
        return response.success("todo ok!", None, "")
    
    def getActivitysAsist(self, code):
        if not code or not code.isdigit() or len(code) != 7:
            return response.error("Se necesita un código de 7 caracteres", 400)
        asists = []
        output = []
        for asist in mongo.db.attendance.find({"student": code}):
           asists.append(asist["activity"])
           for idActivity in asists:
               activity = mongo.db.activity.find_one({"_id": idActivity})
               output.append(activity)
        res = json_util.dumps(output) 
        return Response(res, mimetype="applicaton/json")
    
    def desactiveActivity(self, id):
        if not id or len(id) != 24:
            return response.error("Se necesita un id de 24 caracteres", 400)
        mongo.db.activity.update_one({"_id": ObjectId(id)}, {"$set": {"state": False}})
        return response.success("todo ok", None, "")
        
    def updateActivity(self):
        id = request.json["id"]
        activity = request.json["activity"]
        mongo.db.activity.update_one({"_id": ObjectId(id)}, {"$set": {**activity}})
        return response.success("todo ok!", activity, "")
            