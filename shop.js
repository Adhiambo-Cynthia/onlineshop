var eventBus= new Vue()
Vue.component('productprof',{
    props:['product'],
    template:`
    <div class="product">
         <div class="product-image">
             <img v-bind:src="image">
         </div>
         <div class="product-info">
            <h2>{{product.productname}}</h2>
            <p :class='{notStock:!inStock, inStock:inStock}'>{{determineStock}}</p>
            <!-- <p v-if="inStock">In Stock</p>-->
            <ul>
                <li v-for="detail in product.details">{{detail}}</li>
            </ul>
            
            <h4>Current colors in Stock</h4>
            <div id="colors">
                <ul>
                    <li v-for="(variant,index) in product.variants" :key="variant.id" :style="{backgroundColor:variant.color}" @mouseover="updateProduct(index)">{{variant.color}}</li>
                </ul>
            <h4>Current sizes in Stock</h4>
            <ul>
                <li v-for="size in sizes">{{size}}</li>
            </ul>
            </div>
            <button id="add" @click="addtocart" :disabled="!inStock" :class="{disabledbutn:!inStock}">ADD TO CART</button>
            <button @click="removefromcart" :disabled="!inStock" :class="{disabledbutn:!inStock}">REMOVE FROM CART</button>
        </div>
        
        
       <product-tabs></product-tabs>
        
        
        
     </div>`,
     data(){
         return{
            selectedVariant:0,
            inStock: true,
            inLine:'inline',
            
            // lineThrough:'line-through',
            
            
            sizes:[8,9.10,11,12],
            checked: false,
            reviews:[] 
        
       
         }
     },
     methods:{
        addtocart: function(){
            this.$emit('adding-cart', this.product.variants[this.selectedVariant].id)
        },
        removefromcart: function(){
            this.$emit('removing-cart', this.product.variants[this.selectedVariant].id)
        },
        updateProduct: function(index){
            this.selectedVariant= index},
        
            

        
        
    },
    computed:{
        determineStock: function(){
            var stock= this.product.variants[this.selectedVariant].inventory
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
         return this.product.variants[this.selectedVariant].shoeimage
        }
    
    }
    
}

)
Vue.component('product-review',{
    template:`
    
    <form class="product-review" @submit.prevent="onSubmit">
    <p v-if="errors.length" id="errors">
    <ul>
    <li v-for="error in errors">{{error}}</li>
    </ul>
    </p>
    <p>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    <p>
      Recommend product?<br>
      
      <label for="yes">Yes</label>
      <input type="radio" id="recommendY" v-model="recommend" class="radio" value="yes"> 
      <label for="no">No</label>
      <input type="radio" id="recommendN" v-model="recommend" class="radio" value="no"> 
          
      
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>
  `
  ,
  data(){
      return{
          name:null,
          review:null,
          rating:null,
          recommend:null,
          errors:[]
      }
  },
  methods:{
      onSubmit(){
          if(this.name && this.review && this.rating && this.recommend){
        var productReview={
            name:this.name,
            review:this.review,
            rating:this.rating,
            recommend:this.recommend
        } 
        // eventBus.$emit('review-submitted',productReview) 
        this.$emit('review-submitted',productReview)
        this.name=null,
        this.review=null,
        this.rating=null,
        this.recommend=null
      }
      else{
          if(!this.name){this.errors.push("Name required")}
          else if(!this.review){this.errors.push("review needed")}
          else{this.errors.push("ratings required")}
      }
    }


  }
}) 
Vue.component('product-tabs',{
    
    template:`
    <div>
    <span class="tab" :class="{activeTab:selectedTab === tab}"
    v-for="(tab,index) in tabs"
     @click="selectedTab=tab">{{tab}}</span>

     <div id="comments" v-show="selectedTab==='Reviews'">
        <h3>Reviews</h3>
        <p v-if="!reviews.length" >No reviews yet!</p>
        <ul >
        <li v-for="(review,index) in reviews" :key="index">
         <p id="display" >{{review.name}}<br>Review: {{review.review}}<br>Recommend: {{review.recommend}}<br>Rating: {{review.rating}}</p>
         
         </li>
        </ul>
        </div>
        <product-review @review-submitted="addReview"  v-show="selectedTab==='Make Review'"></product-review>
    </div>`,
    data(){
        return{
            tabs:['Reviews',"Make Review"],
            selectedTab: 'Reviews',
            reviews:[]
        }
    },
    methods:{
        // mounted(){
        //     eventBus.$on('review-submitted', productReview =>{
        //         this.reviews.push(productReview)
        //        })}
        //when communicating between parent and child...dont use eventbus
        addReview(productReview){
            this.reviews.push(productReview)  
        }
    }
})
var app= new Vue({
    el: "#app",
     data:{
        cart: [],
        products:[
            {proID:1, productname:'Nike running shoes',
             details:["Gender-neutral","40% cotton","Thick rubber sole","Gym and track exercising","multiple colors"],
             variants:[
                { id: 10, color:"black", shoeimage:'img/black.JPG',inventory:100},
                { id:20, color:"pink",shoeimage:'img/pink.JPG',inventory:10 },
                { id:30, color:"red",shoeimage:'img/red.JPG',inventory:0}
            ]
            },
            {proID:2, productname:'Gucci Sneakers',
             details:[" 60% Leather","Kids Collection available","Firm sole/heel","All ages","multiple colors"],
             variants:[
                { id: 11, color:"black", shoeimage:'img/gB.JPG',inventory:100},
                { id:22, color:"red",shoeimage:'img/gR.JPG',inventory:10 },
                { id:33, color:"blue",shoeimage:'img/gBl.JPG',inventory:0}
            ]
            },
            {proID:2, productname:'Channel Heels',
             details:["Comfy for long hours","Not itchy","Firm sole/heel","All ages","multiple colors"],
             variants:[
                { id: 12, color:"black", shoeimage:'img/heels1.JPG',inventory:100},
                { id:24, color:"red",shoeimage:'img/heels2.JPG',inventory:0 },
                { id:36, color:"blue",shoeimage:'img/heels3.JPG',inventory:10}
            ]
            },
            {proID:2, productname:'Sussany Seude boots',
             details:[" Waterproof","Kids Collection available","6 inch classic","leather 70%","All seasons"],
             variants:[
                { id: 13, color:"black", shoeimage:'img/boots2.JPG',inventory:100},
                { id:26, color:"brown",shoeimage:'img/boots3.JPG',inventory:10 },
                { id:39, color:"blue",shoeimage:'img/boots1.JPG',inventory:0}
            ]
            }

        ]
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
          },
         
        
    }})
    
