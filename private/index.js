//import { get } from "http";

//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xmlHttp = new XMLHttpRequest();
const text = document.getElementById('content');



const getBible = (book, chapter, verse) =>{
    const url = `https://us-central1-webbible-kll.cloudfunctions.net/bible?book=${book}&chapter=${chapter}&verse=${verse}` 

    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}

const books = (value) => {
    const book = getBible(...value);
    return  Object.values(book[0])
}



function myFunction(event) { 
    const tag = document.getElementById(event.target.id)
    selectValue(tag);
}

const selectValue = (tag) =>{
    tag.onchange = function(){
    
        const value = []        
        let tagName = tag.id;
        
        if(tagName == "books"){
            tagName = "chapters"
            value[0] = document.getElementById('books').value
        }else if(tagName == "chapters"){
            tagName = "verses"
            value[0] = document.getElementById('books').value
            value[1] = document.getElementById('chapters').value
        }

        const bible = getBible(...value)[0].result;
        delete bible.language
        delete bible.title
        delete bible.abbreviation
        delete bible.newTestament
    
        whiteOpitons(tagName,Object.keys(bible));
    };

}

const whiteOpitons = (id, arrayValue) =>{
    const dcTag = document.getElementById(id);
    dcTag.innerHTML = '';

    const fristElement = document.createElement('option')
    fristElement.innerHTML = 'selecione...'
    dcTag.appendChild(fristElement);

    arrayValue.map((e,i)=>{
        const newElement = document.createElement('option');
        newElement.innerHTML = e;
        dcTag.appendChild(newElement);
    })
}

whiteOpitons('books',books('bible'));


const click = document.getElementById('button')

const clickS = ()=>{
    const book = document.getElementById('books');
    const bookData = book.options[book.selectedIndex].value;
    
    const chapter = document.getElementById('chapters');
    const chapterData = chapter.options[chapter.selectedIndex].value;

    const verse = document.getElementById('verses');
    const verseData = verse.options[verse.selectedIndex].value;

    const res = getBible(bookData,chapterData,verseData)
    console.log(bookData, chapterData,verseData)

    text.innerHTML = JSON.stringify(res)
}
    