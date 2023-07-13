"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, send_from_directory

app = Flask(__name__)

static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), "..","app", "dist")

@app.route("/")
@app.route('/<path:path>', methods =["GET"])
def serve_any_other_file(path="index.html"):
    response = send_from_directory(static_file_dir, path)
    return response    


if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 3000))
    app.run(host="0.0.0.0", port=PORT, debug=True)