Vue.config.devtools = true

Vue.component('product', {

    template: `
    <div class="product">
                
        <div class="product-img">
            <a :href="link">
                <img :src="image">
            </a>
        </div>

        <div class="product-info">
            <h3> {{ product }} </h3>
            <h5> {{ description }} </h5>
                                
            <span v-if="onSale">ON SALE NOW</span>

            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div v-for="(variant, index) in variants"
                :key="variant.variantID"
                class="size-option">

                <p @click="updateProduct(index)">{{ variant.variantSize }}</p>
            </div>

            <p v-if="!inStock">Out of Stock!</p>
            <p v-else>In Stock</p>

            <button v-on:click="addToCart"
                :disabled="!inStock"
                class="btn--primary"
                :class="{ disabledButton: !inStock }">Add to Cart</button>

            <button @click="removeFromCart"
                :disabled="!inStock"
                class="btn--secondary"
                :class="{ disabledButton: !inStock }">
                Remove from Cart</button>


        </div>

    </div>
    `,

    data() {
        return {
        
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
                variantID: 45452,
                variantSize: "M",
                variantInventory: 6,
            },
            {
                variantID: 0003,
                variantSize: "L",
                variantInventory: 100,
            }
        ]
        }
    },

    methods: {
        addToCart: function() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantID)
        },
        removeFromCart: function() {
            this.$emit('remove-from-cart') 
        },
        updateProduct: function (index) {
            this.selectedVariant = index
        }
    },
    computed:{
        inStock() {
            return this.variants[this.selectedVariant].variantInventory
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        cart: [],
    },
    methods:{
        addCart(id) {
            this.cart.push(id)
        },
        removeCart(id) {
            this.cart.pop(id)
        }
    }
})

