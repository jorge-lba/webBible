module.exports = class Bible{
    constructor(language = 'pt-br', version = 'NVI'){
        this.all = require(`../bible/${language}/${version}`);
        this.objectName = 'this.all';
    }
}
