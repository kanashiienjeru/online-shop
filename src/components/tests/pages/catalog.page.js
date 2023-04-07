const Page = require('./page');

class CatalogPage extends Page {

    get addToCart () {
        return $('#addButton');
    }
    
    get openAddWindow() {
        return $('#addWindow')
    }
    get openEditWindow() {
        return $('#editWindow')
    }

    get brandSearch() {
        return $('#brandSearch')
    }

    get minPriceInput() {
        return $('#minPriceInput')
    }

    get maxPriceInput() {
        return $('#maxPriceInput')
    }


    async testClick () {
        await this.addToCart.click();
    }

    async openAddAndEditWindow () {
        await this.openAddWindow.click()
        await super.open('catalog')
        await this.openEditWindow.click()
    }

    async editFilters (textBrandSearch, minPrice, maxPrice) {
        await this.brandSearch.setValue(textBrandSearch)
        await this.minPriceInput.setValue(minPrice)
        await this.maxPriceInput.setValue(maxPrice)
    }

    open () {
        return super.open('catalog');
    }
}

module.exports = new CatalogPage();
