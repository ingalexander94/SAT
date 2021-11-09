import json
from flask_pymongo import PyMongo
mongo = PyMongo()

def createProfits():
    count = mongo.db.profit.count()
    if count == 0:
        with open("/app/backend/src/beneficios.json") as f:
            file_data = json.load(f) 
        mongo.db.profit.insert_many(file_data)   