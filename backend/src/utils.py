from flask import request, jsonify
import firebase_admin
from firebase_admin import auth


def verify_firebase_token(f):
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 400
        token = token.split(' ').pop()
        try:
            decoded_token = auth.verify_id_token(token)
            request.user = decoded_token
            return f(*args, **kwargs)
        except firebase_admin.exceptions.FirebaseError:
            return jsonify({'error': 'Invalid token'}), 401
    return wrapper
