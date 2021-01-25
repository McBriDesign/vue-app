Vue.config.devtools = true

var app = new Vue({

el: '#app',
data: {
    product: 'Cards',
    image: './assets/card-example.jfif',   
    description: 'birthday ting',
    link: 'http://www.sendtosay.com',
    inventory: 100,
    onSale: true,
    details: ["Friday Night Dinner Design", "100% recyled card", "Available in all sizes", "Customisation available" ]
}

})