import os
try:
    from flask import Flask, send_from_directory, url_for, render_template, request
except:
    print("Во время запуска сервера не был обнаружен модуль \"flask\", сейчас он попробует установиться автоматически")
    os.system("pip install flask")
    from flask import Flask, send_from_directory, url_for, render_template, request
#load pages to RAM
def InitLoadToRam(app):
    for Name in PagesList:
        db[Name] = LoadFile(Name)
        app.add_url_rule(f"/{Name}", Name, lambda:GetPage(request.endpoint))
db = {}
def LoadFile(file):
    with open(os.getcwd()+f"\\Pages\\{file}.html", encoding="utf-8") as file:
        text = file.read()
    return text
def GetPage(PageName):
    try:
        return db[PageName]
    except:
        return "<h1>404 Page not found</h1>"
PagesList = list( map(lambda FileName: FileName.split('.')[0], os.listdir(os.getcwd() + "\\Pages")) )

#flask init
app = Flask(__name__, static_folder="", template_folder="")
@app.route('/')
def main():
    return send_from_directory(app.static_folder, 'index.html')
@app.route("/i", methods = ["POST","GET"])
def i():
    return PagesList
@app.route("/img/<path:path>")
def img(path):
    if not path in os.listdir(os.getcwd() + "\\img"): return "img not found"
    return send_from_directory(app.static_folder + "\\img", path)
@app.route("/favicon")
@app.route("/favicon.ico")
def favicon():
    return send_from_directory(app.static_folder, "favicon.ico")
if __name__ == "__main__":
    InitLoadToRam(app)
    app.run(host='0.0.0.0', port=5345)
###########################################################################
'''
@app.route('/PCOS/assets/<path:path>')
def serve_assets(path):
    return send_from_directory(app.static_folder + '/PCOS/assets', path)

@app.route('/PCOS/', defaults={'path': ''})
@app.route('/PCOS/<path:path>')
def serve_pcos_page(path):
    return send_from_directory(app.static_folder + '/PCOS', 'index.html')
'''