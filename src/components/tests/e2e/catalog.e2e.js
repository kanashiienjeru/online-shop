const { screen } = require('@testing-library/react')
const CatalogPage = require('../pages/catalog.page')

describe('add to cart testing', () => {
    it('testclick', async () => {
        await CatalogPage.open()
        await CatalogPage.testClick()
    })

    it('open admin panel', async () => {
        await CatalogPage.open()
        await CatalogPage.openAddAndEditWindow()
    })

    it('edit filters', async () => {
        await CatalogPage.open()
        await CatalogPage.editFilters('privet', '50', '15')
        expect(CatalogPage.brandSearch.value).not.toBeNull()
    })
})


