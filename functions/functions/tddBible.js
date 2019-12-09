const Bible = require('./controller');
var assert = require( 'assert' );

const bible = (language, version) =>{
    const bible = new Bible(language, version);
    return bible;
}

const arrayTest = [['GêNesiS',1,1],['genesis',1,54645],['genesis',6546545,1],['genesis'],[1],['']];



const tdd = ()=>{

    arrayTest.forEach(array => {
        let [test] = bible().get(array[0],array[1],array[2]);

        if(test == null){
            test =  'Value Null'
        }else{
            test = typeof test
        }

    
        assert.equal(test,'object' ,"Bible Class são diferentes Bible Object");
        
    })

    console.log('Nenhum erro encontrado');
}

tdd();