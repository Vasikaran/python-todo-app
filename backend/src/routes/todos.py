from flask import Blueprint, request, jsonify
from firebase_admin import firestore
from src.utils import verify_firebase_token
from flask_cors import cross_origin

todos_routes = Blueprint('todos', __name__)

db = firestore.client()


@todos_routes.route('', methods=['GET'], endpoint='get_todos')
@verify_firebase_token
def get_todos():
    try:
        user = request.user
        user_ref = db.collection('users').document(user.get('uid'))
        todos_ref = user_ref.collection('todos')
        todos = [todo.to_dict() for todo in todos_ref.stream()]
        return jsonify({'todos': todos}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@todos_routes.route('', methods=['POST', 'OPTIONS'], endpoint='add_todo')
@verify_firebase_token
def add_todo():
    try:
        data = request.json
        user = request.user
        user_ref = db.collection('users').document(user.get('uid'))
        todo_ref = user_ref.collection('todos').document()
        title = data.get('title')
        if not title:
            return jsonify({'error': 'Title is required!'}), 400
        todo_ref.set({
            'id': todo_ref.id,
            'title': data.get('title'),
            'completed': data.get('completed', False),
            'description': data.get('description', ''),
            'created_at': firestore.SERVER_TIMESTAMP,
            'updated_at': firestore.SERVER_TIMESTAMP,
            'priority': data.get('priority', 'low'),
        })
        todo = todo_ref.get().to_dict()
        return jsonify(todo), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@todos_routes.route('/<todo_id>', methods=['OPTIONS', 'POST'], endpoint='update_todo')
@verify_firebase_token
@cross_origin()
def update_todo(todo_id):
    try:
        data = request.json
        user = request.user
        user_ref = db.collection('users').document(user.get('uid'))
        todo_ref = user_ref.collection('todos').document(todo_id)
        todo_ref.update({
            'title': data.get('title'),
            'completed': data.get('completed'),
            'description': data.get('description'),
            'updated_at': firestore.SERVER_TIMESTAMP,
            'priority': data.get('priority', 'low'),
        })
        todo = todo_ref.get().to_dict()
        return jsonify(todo), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@todos_routes.route('/<todo_id>', methods=['OPTIONS', 'DELETE'], endpoint='delete_todo')
@verify_firebase_token
@cross_origin()
def delete_todo(todo_id):
    try:
        user = request.user
        user_ref = db.collection('users').document(user.get('uid'))
        todo_ref = user_ref.collection('todos').document(todo_id)
        todo_ref.delete()
        return jsonify({'message': 'Todo deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@todos_routes.route('/search', methods=['GET'], endpoint='search_todos')
@verify_firebase_token
def search_todos():
    try:
        search_query = request.args.get('query', None)

        if not search_query:
            return jsonify([]), 200

        user = request.user
        user_ref = db.collection('users').document(user.get('uid'))

        todos_ref = user_ref.collection('todos')

        query = todos_ref.where('title', '>=', search_query).where(
            'title', '<=', search_query + '\uf8ff')

        todos_title = query.stream()

        todos_list = []
        for todo in todos_title:
            todo_data = todo.to_dict()
            todo_data['id'] = todo.id
            todos_list.append(todo_data)

        return jsonify(todos_list), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
