// Teste para comparar se a class está retornando o valor igual a o objeto

const Bible = require('./controller');
var assert = require( 'assert' );

const tddBile = (language,version)=>{
    const bibleTDD = require(`./bible/${language}/${version}`)();
    const bible = new Bible(language);

    return [bibleTDD,bible];
}

const getTDD = (array, language = 'pt-br', version = 'NVI') =>{
    const bible = eval(`tddBile(\'${language}\',\'${version}\')`);
    
    let getObject ='';
    
    array.forEach(element => {
        getObject += `[\'${element}\']`;
    });
    const bibleObj = eval('bible[0]'+ getObject)
    const bibleClass = eval('bible[1]["all"]'+getObject)
    
    let teste = eval(bible)

    return [bibleObj, bibleClass];
}

const test = (array)=>{

    array.forEach(e => {
        const bible = getTDD(e)
        assert.equal(bible[0].value, bible[1].value,"Bible Class são diferentes Bible Object");
    })
    return 'Teste concluido com Sucesso!';
}


const arrayTests = [['genesis',1,1],['mateus',1,1], ['joao'],['judas',1,5]] 

console.log(test(arrayTests))