//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xmlHttp = new XMLHttpRequest();
const text = document.getElementById('res');


const getClass = (book,chapter,verse) =>{
    const url = `https://us-central1-webbible-kll.cloudfunctions.net/bible?book=${book}&chapter=${chapter}&verse=${verse}` 
    
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

const click = document.getElementById('button')

const clickS = ()=>{
    const book = document.getElementById('book').value;
    const chapter = document.getElementById('chapter').value;
    const verse = document.getElementById('verse').value;
    const res = getClass(book,chapter,verse)
    text.innerHTML = res
}
    