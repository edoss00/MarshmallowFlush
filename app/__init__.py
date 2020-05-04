#prepares flask
from flask import Flask
import urllib, json
app = Flask(__name__) #create instance of class Flask

#normal route
@app.route("/") #assign following fxn to run when root route requested
def helloworld():
    print(__name__) #prints in terminal
    get_globalCases()
    get_globalCountData()
    return "Hello, World." #prints on webpage

#fetch global confirmed/death/recovery data by date
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
            #go through each date already in dict, append country's data to existing data for that date
            for stored_date in global_cases:
                #print(stored_date)
                #print(date)
                if stored_date["date"] == date["date"]:
                    added = True #no need to add this date as new dict to global_cases
                    stored_date["confirmed"] += date["confirmed"]
                    stored_date["deaths"] += date["deaths"]
                    stored_date["recovered"] += date["recovered"]
            #create new dictionary for date in global_cases if one wasn't found
            if not added:
                global_cases.append(date)
    print(global_cases[0:10])
    return global_cases

#returns dictionary containing different global counts (new confirmed, total confirmed, total deaths, etc.)
def get_globalCountData():
    url = "https://api.covid19api.com/summary"
    response = urllib.urlopen(url)
    data = json.loads(response.read())
    # print(type(data))
    print(data["Global"])
    return data["Global"]

#main
if __name__ == "__main__":
    app.debug = True
    app.run()
