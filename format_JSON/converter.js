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

const arrayAllBookContent = ( value ) => {
    const obj = new Object

    const fullArray = [ ];
    
    for(let i = 0; i < value.length; i++){
        const print2 = value[ i ].map(e => e)
        fullArray[ i ] = print2;
        obj[i+1] = {};
        
        print2.forEach((element, index) => {
            obj[i+1][index+1] = element    
        });
        
    }
    
    return obj
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

const createFileBook = ( folderPath, bookName, contentObject) => {
    
    fs.writeFile( `${ folderPath }/_${ bookName }.json`, `${JSON.stringify( contentObject )}`, function( err ) {
        if( err ) {
            console.log( err );
        }
    })
}
const creatingFiles = ( folderPath, json, language ) => {

    json.forEach( ( value, index ) => {
        const chapters = mapChapters( value )
        const objectBook = Object.assign( setObjectData( language, json, index ), arrayAllBookContent( chapters ) )    
        const bookName = assentRemove( value.name )

        createFileBook( folderPath, bookName, objectBook )
    })
}

const returnArrayBooksAndRequire = json => {
    const booksNames = [ ]
    const arryRequire = [ ]

    json.forEach( value => {
        booksNames.push( assentRemove( value.name ) )
        arryRequire.push( requireFormat( assentRemove( value.name ) ))
    })

    return [ booksNames, arryRequire ]
}

const arrayJSON = fs.readdirSync( `${__dirname}/bible` )
const arrayLanguageVersion = arrayJSON.map( jsonFileName => getLanguageAndVersion( jsonFileName))

arrayJSON.forEach( ( value, index ) => {

    const [ bLanguage, bVersion] = arrayLanguageVersion[index]
    const folderPath = setFoldersPath( )( 'books' ) (bLanguage, bVersion );
    const jsonFile = bLanguage+bVersion
    const getJSON = require(`${__dirname}/bible/${jsonFile}.json`)
  
    creatingFiles( folderPath, getJSON, bLanguage )
  
    const [ booksNames, arryRequire ] = returnArrayBooksAndRequire( getJSON );

    createIndexJS( folderPath, arryRequire, booksNames )

    console.log(`Foi gerada a Biblía no idioma ${ bLanguage } e versão ${bVersion}`);

})

// for(let g = 0; g < arrayJSON.length; g++){
    
//     const [ bLanguage, bVersion] = arrayLanguageVersion[g]
//     const folderPath = setFoldersPath( )( 'books' ) (bLanguage, bVersion );
//     const jsonFile = bLanguage+bVersion
//     const getJSON = require(`${__dirname}/bible/${jsonFile}.json`)
  
//     creatingFiles( folderPath, getJSON )
  
//     const [ booksNames, arryRequire ] = returnArrayBooksAndRequire( getJSON );

//     createIndexJS( folderPath, arryRequire, booksNames )

//     console.log(`Foi gerada a Biblía no idioma ${ bLanguage } e versão ${bVersion}`);
// }