from flask import request, jsonify
import firebase_admin
from firebase_admin import auth

# Decorator to verify Firebase ID token
def verify_firebase_token(f):
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')  # Get the token from Authorization header
        if not token:
            return jsonify({'error': 'Token is missing'}), 400
        token = token.split(' ').pop()  # Remove "Bearer" prefix if present

        try:
            decoded_token = auth.verify_id_token(token)  # Verify the token
            request.user = decoded_token  # Store the decoded token in the request
            return f(*args, **kwargs)
        except firebase_admin.exceptions.FirebaseError:
            return jsonify({'error': 'Invalid token'}), 401  # Unauthorized if token is invalid
    return wrapper
