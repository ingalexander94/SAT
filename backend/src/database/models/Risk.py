import requests
from flask import request, Response
from database import config
from util import response, environment

mongo = config.mongo

class Risk:
    def getRisks(self, code):
        if not code or not code.isdigit() or len(code) != 7:
            return response.reject("Se necesita un código de 7 caracteres")
        req = requests.get(f"{environment.API_URL}/riesgo_{code}")
        risks = req.json()
        return risks