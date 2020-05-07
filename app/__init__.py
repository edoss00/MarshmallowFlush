#prepares flask
from flask import Flask, render_template, request
from datetime import datetime
import urllib, json, csv
from urllib.request import urlopen
app = Flask(__name__) #create instance of class Flask

#normal route
@app.route("/") #assign following fxn to run when root route requested
def home():
    #get_globalCases()
    #get_globalCountData()
    #get_StatesData()
    country = "all"
    title = "Global"
    if "choosen_country" in request.args.keys():
        country = request.args["choosen_country"]
        title = request.args["choosen_country"]
    country_list = get_countries()
    # print(get_countryCase(country))
    return render_template( 'index.html', total = get_totalGlobalCases(), title = title, data = get_countryCase(country), countrylist = country_list)

def maps():
    return render_template( 'maps.html', world = get_globalCases(), states  = get_StatesData())

#returns a list of all the countries
def get_countries():
    world_data = get_globalCases()
    c = []
    for country in world_data:
        c.append(country[0])
    return c

#returns all the data by country requested
def get_countryCase(c):
    world_data = get_globalCases()
    if c == "all":
        i = 1
        data = []
        # print(world_data[0])
        while i < len(world_data[0]):
            # print(world_data[0][i]['date'])
            date = world_data[0][i]['date']
            confirmed = 0
            deaths = 0
            recovered = 0
            j = 0
            while j < len(world_data):
                confirmed += world_data[j][i]['confirmed']
                deaths += world_data[j][i]['deaths']
                recovered += world_data[j][i]['recovered']
                j += 1
            data.append({'date':date,'confirmed':confirmed,'deaths':deaths,'recovered':recovered})
            i += 1
        return data
    else:
        for country in world_data:
            if country[0] == c:
                return country[1:]

#returns an int with the total number of coronavisur cases so far
def get_totalGlobalCases():
    world_data = get_globalCases()
    # print(world_data)
    confirmed = 0
    for country in world_data:
        confirmed += country[-1]['confirmed']
    return confirmed

#fetch global confirmed/death/recovery data by date
def get_globalCases():
    global_cases = [] #array storing dicts {'date': 123123, 'confirmed', 'deaths', 'recovered'}
    #read from api
    url = "https://pomber.github.io/covid19/timeseries.json"
    response = urlopen(url)
    data = json.loads(response.read())

    #global_cases = data["Afghanistan"]

    #print(data["Afghanistan"][0])
    for country in data:
        c = [country]
        for date in data[country]:
            # print(date)
            # added = False
            #go through each date already in dict, append country's data to existing data for that date
            # for stored_date in global_cases:
                #print(stored_date)
                #print(date)
            #     if stored_date["date"] == date["date"]:
            #         added = True #no need to add this date as new dict to global_cases
            #         stored_date["confirmed"] += date["confirmed"]
            #         stored_date["deaths"] += date["deaths"]
            #         stored_date["recovered"] += date["recovered"]
            # #create new dictionary for date in global_cases if one wasn't found
            # if not added:
            # print([country,date])
            c.append(date)
        global_cases.append(c)
    # print(global_cases[0:10])
    return global_cases

#returns dictionary containing different state counts (new confirmed, total confirmed, total deaths, etc.)
#format: [[date,statename,newcases,newdeaths]]
def get_globalCountData():
    url = "https://api.covid19api.com/summary"
    response = urlopen(url)
    data = json.loads(response.read())
    # print(type(data))
    # print(data["Global"])
    return data["Global"]

#returns array of most recent numbers of active cases by state
#first index of array represeents the date for the data (csv is a few days behind)
def get_StatesData():
    out = [] #array of arrays
    data = []
    today = datetime.today().strftime('%Y-%m-%d')
    # print(today)
    with open("data/us-states.csv") as csvfile:
        csvdata = csv.reader(csvfile, delimiter=',')
        # print(csvdata)
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
