#prepares flask
from flask import Flask,render_template
app = Flask(__name__) #create instance of class Flask

#normal route
@app.route("/") #assign following fxn to run when root route requested
def helloworld():
    print(__name__) #prints in terminal
    return "Hello, World." #prints on webpage

@app.route("/simulation")
def sim():
    return render_template("simulation.html")

#main
if __name__ == "__main__":
    app.debug = True
    app.run()
