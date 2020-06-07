var validators = require('../validators');

function CAA(flag, tag, value) {
	this.flag = flag;
	this.tag = tag;
	this.value = value;
        this._type = 'CAA';
}
module.exports = CAA;


CAA.prototype.valid = function CAA() {
        var self = this, model = {};
        model = {
                target: validators.Int8,
                tag: validators._nsText,
                value: validators._nsTextNoLength
        };
        return validators.validate(self, model);
};
