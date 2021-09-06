
from flask import request, Response
from database import config
from bson import json_util
from util import response

mongo = config.mongo

class Role:
    
    def createRole(self):
        data = request.get_json()
        role = mongo.db.role.find_one({"role": data["role"]})
        if role:
          return response.reject("El rol ya existe")
        newrole = mongo.db.role.insert_one(data).inserted_id
        return response.success("todo ok",{"_id":str(newrole), "role":data["role"]},"") 
    
    def listRoles(self):
        roles =mongo.db.role.find()
        res= json_util.dumps(roles)
        return Response(res, mimetype="applicaton/json")
        
        
      
      
    
