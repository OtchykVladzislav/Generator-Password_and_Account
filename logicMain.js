import {addDataDB, readDataDB, dataUserDB, dataPassDB, authData} from "./logicDB"
import {addDataFilePass} from "./logicGenerate"

var userData = {}
var sortArr;

document.getElementById("saveInBase").addEventListener("click", () => {
    sortPass(idUser)
})

document.getElementById("loadAllPass").addEventListener("click", () => {
    addDataFilePass(sortArr)
})

document.getElementById("googleAuthLog").addEventListener("click", () => {
    accountLog()
    authData()
})

document.getElementById("saveInBase").addEventListener("click", () => {
    readDataDB('passwordService')
    sortPass(userData.id)
})

document.getElementById("logIn").addEventListener("click", () => {
    document.getElementById("modal").classList.toggle("shadow")
    document.getElementById("formLog").style.display = "flex"
    document.getElementById("formReg").style.display = "none"
    readDataDB('user')
    readDataDB('passwordService')
})

document.getElementById("signUp").addEventListener("click", () => {
    document.getElementById("modal").classList.toggle("shadow")
    document.getElementById("formLog").style.display = "none"
    document.getElementById("formReg").style.display = "flex"
})

document.getElementById("logOut").addEventListener("click", () => {
    idUser = "visitor"
    document.getElementById("checkBlock").style.display = "none"
    document.getElementById("nameUser").style.display = "none"
    document.getElementById("logOut").style.display = "none"
    document.getElementById("signUp").style.display = "flex"
    document.getElementById("logIn").style.display = "flex"
})

document.getElementById("modal").addEventListener("click", (e) => {
    e.target.classList.toggle("shadow")
})


document.getElementById("login").addEventListener("submit", (e) => {
    e.preventDefault()
    onSubmit("login")
})

document.getElementById("signup").addEventListener("submit", (e) => {
    e.preventDefault()
    onSubmit("sign")
})

function onSubmit(action){
    let formDate;
    if(action === "login"){
        formDate = readDataForm("loginLog","passLog")
        dataUserDB.forEach((elem) => {
            if((elem["password"] === formDate["password"]) && (elem["nickname"] === formDate["nickname"])){
                idUser = elem["id"]
                userData = {
                    id: elem.id,
                    nickname: elem.nickname,
                    password: elem.password
                }
                document.getElementById("nameUser").innerText = userData.nickname
                accountLog()
            }
        })
    }
    else{
        formDate = readDataForm("loginSign","passSign")
        addDataDB(formDate, 'user')
        clearDataForm("loginSign","passSign")
        document.getElementById("modal").classList.toggle("shadow")
        dinamicWindow("Вы успешно зарегистрировались. Войдите в аккаунт.")
    }

}

function sortPass(id){
    sortArr = []
    dataPassDB.forEach((elem) => {
        if(id === elem.id){
            sortArr.push(elem)
        }
    })
    createTable(sortArr)
}


function accountLog(){
    clearDataForm("loginLog","passLog")
    document.getElementById("modal").classList.toggle("shadow")
    document.getElementById("checkBlock").style.display = "flex"
    document.getElementById("nameUser").style.display = "flex"
    document.getElementById("logOut").style.display = "flex"
    document.getElementById("signUp").style.display = "none"
    document.getElementById("logIn").style.display = "none"
    sortPass(userData.id)
}


function readDataForm(name,pass){
    let date = {}
    date["service"] = 'project'
    date["nickname"] = document.getElementById(name).value
    date["password"] = document.getElementById(pass).value
    return date  
}

function clearDataForm(name,pass){
    document.getElementById(name).value = ""
    document.getElementById(pass).value = ""
}

function createTable(array){
    document.getElementById("resultTable").innerHTML = ""
    if(array.length === 0){
        document.getElementById("resultTable").innerHTML = "Пусто"
    }
    for(let i = 0; i < array.length; i++){
        let elem = array[i]
        createLine("resultTable", elem, "lineInfo")
    }
}

function createLine(div, elem, str){
    let block = document.getElementById(div)
    let line = document.createElement("div")
    line.className = str
    line.innerHTML= `<span class="nameService">${elem["nameService"]}</span><span class="passService">${elem["password"]}</span>`
    block.appendChild(line)
}

function dinamicWindow(str){
    document.getElementById("notice").innerText = str
    document.getElementById("notice").classList.toggle("action")
    setTimeout(() => document.getElementById("notice").classList.toggle("action"), 2000)
}

export var idUser = "visitor"
