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
    
    def getStatisticsTotal(self):
        data = request.get_json()
        if "global" in data:
            return self.calculateTotalRisk("facultad")     
        if "program" in data:
            program = request.json["program"]
            isPeriod = True if "period" in data else False
            period = f"_{request.json['period']}" if isPeriod else ""
            endpoint = f"{program}{period}"
            endpoint = "sistemas" if not isPeriod else "sistemas_2021_1"
            return self.calculateTotalRisk(endpoint)        
        code = request.json["code"] 
        group = request.json["group"]
        return self.calculateTotalRisk(f"{code}_{group}")
    
    def calculateTotalRisk(self, endpoint):
        output = []
        critical = len(requests.get(f"{environment.API_URL}/critico_{endpoint}").json())
        mild = len(requests.get(f"{environment.API_URL}/leve_{endpoint}").json())
        moderate = len(requests.get(f"{environment.API_URL}/moderado_{endpoint}").json())
        output = [ 
                  {"type": "Leve", "total": mild}, 
                  {"type": "Moderado", "total": moderate}, 
                  {"type": "Crítico", "total": critical}, 
                  ]
        return response.success("todo ok!", output, "")
        