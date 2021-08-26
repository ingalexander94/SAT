import math, requests
from flask import request, Response
from pymongo import DESCENDING
from database import config
from bson import ObjectId, json_util
from bson.json_util import loads
from util import environment, response

mongo = config.mongo

class Suggestion:
    
    def createSuggestion(self, user):
        data = request.get_json()
        idProfit = ObjectId(request.json["profit"])
        idAdmin = ObjectId(user["_id"])
        ref =  loads(json_util.dumps({
            "admin": idAdmin , 
            "profit": idProfit
        }))
        suggestion = { 
                **data, 
                **ref,
                "state":True,
                "response":False
                }
        id = mongo.db.suggestion.insert_one(suggestion).inserted_id
        res = json_util.dumps({**suggestion, "_id": id})
        return Response(res, mimetype="applicaton/json")
        
    def paginateSuggestion(self):
        return self.createPagination({"state": True, "response":False})
    
    def filterSuggestion(self):
        typeFilter = request.json["filter"]
        if typeFilter == "byCode":
            return self.filterByCode()
        if typeFilter == "byDate":
            return self.filterByDate()
        value = request.json["value"]
        if typeFilter == "byProfit":
            return self.filterByProfit(value)
        nameDB = "administrative" if typeFilter == "byRole" else "profit"
        where = {"estado":True, "rol":value} if typeFilter=="byRole" else {"riesgo": value}
        return self.filterByValue(nameDB, where)
    
    def filterByDate(self):
        start = request.json["value"]["from"]
        end = request.json["value"]["to"]
        return self.createPagination({
            "state":True,
            "response":False,
            "date": {'$lte': end, '$gte': start}
        })   
    
    def filterByCode(self):
        code = request.json["value"]
        return self.createPagination({
            "state":True,
            "response":False,
            "codeStudent": code
        })   
    
    def filterByValue(self, nameDB, where):
        field =  "admin" if nameDB == "administrative" else "profit"
        array = list(mongo.db[nameDB].find(where, {"_id":1, "total": 1}))
        array = list(map(lambda arr : ObjectId(arr["_id"]), array))
        return self.createPagination({"state":True,"response":False, field: {"$in": array}})
    
    def filterByProfit(self, value):
        profit = mongo.db["profit"].find_one({"nombre": value}, {"_id":1, "total": 1})
        return self.createPagination({"state":True, "response":False,"profit": ObjectId(profit["_id"])})
    
    def createPagination(self, where):
        suggestions = []
        output = []
        totalSuggestions = mongo.db.suggestion.count_documents(where)
        page = request.args.get("page", default=1, type=int)
        perPage = request.args.get("perPage", default=5, type=int)
        totalPages = math.ceil(totalSuggestions / perPage)
        offset = ((page - 1) * perPage) if page > 0 else 0
        for suggestion in mongo.db.suggestion.find(where).sort("date", DESCENDING).skip(offset).limit(perPage):
            suggestions.append( (suggestion['profit'], suggestion['admin'], suggestion["codeStudent"], suggestion['date'], suggestion['_id'])) 
        for idProfit, idAdmin, codeStudent, date, id in suggestions:
            req = requests.get(f"{environment.API_URL}/estudiante_{codeStudent}").json()
            user = req["data"]
            student = {
                "nombre": f'{user["nombre"]} {user["apellido"]}',
                "programa": user["programa"],
                "codigo": codeStudent
            }
            profit = mongo.db.profit.find_one({"_id": idProfit}, {"_id": False})
            infoAdmin = mongo.db.administrative.find_one({"_id": idAdmin}, {"nombre":1,"apellido":1,"rol":1, "_id": False})  
            output.append({"student":student, "date":date, "_id": str(id),"profit": {**profit}, "admin":{**infoAdmin}})
        res = json_util.dumps({"data": output, "totalPages": totalPages})
        return Response(res, mimetype="applicaton/json") 
    
    def responseSuggestion(self):
        res=request.json["action"]
        data= request.json["data"]
        data = list(map(lambda id : ObjectId(id), data))
        action = True if res == "accepted" else False  
        setData = {
            "response": action
        }
        if not action:
            setData = {
                **setData,
                "state": False
            }
        try:
            mongo.db.suggestion.update_many(
            {"state": True, "_id": {"$in":data}  }, {"$set": setData})
        except:
            return response.reject("Error al intentar actulizar un sugerencia") 
        return response.success("todo ok",[],"")
           
        