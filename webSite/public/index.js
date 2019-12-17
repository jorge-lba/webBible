//import { get } from "http";

//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const divContent = document.getElementById('content');
const _book =  document.getElementById('books');
const _chapter = document.getElementById('chapters');
const _verse = document.getElementById('verses');




const getBible = (book, chapter, verse) =>{
    const xmlHttp = new XMLHttpRequest();
    const url = `https://us-central1-webbible-kll.cloudfunctions.net/bible?book=${book}&chapter=${chapter}&verse=${verse}`
    let  myArr ='';
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myArr = JSON.parse(this.responseText);
        }
    };

    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send();
    
    return myArr

}

const books = (value) => {
    const book = getBible(...value);
    return  Object.values(book[0]);
}

function myFunction(event) { 
    const tag = document.getElementById(event.target.id)
    selectValue(tag);

}

const selectValue = (tag) =>{
    tag.onchange = function(){
        callNewOptions(tag.id);        
    };
}
const callNewOptions = (idName) =>{
    const value = [];
    let tagName =idName;
    if(tagName == "books"){
        tagName = "chapters";
        value[0] = _book.value;
    }else if(tagName == "chapters"){
        tagName = "verses";
        value[0] = _book.value;
        value[1] = _chapter.value;
    }else {return}

    const bible = getBible(...value)[0].result;
    delete bible.language;
    delete bible.title;
    delete bible.abbreviation;
    delete bible.newTestament;

    whiteOpitons(tagName,Object.keys(bible));
}

const whiteOpitons = (id, arrayValue) =>{
    const dcTag = document.getElementById(id);
    dcTag.innerHTML = '';

    if(id == "verses") optionsCustom('---',dcTag);
    

    arrayValue.map((e,i)=>{
        const newElement = document.createElement('option');
        newElement.innerHTML = e;
        dcTag.appendChild(newElement);
    })

    //if(id == "chapters")optionsCustom('All',dcTag);
    
    callNewOptions(id);
}

const optionsCustom = (value,element) =>{
    const newElementB = document.createElement('option');
    newElementB.innerHTML = value;
    element.appendChild(newElementB);
}

whiteOpitons('books',books('bible'));

const createH2Chapter = (number) => `<h2>Capítulo ${number}</h2>`
const createDivVerse = (content) => {
    const versesNumbers = Object.keys(content)
    return versesNumbers.map((verseNumber, index)=>`<div class="verse ${verseNumber}">${verseNumber}. ${content[index+1]}</div>`)
            .reduce((contentHTML, contentVerse) => contentHTML+contentVerse)

}

const ridingHTML = (chapterNumber, verseNumber, objectContent) =>{
    return isNaN(verseNumber)
    ? createH2Chapter(chapterNumber) + createDivVerse(objectContent)
    : createH2Chapter(chapterNumber) + `<div class="verse ${verseNumber}">${verseNumber}. ${objectContent}</div>`
}

const click = document.getElementById('button');
const clickS = ()=>{

    const getSelect = document.getElementsByTagName('select');
    const idSelect = [...getSelect].map(element => {
        return element.id;       
    });
    
    const sectaa = [...idSelect].map(e => selectOptions(e));
    [book,chapter,verse] = sectaa;

    const res = getBible(book,chapter,verse);
    const obj = res[0].result

    isNaN(verse) ? {} : {}

    console.log(createDivVerse(obj))
    divContent.innerHTML = ridingHTML(chapter, verse, obj) ;   
}

const selectOptions = (value)=>{
    const element = document.getElementById(value);
    return element.options[element.selectedIndex].value;
    
}
  