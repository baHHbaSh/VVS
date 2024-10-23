let data = document.querySelector("#data")
let list = document.querySelector("#list")
function FromList(ArrayNames){
    let i = Array.from(JSON.parse(ArrayNames))
    let txt = "<p>Содержание</p>"
    i.forEach(Name=>{txt += `\n<a class="Link">${Name}</a>`})
    list.innerHTML = txt
    LinkNameToAction()
}
function LinkNameToAction(){
    let Data = document.querySelectorAll(".Link")
    Data.forEach(Element=>{
        Element.addEventListener("click", ()=>{LoadPage(Element.innerHTML)})
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
