import math
from datetime import datetime
from flask import request, Response
from util import response, emails
from flask import request, Response
from pymongo import DESCENDING
from util import response, emails
from database import config
from database.models import Postulation
from bson import json_util
from bson.objectid import ObjectId

mongo = config.mongo

instance_postulation =  Postulation.Postulation()

class Meet:
    def createMeet(self):
        data = request.get_json()
        role = data["role"]
        data = {
            **data,
            "role": ObjectId(role)
        }
        id = mongo.db.meet.insert(data) 
        data = {
            **data,
            "role": role,
            "_id": str(id)
        }
        role = mongo.db.role.find_one({"_id": ObjectId(role)}, {"_id": False})["role"]
        postulation = data["postulation"]
        instance_postulation.updateState(postulation, "NOTIFICADO PARA CITA")
        date = data["dateFormat"]
        to = data["student"]["correo"]
        message = f"Cordial saludo\nSe le informa que se  encuentra en proceso de seguimiento por bienestar universitario.\nTiene unos minutos libres para que podamos hablar sobre su situación actual o sobre cualquier otra ayuda que te brindemos y  mejorar tu estadía en  la universidad.\nTe recordamos que la reunió esta programada para el {date}.\nQuedamos atentos a cualquier inquietud y respuesta sobre tu asistencia"
        subject = f"Notificación cita con {role} | SAT"
        emails.sendEmail(to, message, subject)
        notification = {
            "title" : "Tiene una reunión pendiente por confirmar asistencia",
            "url" :"/estudiante/reunion",
            "date" : datetime.now().isoformat(),
            "isActive" : True,
            "codeReceiver" : data["student"]["codigo"]
        }
        mongo.db.notification.insert(notification)
        return response.success("todo ok", data, "")
    
    def getMeetOfStudent(self, code):
        if not code or not code.isdigit() or len(code) != 7:
            return response.error("Se necesita un código de 7 caracteres", 400)
        data = mongo.db.meet.find_one({"state":"SIN RESPONDER", "student.codigo":{"$eq": code}})
        if data:
            role = mongo.db.role.find_one({"_id": ObjectId(data["role"])}, {"_id": False})["role"]
            data["role"] = role
        meet = json_util.dumps(data)
        return Response(meet, mimetype="applicaton/json")
    
    def acceptMeet(self, id):
        accept = request.json["accept"]
        state = "ACEPTADA" if accept else "RECHAZADA"
        set = {"state" : state}
        if state == "RECHAZADA":
            set = {
                **set,
                "reason": request.json["reason"]
            }
        mongo.db.meet.update_one({"_id": ObjectId(id)}, {"$set": set})
        return response.success(f"Reunión {state.lower()}", {}, "")
    
    def updateAttendanceMeet(self, id):
        attendance = request.json["attendance"]
        student = request.json["student"]
        set = { "attendance":attendance }
        mongo.db.meet.update_one({"_id": ObjectId(id)}, {"$set": set})
        mongo.db.postulation.update_one({"student.codigo":{"$eq":student}}, {"$set": {"state": "EN SEGUIMIENTO"}})
        return response.success("Todo ok!", {}, "")
    
    def getMeeetsStudent(self, code):
        if not code or not code.isdigit() or len(code) != 7:
            return response.reject("Se necesita un código de 7 caracteres")
        output = []
        for meet in mongo.db.meet.find({"student.codigo":{"$eq":code}}).sort("date", DESCENDING):
            role = mongo.db.role.find_one({"_id": ObjectId(meet["role"])}, {"_id":False})["role"]
            meet["role"] = role
            output.append(meet)
        res = json_util.dumps(output)
        return Response(res, mimetype="applicaton/json")
         
            
    def paginateMeets(self, role):
        page = request.args.get("page", default=1, type=int)
        perPage = request.args.get("perPage", default=5, type=int)
        state = request.args.get("state", default="ACEPTADA")
        date = request.args.get("date")
        role = mongo.db.role.find_one({"role": role}) ["_id"]
        totalMeets = mongo.db.meet.count_documents({"state": state, "date": date, "role": role})
        totalPages = math.ceil(totalMeets / perPage)
        offset = ((page - 1) * perPage) if page > 0 else 0
        data = mongo.db.meet.find({"state": state, "date": date, "role": role, "attendance":False}).sort("date", DESCENDING).skip(offset).limit(perPage)
        meets = json_util.dumps({"totalPages": totalPages, "data": data})
        return Response(meets, mimetype="applicaton/json")
