import requests
from flask import json, request
from util import jwt, response, environment

class Administrative:
    
    def login(self): 
        info = request.get_json()
        document = info["document"]
        role = info["role"]
        endpoint =  f"{role}_{document}"
        try:
            req = requests.get(f"{environment.API_URL}/{endpoint}")
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
        
    def getByCode(self, code):
        if(not code or not code.isdigit() or len(code) < 7):
            return response.error("Se necesita un código de 7 caracteres", 400)
        try:
            req = requests.get(f"{environment.API_URL}/vicerrector_{code}")
            data = req.json()
            if(data["ok"]):
                user = data["data"]
                del user["contrasena"]
                return response.success("Todo Ok!", user, "")
            else: 
                return response.error("No se encontraron resultados", 400)
        except:
          return response.success("No se encontraron resultados", None, "")   
        
    def getFaculties(self): 
        req = requests.get(f"{environment.API_URL}/facultades")
        data = req.json()
        return response.success("Todo ok!", data, "")
    
    def validateProgram(self, nameProgram):
        req = requests.get(f"{environment.API_URL}/facultades")
        data = req.json()
        for i in data: 
            for  j in i["programas"]:            
                if j == nameProgram:  
                    return json.dumps(True)
        return json.dumps(False)
        
             

        
        
        
         
