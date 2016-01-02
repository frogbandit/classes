from flask import Flask, jsonify, render_template, request, json
import requests, random

app = Flask(__name__)

app.config['DEBUG'] = True 

@app.route("/", methods=["GET", "POST"])
def index():
 
    return render_template("index.html", api_data='')
   

if __name__ == '__main__':
	app.run(host='0.0.0.0')