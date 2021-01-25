Vue.config.devtools = true

var app = new Vue({

el: '#app',
data: {
    product: 'Cards',
    image: './assets/card-example.jfif',   
    description: 'birthday ting',
    link: 'http://www.sendtosay.com',
    inventory: -1,
    onSale: true,
    details: ["Friday Night Dinner Design", "100% recyled card", "Available in all sizes", "Customisation available" ],
    variants: [
        {
            variantID: 0001,
            variantSize: "Small",
            variantInventory: 0,
        },
        {
            variantID: 0002,
            variantSize: "Medium",
            variantInventory: 6,
        },
        {
            variantID: 0003,
            variantSize: "Large",
            variantInventory: 100,
        }
    ],
    cart: 0
},
methods: {
    addToCart: function() {
        this.cart += 1
        
    },

    updateProduct: function (variantInventory) {
        this.inventory = variantInventory
    }
}

})