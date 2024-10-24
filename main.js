db = {
    "inprodaction":"0.0 Введение",
    "base": "1.0 Про html"
}
let data = document.querySelector("#data")
let list = document.querySelector("#list")
function getKeyByValue(object, value) {
    return Object.entries(object).find(([key, val]) => val === value)[0];
}
function FromList(ArrayNames){
    let i = Array.from(JSON.parse(ArrayNames))
    i = i.map(El=>db[El])
    i.sort()
    let txt = "<p>Содержание</p>"
    i.forEach(Name=>{txt += `\n<a class="Link">${Name}</a>`})
    list.innerHTML = txt
    LinkNameToAction()
}
function LinkNameToAction(){
    let Data = document.querySelectorAll(".Link")
    Data.forEach(Element=>{
        Element.addEventListener("click", ()=>{LoadPage(getKeyByValue(db, Element.innerHTML))})
    })
}
let LoadPage = (path) => {
    fetch(`/${path}`)
    .then(Response=>Response.text())
    .then(text=>{data.innerHTML = text})
}
LoadPage("inprodaction")

let ArrayNames = new Array()
fetch("/i")
.then(Response=>Response.text())
.then(text=>FromList(text))
