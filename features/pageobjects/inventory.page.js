const { $, $$ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InventoryPage extends Page {
    /**
     * define selectors using getter methods
     */
    get pageLabel () {
        return $('.title');
    }

    get shoppingCart () {
        return $('#shopping_cart_container');
    }

    get products () {
        return $$('.inventory_item');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('inventory.html');
    }
}

module.exports = new InventoryPage();
