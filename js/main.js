Vue.config.devtools = true

var app = new Vue({

el: '#app',
data: {
    product: 'Friday Night Dinner - Jim & Wilson',
    image: './assets/card-example.jfif',   
    description: "Valentine's cards",
    link: 'http://www.sendtosay.com',
    selectedVariant: 0,
    onSale: true,
    details: ["Friday Night Dinner Design", "100% recyled card", "Available in all sizes", "Customisation available" ],
    variants: [
        {
            variantID: 0001,
            variantSize: "S",
            variantInventory: 0,
        },
        {
            variantID: 0002,
            variantSize: "M",
            variantInventory: 6,
        },
        {
            variantID: 0003,
            variantSize: "L",
            variantInventory: 100,
        }
    ],
    cart: 0
},
methods: {
    addToCart: function() {
        this.cart += 1
    },
    removeFromCart: function() {
        this.cart -= 1 
    },
    updateProduct: function (index) {
        this.selectedVariant = index
    }
},

computed:{
    inStock() {
        return this.variants[this.selectedVariant].variantInventory
    }
},

})