import requests
from flask import request
from util import jwt, response, environment, helpers
from database import config

mongo = config.mongo


class Institutional:
    def login(self):
        info = request.get_json()
        code = info["code"]
        role = info["role"]
        endpoint = f"{role}_{code}"
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

    def getByCode(self, code, role):
        if not code or not code.isdigit() or len(code) != 7:
            return response.reject("Se necesita un código de 7 caracteres")
        try:
            req = requests.get(f"{environment.API_URL}/{role}_{code}")
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
            req = requests.get(f"{environment.API_URL}/materias_{code}")
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

        req = requests.get(f"{environment.API_URL}/cursos_{code}")
        courses = req.json()
        # Borrar el docente
        return response.success("Todo ok!", courses, "")

    def getStudentsOfCourse(self, code, group):
        if not code or not code.isdigit() or len(code) != 7:
            return response.reject("Se necesita un código de 7 caracteres")
        try:
            req = requests.get(f"{environment.API_URL}/listado_{code}_{group}")
            students = req.json()
            if students:
                return response.success("Todo ok!", students, "")
            else:
                return response.reject("Esta dirección  no es válida")
        except:
            return response.reject("Esta dirección  no es válida")

    def getProfits(self, code, risk):
        if not code or not code.isdigit() or len(code) != 7:
            return response.error("Se necesita un código de 7 caracteres", 400)
        req = requests.get(f"{environment.API_URL}/beneficios_{code}")
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
        req = requests.get(f"{environment.API_URL}/beneficios_{code}")
        data = list(req.json())
        profits = list(filter(lambda profit: not profit["fechaFinal"], data))
        profits = list(map(lambda profit : profit["nombre"], profits))
        profitsDB = list(mongo.db.profit.find({"riesgo": risk}, {"nombre": 1, "_id": False}))
        data = list(map(lambda profit : {"nombre": profit["nombre"], "state": profit["nombre"] in profits}, profitsDB))
        return response.success("Todo ok!", data, "")

    def studentsOfPeriod(self):
        data = request.get_json()
        program = "sistemas"
        period = "2021-1"
        split = period.split("-")
        year = split[0]
        semester = split[1]
        students = requests.get(f"{environment.API_URL}/{program}_{year}_{semester}")
        data = students.json()
        return response.success("todo ok!", data, "")

    def getSemesters(self, code):
        if not code or len(code) != 7 or not code.isdigit():
            return response.error("Se necesita un código de 7 caracteres", 400)
        res = requests.get(f"{environment.API_URL}/semestres_{code}")
        data = res.json()
        data = helpers.updateSemestersRegistered(data)
        dataRes = {"data": data, "registered": helpers.countSemesters(data)}
        return response.success("Todo Ok!", dataRes, "")
