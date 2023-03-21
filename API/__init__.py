from flask import Flask, jsonify, request
import hashlib
import sqlite3

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False


def hash_password(password):
    """Hashes the given password using SHA256"""
    hash_object = hashlib.sha256(password.encode('utf-8'))
    return hash_object.hexdigest()


@app.route('/user', methods=['POST'])
def create_user():
    """Create a new user"""
    name = request.json.get('name')
    password = request.json.get('password')
    if not name or not password:
        return jsonify({'error': 'name and password are required'}), 400

    # Hash the password before storing it
    hashed_password = hash_password(password)

    # Insert the new user into the database
    conn = sqlite3.connect('rest.db')
    c = conn.cursor()
    c.execute('INSERT INTO user (name, password) VALUES (?, ?)', (name, hashed_password))
    conn.commit()
    conn.close()

    return jsonify({'message': f'User {name} created'}), 201


@app.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get a user by ID"""
    conn = sqlite3.connect('rest.db')
    c = conn.cursor()
    c.execute('SELECT name FROM user WHERE id=?', (user_id,))
    row = c.fetchone()
    conn.close()

    if row is None:
        return jsonify({'error': f'User with ID {user_id} not found'}), 404

    name = row[0]
    return jsonify({'id': user_id, 'name': name}), 200


@app.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """Update a user"""
    name = request.json.get('name')
    password = request.json.get('password')
    if not name and not password:
        return jsonify({'error': 'name and/or password are required'}), 400

    # Hash the password before storing it
    hashed_password = hash_password(password) if password else None

    # Update the user in the database
    conn = sqlite3.connect('rest.db')
    c = conn.cursor()
    if name and hashed_password:
        c.execute('UPDATE user SET name=?, password=? WHERE id=?', (name, hashed_password, user_id))
    elif name:
        c.execute('UPDATE user SET name=? WHERE id=?', (name, user_id))
    else:
        c.execute('UPDATE user SET password=? WHERE id=?', (hashed_password, user_id))
    conn.commit()
    conn.close()

    return jsonify({'message': f'User {user_id} updated'}), 200


@app.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """Delete a user"""
    conn = sqlite3.connect('rest.db')
    c = conn.cursor()
    c.execute('DELETE FROM user WHERE id=?', (user_id,))
    conn.commit()
    conn.close()

    return jsonify({'message': f'User {user_id} deleted'}), 200


if __name__ == '__main__':
    app.run(debug=True)
    

