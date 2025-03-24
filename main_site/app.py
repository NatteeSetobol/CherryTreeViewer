import os
import sqlite3
import json
from flask import Flask, jsonify, send_from_directory, request

app =  Flask(__name__, static_folder='build', static_url_path='')

def Query(query, vars):
    connection = sqlite3.connect('../notes.ctb')

    cursor = connection.cursor()

    cursor.execute(query, vars)
    rows = cursor.fetchall()

    columns = [description[0] for description in cursor.description]

    results = [dict(zip(columns, row)) for row in rows]

    return results

@app.route('/')
def index():
    return send_from_directory(os.path.join(app.root_path, 'build'), 'index.html')

@app.route('/api/GetAllMainNodes')
def Get_Main_Nodes():
    results = Query("select node.name,node.node_id from node JOIN children ON node.node_id = children.node_id where children.father_id=(select node_id from children where master_id is NULL and father_id=0 LIMIT 1 ) ORDER BY node.name COLLATE NOCASE ASC", '')

    json_results = json.dumps(results, indent=4)

    return json_results

@app.route('/api/GetNode/<param>')
def Get_Node(param):
    results = Query("select node.name,node.node_id from node JOIN children ON node.node_id = children.node_id where children.father_id=? ORDER BY node.name COLLATE NOCASE ASC",(param,)) #[dict(zip(columns, row)) for row in rows]

    json_results = json.dumps(results, indent=4)

    final_json_output = {
        'data': json.loads(json_results),
        'id': param
    }

    final_json = json.dumps(final_json_output, indent=4)

    return final_json 

@app.route('/api/GetNote/<param>')
def Get_Note(param):
    results = Query("select node.txt, has_codebox from node where node.node_id=? ", (param,)) #json.dumps(results, indent=4)

    message_dump = json.dumps(results, indent=4)

    if results[0].get('has_codebox') == 1:
        codebox_results = Query("select * from codebox where node_id=? ", (param,)) #json.dumps(results, indent=4)

        codebox_dump = json.dumps(codebox_results, indent=4)

        combined_json_output = {
            'message': json.loads(message_dump),
            'codebox': json.loads(codebox_dump)
        }

        json_results = json.dumps(combined_json_output, indent=4)

    else:
        combined_json_output = {
            'message': json.loads(message_dump)
        }
        json_results = json.dumps(combined_json_output, indent=4)
    
    return json_results

@app.route('/search', methods=['POST'])
def search():
    data = request.json
    query = data.get('query')
    like_pattern = f'%{query}%'
    results = Query("select * from node where txt like ? or name like ?", (like_pattern,like_pattern)) #[dict(zip(columns, row)) for row in rows]

    json_results = json.dumps(results, indent=4)

    return json_results

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)
