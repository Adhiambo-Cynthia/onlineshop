var app= new Vue({
    el: "#app",
    data:{
        product: "Nike running Shoes",
        image: 'img/black.JPG',
        inStock: false,
        inventory:10,
        lineThrough:'line-through',
        details:["Gender-neutral","40% cotton","Thick rubber sole","Gym and track exercising","multiple colors"],
        variants:[{
            id: 1, color:"black", shoeimage:'img/black.JPG'
        },{
            id:2, color:"pink",shoeimage:'img/pink.JPG'
        },{
            id:3, color:"red",shoeimage:'img/red.JPG'
        }],
        sizes:[8,9.10,11,12],
        cart: 0
    },
    methods:{
        addtocart: function(){
            this.cart +=1
        },
        updateimage: function(shoeimage){
            this.image= shoeimage

        }


    }
})