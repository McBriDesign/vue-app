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

        <div class="product-reviews">
            <h3>Reviews</h3>
            <p v-if="!reviews.length">There are no reviews.</p>
            <ul>
                <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>Location: {{ review.name }}</p>
                    <p>Review: {{ review.review }}</p>
                    <p>Rating: {{ review.rating }}</p>
                </li>
            </ul>

        </div>

        <product-review @review-submitted="addReview"></product-review>

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
        ],
        reviews: [],
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
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
    },
    computed:{
        inStock() {
            return this.variants[this.selectedVariant].variantInventory
        }
    }
})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

        <b v-if="errors.length">Please enter details in all required fields:</b>
        <ul>
        <li v-for="error in errors">{{ error }}</li>
        </ul>
    
        <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
        </p>

        <p>
        <label for="location">Location:</label>
        <input id="location" v-model="location">
        </p>

        <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
        <label for="rating">Rating:</label>
        <select id=rating v-model.number=rating>
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
        </p>

        <p>
        <input type="submit" value="send it">
        </p>

    </form>
    `,
    data() {
        return {
            name: null,
            location: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit(){
            if (this.name && this.location && this.review && this.rating) {

                let productReview = {
                    name: this.name,
                    location: this.location,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.location = null
                this.review = null
                this.rating = null
            }
            else {
                if(!this.name) this.errors.push("Name Required.")
                if(!this.location) this.errors.push("Location Required.")
                if(!this.review) this.errors.push("Review Required.")
                if(!this.rating) this.errors.push("Rating Required.")
            }
            
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

