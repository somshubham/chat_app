from flask import Flask, flash, redirect, render_template, request, session, abort
import os
from os import path
from uuid import getnode as get_mac

app = Flask(__name__)

# @app.route('/<name>')
# def hello_name(name):
#     return "Hello {}!".format(name)

@app.route("/top_tweets")
def top_tweets():
    return render_template('index.html')


@app.route("/chat1")
def chat2():
    return render_template('chat.html')

@app.route("/login")
def login():
    return render_template('login.html')

@app.route('/')
def home():
    if not session.get('logged_in'):
        return render_template('login.html')
    else:
        mac = get_mac()
        print(mac)
        return render_template('chat2.html', mac_id=mac)
        # return "Hello Boss!  <a href='/logout'>Logout</a>"

@app.route('/login', methods=['POST'])
def do_admin_login():
    if request.form['password'] == 'password' and request.form['username'] == 'admin':
        session['logged_in'] = True
    else:
        flash('wrong password!')
    return home()

@app.route("/logout")
def logout():
    session['logged_in'] = False
    return home()

if __name__ == '__main__':
    app.secret_key = os.urandom(12)
    app.run(port=9988)