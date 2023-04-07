const ProductPage = require('../pages/product.page')

describe('add to cart testing', () => {
    it('editCount', async () => {
        const plusValue = 10;
        const minusValue = 2;
        await ProductPage.open(5)
        await ProductPage.countPlus(plusValue)
        await ProductPage.countMinus(minusValue)
        expect(ProductPage.count).not.toBeFalsy()
    })
})


