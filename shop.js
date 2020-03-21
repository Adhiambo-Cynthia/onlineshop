Vue.component('productprof',{
    template:`
    <div class="product">
         <div class="product-image">
             <img v-bind:src="image">
         </div>
         <div class="product-info">
            <h2 v-html="productname"></h2>
            <p :class='{notStock:!inStock, inStock:inStock}'>{{determineStock}}</p>
            <!-- <p v-if="inStock">In Stock</p>-->
            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>
            
            <h4>Current colors in Stock</h4>
            <div id="colors">
                <ul>
                    <li v-for="(variant,index) in variants" :key="variant.id" :style="{backgroundColor:variant.color}" @mouseover="updateProduct(index)">{{variant.color}}</li>
                </ul>
            <h4>Current sizes in Stock</h4>
            <ul>
                <li v-for="size in sizes">{{size}}</li>
            </ul>
            </div>
            <button id="add" @click="addtocart" :disabled="!inStock" :class="{disabledbutn:!inStock}">ADD TO CART</button>
            <button @click="removefromcart" :disabled="!inStock" :class="{disabledbutn:!inStock}">REMOVE FROM CART</button>
        </div>
     </div>`,
     data(){
         return{
            productname: "Nike running Shoes",
            // image: 'img/black.JPG',
            selectedVariant:0,
            inStock: true,
            
            // lineThrough:'line-through',
            details:["Gender-neutral","40% cotton","Thick rubber sole","Gym and track exercising","multiple colors"],
            variants:[
                { id: 11, color:"black", shoeimage:'img/black.JPG',inventory:100},
                { id:22, color:"pink",shoeimage:'img/pink.JPG',inventory:10 },
                { id:33, color:"red",shoeimage:'img/red.JPG',inventory:0}
            ],
            sizes:[8,9.10,11,12],
              
         }
     },
     methods:{
        addtocart: function(){
            this.$emit('adding-cart', this.variants[this.selectedVariant].id)
        },
        removefromcart: function(){
            this.$emit('removing-cart', this.variants[this.selectedVariant].id)
        },
        updateProduct: function(index){
            this.selectedVariant= index

        }
    },
    computed:{
        determineStock: function(){
            var stock= this.variants[this.selectedVariant].inventory
            if (stock>10){
                this.inStock=true
            return "In Stock"}
            else if (stock=== 0){
                this.inStock=false 
                return 'Sold Out!!'}
            else{this.inStock=true
                return'Almost Sold out!'}
        },
        image(){
         return this.variants[this.selectedVariant].shoeimage
        }
    }
}

)
var app= new Vue({
    el: "#app",
     data:{
        cart: []
     },
    methods:{
        updateCart(id){
            this.cart.push(id)},
        reupdateCart(id){ //i is the indexing[1] or[2
        // var i=this.cart.length-1
        // if (this.cart[i]===id){this.cart.splice(i,1)} removes but only in order and one by one, the for loop enables it to rerun until all are removed
            for(var i = this.cart.length - 1; i >= 0; i--) {
              if (this.cart[i] === id) {
                 this.cart.splice(i, 1);
              }
            }
          } 
        
    }})
//     data:{
//         product: "Nike running Shoes",
//         // image: 'img/black.JPG',
//         selectedVariant:0,
//         inStock: true,
        
//         // lineThrough:'line-through',
//         details:["Gender-neutral","40% cotton","Thick rubber sole","Gym and track exercising","multiple colors"],
//         variants:[
//             { id: 1, color:"black", shoeimage:'img/black.JPG',inventory:100},
//             { id:2, color:"pink",shoeimage:'img/pink.JPG',inventory:10 },
//             { id:3, color:"red",shoeimage:'img/red.JPG',inventory:0}
//         ],
//         sizes:[8,9.10,11,12],
//         cart: 0
//     },
//     methods:{
//         addtocart: function(){
//             this.cart +=1
//         },
//         updateProduct: function(index){
//             this.selectedVariant= index

//         }
//     },
//     computed:{
//         determineStock: function(){
//             var stock= this.variants[this.selectedVariant].inventory
//             if (stock>10){
//                 this.inStock=true
//             return "In Stock"}
//             else if (stock=== 0){
//                 this.inStock=false 
//                 return 'Sold Out!!'}
//             else{this.inStock=true
//                 return'Almost Sold out!'}
//         },
//         image(){
//          return this.variants[this.selectedVariant].shoeimage
//         }
//     }
// })
