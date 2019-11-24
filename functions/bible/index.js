const fs = require('fs');

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
            return [language, arrayVersion[0]]
        }else{
            const vValid = idValid(arrayVersion, version)
            if(vValid)return [language,version]
               if(language == 'pt-br') return [language, arrayVersion[1]]
                    return [language, arrayVersion[0]]
        }
    }else{
        return ['pt-br', 'NVI']
    }

}
