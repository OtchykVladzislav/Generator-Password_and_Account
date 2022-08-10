import { addDataDB } from "./logicDB"
import { idUser } from "./logicMain"

var upperSigns = 0;
var lowerSigns = 0;
var numberSigns = 0
var punctSigns = 0;
var lenghtPass;
var bans;
//base
var letters = "qwertyuiopasdfghjklzxcvbnm".split("")
var numbers = "1234567890".split("")
var punct = "`#%^&$*(){}\/-+.,'<>?!~:;_[]".split("")
//password
var password;

//html
document.getElementById("nextOne").addEventListener("click", () => {
    document.getElementById("start").style.display = "none"
    document.getElementById("chance").style.display = "flex"
})

document.getElementById("nextTwo").addEventListener("click", () => {
    document.getElementById("chance").style.display = "none"
    document.getElementById("polsunok").style.display = "flex"
    document.getElementById("sizePassword").innerText = document.getElementById("changeSize").value
    checkBans()
})

document.getElementById("nextThree").addEventListener("click", () => {
    document.getElementById("polsunok").style.display = "none"
    document.getElementById("result").style.display = "flex"
    lenghtPass = document.getElementById("changeSize").value
    createPassword()
})

document.getElementById("save").addEventListener("click", () => {
    document.getElementById("result").style.display = "none"
    document.getElementById("saveResult").style.display = "flex"
    idUser === "visitor" ? document.getElementById("saveInBase").style.display = "none" : document.getElementById("saveInBase").style.display = "flex" 
})

document.getElementById("saveInFile").addEventListener("click", () => {
    let name = document.getElementById("nameService").value
    addDataFilePass([
        {
            'nameService' : name,
            'password' : password.join(""),
            'user': idUser
        }
    ])
    document.getElementById("saveResult").style.display = "none"
    document.getElementById("updatePass").style.display = "flex"
})

document.getElementById("saveInBase").addEventListener("click", () => {
    let name = document.getElementById("nameService").value
    addDataDB({
        'nameService' : name,
        'password' : password.join(""),
        'userId': idUser
    }, 'passwordService')
    document.getElementById("saveResult").style.display = "none"
    document.getElementById("updatePass").style.display = "flex"
})

document.getElementById("backStart").addEventListener("click", () => {
    document.getElementById("start").style.display = "flex"
    document.getElementById("chance").style.display = "none"
})

document.getElementById("backOne").addEventListener("click", () => {
    document.getElementById("chance").style.display = "flex"
    document.getElementById("polsunok").style.display = "none"
})

document.getElementById("backTwo").addEventListener("click", () => {
    document.getElementById("polsunok").style.display = "flex"
    document.getElementById("result").style.display = "none"
})

document.getElementById("backThree").addEventListener("click", () => {
    document.getElementById("result").style.display = "flex"
    document.getElementById("saveResult").style.display = "none"
})

document.getElementById("changeSize").addEventListener("input", (e) => {
    document.getElementById("sizePassword").innerText = e.target.value
})

document.getElementById("upper").addEventListener("click", (e) => {
    e.target.classList.toggle("active")
    upperSigns === 0 ? upperSigns = 1 : upperSigns = 0
})

document.getElementById("lower").addEventListener("click", (e) => {
    e.target.classList.toggle("active")
    lowerSigns === 0 ? lowerSigns = 1 : lowerSigns = 0
})

document.getElementById("number").addEventListener("click", (e) => {
    e.target.classList.toggle("active")
    numberSigns === 0 ? numberSigns = 1 : numberSigns = 0
})

document.getElementById("punct").addEventListener("click", (e) => {
    e.target.classList.toggle("active")
    punctSigns === 0 ? punctSigns = 1 : punctSigns = 0
})

document.getElementById("replace").addEventListener("click", () => {
    createPassword()
})

document.getElementById("createAgain").addEventListener("click", () => {
    document.getElementById("updatePass").style.display = "none"
    document.getElementById("start").style.display = "flex"
})

function createPassword(){
    password = []
    punct.push('"')
    let randomTypeSigns;
    for(let i = 0; i < lenghtPass; i++){
        randomTypeSigns = randomValue(bans.length);
        if(bans[randomTypeSigns] === "upperSigns"){
            password.push(letters[randomValue(letters.length)].toUpperCase())
        }
        else if(bans[randomTypeSigns] === "lowerSigns"){
            password.push(letters[randomValue(letters.length)])
        }
        else if(bans[randomTypeSigns] === "numberSigns"){
            password.push(numbers[randomValue(numbers.length)])
        }
        else if(bans[randomTypeSigns] === "punctSigns"){
            password.push(punct[randomValue(punct.length)])
        }
    }
    document.getElementById("password").innerText = password.join("")
}

function checkBans(){
    bans = []
    if(upperSigns === 0){
        bans.push("upperSigns")
    }
    
    if(lowerSigns === 0){
        bans.push("lowerSigns")
    }
    
    if(numberSigns === 0){
        bans.push("numberSigns")
    }
    
    if(punctSigns === 0){
        bans.push("punctSigns")
    }

}

function randomValue(max){
    return Math.floor(Math.random() * max);
}

export function addDataFilePass(array) {
    console.log(array)
    fetch('http://localhost:3000/addInfo', {
        method: 'POST',
        body: JSON.stringify(array),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.blob())
    .then(res => {
        downloadFile(res)
    })
    .catch(err => {
        console.log(`Error: ${err}`)
    })
}

function downloadFile(file){
    let href = URL.createObjectURL(file)
    const a = Object.assign(document.createElement('a'), {
        href,
        style: "display: none",
        download: "data.txt"
    })
    document.body.appendChild(a)

    a.click()
    a.remove()
    URL.revokeObjectURL(href)
}