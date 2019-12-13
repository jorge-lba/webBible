var fs = require( 'fs' )


const testIsUpperCase = ( letter ) => {
    return( letter.charCodeAt ( 0 ) >= 65 && letter.charCodeAt ( 0 ) <=90 )
    ? true 
    : letter == '.'
    ? null
        : false
    }
    
const getLanguageAndVersion = ( jsonFileName ) => {
    jsonFileName = jsonFileName.split( '' )
    
    let language = ''
    let version = ''
    let isVersion = false

    jsonFileName.forEach( letter => {
        
        const isUpperCase = testIsUpperCase( letter )
        
        isUpperCase == false ?  { } : isVersion = isUpperCase
        
        if( isVersion == false ) language += letter
        if( isVersion ) version += letter 
        
    })
    
    return [ language, version ]
}


const assentRemove = ( text ) =>{   
    
    text = text.toString().toLowerCase(); 
    
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');

    return text.replace(' ','').replace(' ', '').replace('1','I').replace('2','II').replace('3','III');  
    
};

const arrayAllBooks = ( value, obj ) => {
    
    const fullArray = [ ];
    
    for(let i = 0; i < value.length; i++){
        const print2 = value[ i ].map(e => e)
        fullArray[ i ] = print2;
        obj[i+1] = {};
        
        print2.forEach((element, index) => {
            obj[i+1][index+1] = element    
        });
        
    }
    
}

const setFoldersPath = ( sourcePath = __dirname) => ( ...newFolders ) => ( language, version ) => {
    newFolders.push(language)
    newFolders.push(version)
    
    for(let a = 0; a < newFolders.length; a++){
        
        sourcePath += `/${newFolders[a]}`
        
        if(!fs.existsSync(sourcePath)) fs.mkdirSync(sourcePath)
        
    }
    
    return sourcePath
}

const createIndexJS = ( folderPath, constRequires, arrayBooks) => {
    fs.writeFile( `${folderPath}/index.js`, `module.exports = ( ) => {
        ${constRequires.join(`
        `)}
        
        return {
            ${arrayBooks}
        }
        
    }`, function( err ) {
        err ? console.log( err ) : console.log( "The file was saved!" )
    })
}

const setObjectData = ( language, json, index) => {
    const object = new Object

    object.language =language
    object.version = json.verson
    object.title = json[ index ].name;
    object.abbreviation = assentRemove( json[ index ].abbrev );

    index < 39
        ? object.newTestament = false
        : object.newTestament = true

    return object
}

const mapChapters = json => json.chapters.map(chapter => chapter) 

const requireFormat = book => `${ book } = require( \`./_${ book }.json\` )`

const writeFileBook = ( folderPath, bookName, contentObject) => {
    
    fs.writeFile( `${ folderPath }/_${ bookName }.json`, `${JSON.stringify( contentObject )}`, function( err ) {
        if( err ) {
            console.log( err );
        }
    })
}

const arrayJSON = fs.readdirSync( `${__dirname}/bible` )
const arrayLanguageVersion = arrayJSON.map( jsonFileName => getLanguageAndVersion( jsonFileName))


for(let g = 0; g < arrayJSON.length; g++){
    
    const [ bLanguage, bVersion] = arrayLanguageVersion[g]
    
    const way = setFoldersPath( )( 'books' ) (bLanguage, bVersion );
    const arrayBook =[]
    const jsCall = []
    const jsonFile = bLanguage+bVersion
    const getJSON = require(`${__dirname}/bible/${jsonFile}.json`)
    
    
    for ( let index = 0 ; index < getJSON.length; index++ ){
        
        const chapters = mapChapters( getJSON[ index ] )
        const objectBook = setObjectData( bLanguage, getJSON, index )    
        const bookName = assentRemove( getJSON[ index ].name )

        arrayBook.push( bookName );
        
        jsCall.push( requireFormat( bookName ) )

        arrayAllBooks( chapters, objectBook )

        writeFileBook( way, book, objectBook )


    }

    createIndexJS( way, jsCall, arrayBook )

    console.log(`Foi gerada a Biblía no idioma ${ bLanguage } e versão ${bVersion}`);
}