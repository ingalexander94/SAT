from bson import json_util
from bson.objectid import ObjectId
from flask import request, Response
from util import jwt, response, environment, helpers
from database import config
from util.request_api import request_ufps

mongo = config.mongo


class Institutional:
    
    def login(self):
        info = request.get_json()
        code = info["code"]
        role = info["role"]
        endpoint = f"{role}_{code}"
        try:
            req = request_ufps().get(f"{environment.API_URL}/{endpoint}")
            data = req.json()
            if data["ok"]:
                user = data["data"]
                del user["contrasena"]
                token = jwt.generateToken(user, 60)
                return response.success("Bienvenido!!", user, token)
            else:
                return response.error("Revise los datos ingresados", 401)
        except:
            return response.error("Revise los datos ingresados", 401)

    def getByCode(self, code, role):
        if not code or not code.isdigit() or len(code) != 7:
            return response.reject("Se necesita un código de 7 caracteres")
        try:
            req = request_ufps().get(f"{environment.API_URL}/{role}_{code}")
            data = req.json()
            if data["ok"]:
                user = data["data"]
                del user["contrasena"]
                return response.success("Todo Ok!", user, "")
            else:
                return response.error("No se encontraron resultados", 400)
        except:
            return response.success("No se encontraron resultados", None, "")

    def getMyCoursesStudent(self, code):
        if not code or not code.isdigit() or len(code) != 7:
            return response.reject("Se necesita un código de 7 caracteres")
        try:
            req = request_ufps().get(f"{environment.API_URL}/materias_{code}")
            courses = req.json()
            if courses:
                return response.success("Todo ok!", courses, "")
            else:
                return response.reject("Está dirección no es válida")
        except:
            return response.reject("Está dirección no es válida")

    def getMyCoursesTeacher(self, code):
        if not code or not code.isdigit() or len(code) != 7:
            return response.reject("Se necesita un código de 7 caracteres")

        req = request_ufps().get(f"{environment.API_URL}/cursos_{code}")
        courses = req.json()
        # Borrar el docente
        return response.success("Todo ok!", courses, "")

    def getStudentsOfCourse(self, code, group):
        if not code or not code.isdigit() or len(code) != 7:
            return response.reject("Se necesita un código de 7 caracteres")
        try:
            res = request_ufps().get(f"{environment.API_URL}/listado_{code}_{group}")
            students = res.json()
            if students: 
                for student in students:
                    code = student["codigo"]
                    student["riesgo"] = request_ufps().get(f"{environment.API_URL}/riesgo_{code}").json()["riesgoGlobal"]
                return response.success("Todo ok!", students, "")
            else:
                return response.reject("Esta dirección  no es válida")
        except:
            return response.reject("Esta dirección  no es válida")

    def getProfits(self, code, risk):
        if not code or not code.isdigit() or len(code) != 7:
            return response.error("Se necesita un código de 7 caracteres", 400)
        req = request_ufps().get(f"{environment.API_URL}/beneficios_{code}")
        data = list(req.json())
        profits = list(
            mongo.db.profit.find({"riesgo": risk}, {"nombre": 1, "_id": False})
        )
        array = []
        for key in profits:
            array.append(key["nombre"])
        aux = list(filter(lambda profit: profit["nombre"] in array, data))
        return response.success("todo ok", aux, "")
    
    def adminProfits(self):
        code = request.args.get("code")
        risk = request.args.get("risk")
        req = request_ufps().get(f"{environment.API_URL}/beneficios_{code}")
        dataUFPS = list(req.json())
        profits = list(filter(lambda profit: not profit["fechaFinal"], dataUFPS))
        profits = list(map(lambda profit : profit["nombre"], profits))
        if len(profits) > 0:
            self.updateReviewSuggestion(profits, code)
        profitsDB = list(mongo.db.profit.find({"riesgo": risk}))
        suggestion = list(mongo.db.suggestion.find({"codeStudent":code, "state":True}, {"profit":1, "_id": False})) 
        responseProfit = list(mongo.db.suggestion.find({"codeStudent":code, "state":False, "response": True}, {"profit":1, "_id": False})) 
        responseCurrent = self.getResponse(dataUFPS, responseProfit, code)
        data = list(map(lambda profit : {"nombre": profit["nombre"], "state": profit["nombre"] in profits, "id":str(profit["_id"]), "isSuggested": {"profit":profit["_id"]} in suggestion, "response": {"profit":profit["_id"]} in responseCurrent }, profitsDB))
        return response.success("Todo ok!", data, "")
    
    def updateReviewSuggestion(self, profits, code):
        profits = list(map(lambda profit : mongo.db.profit.find_one({"nombre": profit}, { "total":1, "_id": 1})["_id"], profits))
        try:
            mongo.db.suggestion.update_many(
            {"codeStudent":code, "inReview": True, "profit": {"$in":profits}  }, {"$set": {"inReview":False}})
        except:
            return response.reject("Error al intentar actualizar una sugerencia")
    
    def getResponse(self, data, response, code):
        profits = list(filter(lambda profit: profit["fechaFinal"], data))
        profits = list(set(map(lambda profit : profit["nombre"], profits)))
        profits = list(map(lambda profit : {"profit": mongo.db.profit.find_one({"nombre": profit}, { "total":1, "_id": 1})["_id"]}, profits))
        profits = list(filter(lambda profit: not mongo.db.suggestion.find_one({"codeStudent":code, "profit":profit["profit"], "inReview":True}) , profits))
        response = list(filter(lambda res: res not in profits, response))
        return response 

    def studentsOfPeriod(self):
        program = "sistemas"
        period = "2021-1"
        split = period.split("-")
        year = split[0]
        semester = split[1]
        res = request_ufps().get(f"{environment.API_URL}/{program}_{year}_{semester}") 
        students = res.json() 
        if students:  
            for student in students:
                code = student["codigo"]
                student["riesgo"] = request_ufps().get(f"{environment.API_URL}/riesgo_{code}").json()["riesgoGlobal"]
        return response.success("todo ok!", students, "")

    def getSemesters(self, code):
        if not code or len(code) != 7 or not code.isdigit():
            return response.error("Se necesita un código de 7 caracteres", 400)
        res = request_ufps().get(f"{environment.API_URL}/semestres_{code}")
        data = res.json()
        data = helpers.updateSemestersRegistered(data)
        dataRes = {"data": data, "registered": helpers.countSemesters(data)}
        return response.success("Todo Ok!", dataRes, "")

    def getRecords(self, code, type):
        if not code or len(code) != 7 or not code.isdigit():
            return response.error("Se necesita un código de 7 caracteres", 400)
        filters = {"familyHistory":1, "_id": True} if type == "psicologica" else {"familyHistory":False, "_id": True}
        records = mongo.db.record.find_one({"student":code}, filters)
        res = json_util.dumps(records)
        return Response(res, mimetype="applicaton/json")
    
    def saveRecord(self):
        record = request.json["record"]
        if not "_id" in record:
            id = mongo.db.record.insert(record)
            record = {
                **record, 
                "_id":str(id)
            } 
        else:
            id = record["_id"]
            del record["_id"]
            mongo.db.record.update_one({"_id": ObjectId(id)}, {"$set": record})
            record = {
                **record,  
                "_id": id
            }
        return record
    
