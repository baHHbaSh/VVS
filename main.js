db = {
    "inprodaction":"0.0 Введение",
    "base": "1.0 Про html",
    "h": "1.1 Заголовки",
    "p": "1.2 Параграфы",
    "div": "1.3 Контейнеры",
    "button":"1.4 Кнопки",
    "input": "1.5 Поля ввода",
    "cssbase": "2.0 Про css",
    "cssselector": "2.1 css селекторы",
    "csscolor": "2.2 css цвета",
    "flex": "2.3 display (flex)",
    "align": "2.4 Привязки текста и элементов"
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
    let txt = '<div style="align-items: center;"><img src="logo.png" class="logo"/></div><p>Содержание</p>'
    i.forEach(Name=>{txt += `\n<a class="Link">${Name}</a>`})
    list.innerHTML = txt
    LinkNameToAction()
}

function LinkNameToAction(){
    let Data = document.querySelectorAll(".Link")
    Data.forEach(Element=>{
        try{
            let name = db[Element.innerHTML]
            Element.innerHTML = name != undefined ? name: Element.innerHTML
        }catch{}
        Element.addEventListener("click", ()=>{LoadPage(getKeyByValue(db, Element.innerHTML)); localStorage.setItem("last",getKeyByValue(db, Element.innerHTML))})
    })
}

let LoadPage = (path) => {
    fetch(`/${path}`)
    .then(Response=>Response.text())
    .then(text=>{data.innerHTML = text; LinkNameToAction(); ReplaceDataInCode()})
}

let LastPage = localStorage.getItem("last")
LoadPage(LastPage != null? LastPage:"inprodaction")

function LoadInner(){
    let ArrayNames = new Array()
    fetch("/i")
    .then(Response=>Response.text())
    .then(text=>FromList(text))
}
LoadInner()

function ReplaceDataInCode(){
    let Elements = document.querySelectorAll(".code")
    Elements.forEach(El => {
        let NewText = ""
        Array.from(El.innerHTML).forEach(Symb=>{
            console.log(Symb)
            switch(Symb){
                case("<"):
                    Symb = '<span class="r">&lt;'
                    break;
                case(">"):
                    Symb = "&gt;</span>"
                    break;
                case("\""):
                    Symb = "<span class=\"y\">\"</span>"
                    break;
            }
            NewText += Symb
        })
        NewText = NewText.replace("\n", "\n")
        El.innerHTML = NewText
    })
    let par = document.querySelectorAll("p")
    par.forEach(el=>{
        el.innerHTML = el.innerHTML.replace("&lt;", "<b class=\"bg\">&lt;").replace("&gt;", "&gt;</b>")
    })
}