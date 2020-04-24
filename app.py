#prepares flask
from flask import Flask
app = Flask(__name__) #create instance of class Flask

#normal route
@app.route("/") #assign following fxn to run when root route requested
def helloworld():
    print(__name__) #prints in terminal
    return "Hello, World." #prints on webpage

#main
if __name__ == "__main__":
    app.debug = True
    app.run()
