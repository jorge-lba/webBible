const Bible = require('./controller');

const bible = (language, version)=>{
    const bible = new Bible(language, version);
    return bible;
}

console.log(bible().get())