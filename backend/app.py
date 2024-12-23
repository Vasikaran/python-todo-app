from flask import Flask, jsonify, Response, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials
import os

app = Flask(__name__)
CORS(app)

cert_path = os.path.join(os.path.dirname(__file__), 'serviceAccountKey.json')
cred = credentials.Certificate(cert_path)
firebase_admin.initialize_app(cred)

from src.routes import main_bp
app.register_blueprint(main_bp)

@app.errorhandler(400)
def bad_request(error):
    return jsonify({"error": "Bad request", "message": str(error)}), 400

@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({"error": "Internal server error", "message": str(error)}), 500

@app.before_request
def basic_authentication():
    if request.method.lower() == 'options':
        return Response()

if __name__ == '__main__':
    app.run(debug=True)
