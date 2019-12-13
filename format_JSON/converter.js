var fs = require( 'fs' )

const arrayJSON = fs.readdirSync( `${__dirname}/bible` )

const testIsUpperCase = ( letter ) => {
    return( letter.charCodeAt ( 0 ) >= 65 && letter.charCodeAt ( 0 ) <=90 )
    ? true 
    : letter == '.'
        ? null
        : false
}

const languageAndVersion = ( jsonFileName ) => {
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

const autoGetLanguageAndVersion = filesJson => filesJson.map( jsonFileName => languageAndVersion( jsonFileName))

const arrayLanguageVersion = autoGetLanguageAndVersion(arrayJSON);

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

for(let g = 0; g < arrayJSON.length; g++){
    
    const bLanguage = arrayLanguageVersion[g][0];
    const bVersion = arrayLanguageVersion[g][1];

    let way = setFoldersPath( )( 'books' ) (bLanguage, bVersion );
    const arrayBook =[];
    const jsCall = [];
    const jsonFile = bLanguage+bVersion;
    const getJSON = require(`${__dirname}/bible/${jsonFile}.json`);


    for ( let w = 0 ; w < getJSON.length; w++ ){
        
        let getChapter = getJSON[ w ][ 'chapters' ].map( e => e )
        const obj = new Object;    
        const book = assentRemove( getJSON[ w ].name )

        arrayBook.push( book );

        obj.language = bLanguage
        obj.version = getJSON.verson
        obj.title = getJSON[ w ].name;
        obj.abbreviation = assentRemove( getJSON[ w ].abbrev );

        w < 39
            ? obj.newTestament = false
            : obj.newTestament = true

        arrayAllBooks( getChapter, obj )

        jsCall.push( `${ book } = require( \`./_${ book }.json\` );`)

        fs.writeFile( `${ way }/_${ book }.json`, `${JSON.stringify( obj )}`, function( err ) {
            if( err ) {
                console.log( err );
            }
        });

    }

    fs.writeFile(`${way}/index.js`,`module.exports = () => {

        ${jsCall.join(`
        `)} 

        return {

            ${arrayBook}

        }

    }`, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });

    console.log(`Foi gerada a Biblía no idioma ${ bLanguage } e versão ${bVersion}`);
}