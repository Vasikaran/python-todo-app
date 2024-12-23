from .todos import todos_routes
from flask import Blueprint

# Initialize the main blueprint for the app
main_bp = Blueprint('main', __name__)

# Import the routes from todos.py and other route files

# Register the todos blueprint with the main blueprint
main_bp.register_blueprint(todos_routes, url_prefix='/todos')
