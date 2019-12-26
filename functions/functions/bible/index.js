const fs = require('fs');

const returns = (index)=>{
    const returns = ['[language,arrayVersion[0]]', '[language,arrayVersion[1]]','[\'pt-br\', \'NVI\']','language, version']
    return returns[index]
}
const idValid = (array,value) => {
    return array.map(e=>{
        if(e == value)return true;   
            return false
    }).reduce((e,a) => e || a);
}

module.exports = (language, version) => {
    const array =  fs.readdirSync(__dirname);
    const remove = array.indexOf('index.js');
    array.splice(remove,1)
    
    const lValid = idValid(array, language);

    if(lValid){
        const [...arrayVersion] = fs.readdirSync(__dirname +'/'+language);
        if(!version){
            return eval(returns(0))
        }else{
            const vValid = idValid(arrayVersion, version)
            if(vValid)return eval(returns(3))
               if(language == 'pt-br') return eval(returns(1))
                    return eval(returns(0))
        }
    }else{
        return returns(2)
    }

}
