from flask import Flask, send_from_directory, url_for, render_template, request
import os

db = {}

def LoadFile(file):

    with open(os.getcwd()+f"\\Pages\\{file}.html", encoding="utf-8") as file:
        text = file.read()
    return text

def GetPage(PageName):
    return db[PageName]

app = Flask(__name__, static_folder="", template_folder="")

PagesList = list(
    map(
        lambda FileName: FileName.split('.')[0],
        os.listdir("C:\\CodeMaster\\VVS\\Pages")
    )
)

for Name in PagesList:
    db[Name] = LoadFile(Name)
    app.add_url_rule(f"/{Name}", Name, lambda:GetPage(request.endpoint))

@app.route('/')
def main():
    return send_from_directory(app.static_folder, 'index.html')

@app.route("/i", methods = ["POST","GET"])
def i():
    return PagesList

'''
@app.route("/inprodaction", methods = ["GET", "POST"])
def Inprodaction():
    return LoadFile("inprodaction")
'''
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5345)
'''
@app.route('/PCOS/assets/<path:path>')
def serve_assets(path):
    return send_from_directory(app.static_folder + '/PCOS/assets', path)

@app.route('/PCOS/', defaults={'path': ''})
@app.route('/PCOS/<path:path>')
def serve_pcos_page(path):
    return send_from_directory(app.static_folder + '/PCOS', 'index.html')
'''