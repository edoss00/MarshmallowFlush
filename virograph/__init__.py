#prepares flask
from flask import Flask, render_template, request
from datetime import datetime
import urllib, json, csv
from urllib.request import urlopen
import getdata as gd

app = Flask(__name__) #create instance of class Flask

#normal route
@app.route("/") #assign following fxn to run when root route requested
def home():
    #get_globalCases()
    #get_globalCountData()
    #get_StatesData()
    if "choosen_country" in request.args.keys():
        country = request.args["choosen_country"]
        title = request.args["choosen_country"]
    else:
        country = "All"
        title = "Global"
    country_list = gd.get_countries()
    # print(country)
    # print(get_countryCase(country))
    return render_template( 'index.html', total = gd.get_totalGlobalCases(), title = title, data = gd.get_countryCase(country), countrylist = country_list)

@app.route("/usmap")
def usmap():
    return render_template( 'maps.html', title="New Deaths in the US",
                                         states  = gd.get_StatesData(), statejson = gd.get_statesjson(),
                                         counties = gd.get_CountiesData(), countyjson = gd.get_countiesjson())

@app.route("/worldmap")
def worldmap():
    return render_template( 'maps.html', title="New Deaths in the World",
                                        world = gd.get_newCountryCases(), worldjson = gd.get_worldjson())


@app.route("/simulation")
def sim():
    return render_template("simulation.html")

#main
if __name__ == "__main__":
    app.debug = True
    app.run()
