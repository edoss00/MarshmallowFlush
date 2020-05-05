#prepares flask
from flask import Flask
from datetime import datetime
import urllib, json, csv
app = Flask(__name__) #create instance of class Flask

#normal route
@app.route("/") #assign following fxn to run when root route requested
def helloworld():
    print(__name__) #prints in terminal
    #get_globalCases()
    #get_globalCountData()
    get_StatesData()
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
#format: [[date,statename,newcases,newdeaths]]
def get_globalCountData():
    url = "https://api.covid19api.com/summary"
    response = urllib.urlopen(url)
    data = json.loads(response.read())
    # print(type(data))
    print(data["Global"])
    return data["Global"]

#returns array of most recent numbers of active cases by state
#first index of array represeents the date for the data (csv is a few days behind)
def get_StatesData():
    out = [] #array of arrays
    data = []
    today = datetime.today().strftime('%Y-%m-%d')
    print(today)
    with open("data/us-states.csv") as csvfile:
        csvdata = csv.reader(csvfile, delimiter=',')
        print(csvdata)
        #convert csvreader to array
        for row in csvdata:
            data.append(row)
        #most recent date = the one at the bottom
        date = data[-1][0]
        yesterday = data[-56][0]
        #how many states/territories are included for this date (for indexing)
        rows = int(data[-1][2])
        print(date, yesterday)
        out.append(date)

        #print(data[100])
        #go through data finding rows that match the date
        for idx in range(len(data)):
            if data[idx][0] == date:
                #print(int(data[idx-rows+1][3]))
                #subtract todays data from yesterday's to get # new cases/deaths
                temp = [date, data[idx][1], int(data[idx][3]) - int(data[idx-rows+1][3]), int(data[idx][4]) - int(data[idx-rows+1][4]) ]
                out.append(temp)

    #print(out)
    return out



#main
if __name__ == "__main__":
    app.debug = True
    app.run()
