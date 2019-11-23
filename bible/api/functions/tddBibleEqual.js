// Teste para comparar se a class está retornando o valor igual a o objeto

const Bible = require('./controller');
var assert = require( 'assert' );

const tddBile = (language,version)=>{
    bibleTDD = require(`./bible/${language}/${version}`)();
    const bible = new Bible(language, version);

    return [bibleTDD,bible];
}

const getTDD = (array, language = 'pt-br', version = 'NVI') =>{
    const bible = `tddBile(\'${language}\',\'${version}\')[1]`;
    const bibleTDD = `tddBile(\'${language}\',\'${version}\')[0]`;
    let getClass = '.get(';
    let getObject ='';

    array.forEach(element => {
        getClass += `\'${element}\',`;
        getObject += `[\'${element}\']`;
    });
    getClass += ")";
    return [eval(bible+getClass), eval(bibleTDD+getObject)];
}

const test = (array)=>{
    array.forEach(e => {
        const bibleClass = getTDD(e)[0][0]
        const bibleObject = getTDD(e)[1]
        
        assert.equal(bibleClass,bibleObject,"Bible Class são diferentes Bible Object");

    })
}


const arrayTests = [['genesis',1,1],['mateus',1,1], ['joao'],['judas',1,5]] 

test(arrayTests)
