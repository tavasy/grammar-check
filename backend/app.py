# backend/app.py
from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# LanguageTool API URL
LANGUAGE_TOOL_API_URL = "https://api.languagetool.org/v2/check"

@app.route("/grammar-check", methods=["POST"])
def grammar_check():
    data = request.get_json()
    text_to_check = data.get("text")
    
    # Prepare data for LanguageTool API request
    payload = {
        'text': text_to_check,
        'language': 'en-US'  # Specify language (US English here)
    }
    
    # Send request to LanguageTool API
    response = requests.post(LANGUAGE_TOOL_API_URL, data=payload)
    
    if response.status_code == 200:
        # Return API response to frontend
        return jsonify(response.json())
    else:
        return jsonify({"error": "Something went wrong"}), 500

if __name__ == "__main__":
    app.run(debug=True)
