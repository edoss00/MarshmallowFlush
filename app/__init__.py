#prepares flask
from flask import Flask
import urllib, json
app = Flask(__name__) #create instance of class Flask

#normal route
@app.route("/") #assign following fxn to run when root route requested
def helloworld():
    print(__name__) #prints in terminal
    get_globalCases()
    #get_globalCount()
    return "Hello, World." #prints on webpage

#fetch global confirmed/death/recovery data (json)
def get_globalCases():
    global_cases = [] #array storing dicts {'date': 123123, 'confirmed', 'deaths', 'recovered'}
    #read from api
    url = "https://pomber.github.io/covid19/timeseries.json"
    response = urllib.urlopen(url)
    data = json.loads(response.read())

    #global_cases = data["Afghanistan"]

    #print(data["Afghanistan"][0])
    for country in data:
        for date in data[country]:
            added = False
            for stored_date in global_cases:
                #print(stored_date)
                #print(date)
                if stored_date["date"] == date["date"]:
                    added = True #no need to add this date as new dict to global_cases
                    stored_date["confirmed"] += date["confirmed"]
                    stored_date["deaths"] += date["deaths"]
                    stored_date["recovered"] += date["recovered"]
            if not added:
                global_cases.append(date)
    print(global_cases[0:10])
    return global_cases


def get_globalCount():
    url = "https://api.covid19api.com/summary"
    response = urllib.urlopen(url)
    data = json.loads(response.read())

    print(type(data))
    return data

#main
if __name__ == "__main__":
    app.debug = True
    app.run()
