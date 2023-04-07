const Page = require('./page');

class ProductPage extends Page {

    get plus () {
        return $('#plus')
    }

    get minus() {
        return $('#minus')
    }

    get count() {
        return $('#count')
    }

    async countPlus (value) {
        for (let i=0; i < value; i++) {
            this.plus.click()
        }
    }

    async countMinus (value) {
        for (let i=0; i < value; i++) {
            this.minus.click()
        }
    }

    open (id) {
        return super.open(`catalog/${id}`);
    }
}

module.exports = new ProductPage();
