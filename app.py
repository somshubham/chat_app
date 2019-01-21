from flask import Flask, flash, redirect, render_template, request, session, abort
import os
from os import path
from uuid import getnode as get_mac
from firebase import firebase
import json

app = Flask(__name__)

# @app.route('/<name>')
# def hello_name(name):
#     return "Hello {}!".format(name)

@app.route("/top_tweets")
def top_tweets():
    return render_template('index.html')

@app.route("/admin")
def admin():
    return render_template('admin.html')

@app.route("/chat")
def chat2():
    mac = get_mac()
    print('------------------')
    print(mac)
    print("userInfo['img']")
    # print(userInfo['img'])
    print("userInfo['img']")
    print('------------------')
    return render_template('chat2.html', mac_id=mac)
    # return render_template('chat2.html')

@app.route('/')
def home(userInfo=None):
    if userInfo:
        print(type(userInfo))
        print(userInfo['uid'])

    print("session.get('logged_in')")
    print(session.get('logged_in'))
    print("session.get('logged_in')")
    if not session.get('logged_in'):
        return render_template('login.html')
    else:
        mac = get_mac()
        print('------------------')
        print(mac)
        print("userInfo['img']")
        # print(userInfo['img'])
        print("userInfo['img']")
        print('------------------')
        return render_template('chat2.html', mac_id=mac, img="userInfo['img']", username="userInfo['displayName']" )
        # return "Hello Boss!  <a href='/logout'>Logout</a>"

@app.route('/login', methods=['POST'])
def do_admin_login():
    print('request')
    # print(parse_arg_from_requests('data'))
    print(request.form['user'])
    print(request.form['email'])
    print(request.form['displayName'])
    print(request.form['img'])
    print('request')
    session['logged_in'] = True
    user = {
        'uid': request.form['user'],
        'email': request.form['email'],
        'displayName': request.form['displayName'],
        'img': request.form['img']
    }
    # user = json.dumps(user)
    # print(user)
    # if request.form['password'] == 'password' and request.form['username'] == 'admin':
    #     session['logged_in'] = True
    # else:
    #     flash('wrong password!')
    return home(user)

@app.route("/logout")
def logout():
    session['logged_in'] = False
    return home()

if __name__ == '__main__':
    app.secret_key = os.urandom(12)
    app.run(debug=True, host='0.0.0.0', port=9988)