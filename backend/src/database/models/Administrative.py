import requests, random
from flask import json, request, jsonify
from util import jwt, response, environment, emails
from database import config
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from util import jwt, environment

mongo = config.mongo

class Administrative:
    
    def register(self):
        email = request.json["correo"]
        document = request.json["documento"]
        user = mongo.db.administrative.find_one({"$or":[ {"correo":email}, {"documento":document}]})
        if user:
            return jsonify(False)
        data = request.get_json()
        password = str(random.randrange(1000, 9999))
        data["contrasena"] = generate_password_hash(password)
        data["estado"] = True
        mongo.db.administrative.insert(data)
        nombre = f"{request.json['nombre']} {request.json['apellido']}"
        rol = request.json["rol"].upper()
        message = f"Hola {nombre}, ha sido creado su cuenta para ingresar en la plataforma SAT como {rol}, por favor ingrese a su cuenta y cambie la contraseña para mayor seguridad con los siguientes datos:\nCorreo: {email}\nContraseña: {password}"
        subject = f"{nombre} se activó su cuenta en la plataforma SAT"
        emails.sendEmail(email, message, subject)
        return jsonify(True)
    
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
        
    def changePassword(self):
        password = request.json["password"]
        newPassword = request.json["newPassword"]
        id = request.json["id"]
        user = mongo.db.administrative.find_one({"_id":ObjectId(id)})
        if not user:
            return jsonify(False)
        hash = user["contrasena"]
        isValid = check_password_hash(hash, password)
        if not isValid:
            return jsonify(False)
        newPassword = generate_password_hash(newPassword)
        mongo.db.administrative.find_one_and_update({"_id": ObjectId(id)},{"$set":{"contrasena": newPassword}})
        return jsonify(True)       
       
    def sendMailRecoveryPassword(self):
        email = request.json["email"] 
        user = mongo.db.administrative.find_one({"correo":email})
        expireIn = 5
        if not user:
            return jsonify(False)
        token = jwt.generateToken(request.get_json(), expireIn)
        link = f"{environment.FRONTEND_URL}/auth/recovery_password/{token}"
        message = f"Por favor ingrese al siguiente enlace para recuperar su contraseña {link}.\nTenga en cuenta que el enlace caduca en {expireIn} minutos"
        subject = "Recuperar contraseña en la plataforma SAT"
        emails.sendEmail(email, message, subject)
        return jsonify(True)
       
    def recoveryPassword(self, email):
        newPassword = generate_password_hash(request.json["newPassword"])
        user = mongo.db.administrative.find_one_and_update({"correo":email},{"$set":{"contrasena": newPassword}})
        return jsonify(True) if user else jsonify(False)
         
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
    
    
             

        
        
        
         
