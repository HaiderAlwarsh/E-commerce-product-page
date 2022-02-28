$(document).ready(function(){

    let imageUrl = ['/imgs/image-product-1.jpg', '/imgs/image-product-2.jpg', '/imgs/image-product-3.jpg', '/imgs/image-product-4.jpg'];
    let counter = 0;
    let numOfProd = 0

    if($(document).outerWidth() >= '768'){
        insertSmallImage();
    }else if($(document).outerWidth < '768'){
        deleteSmallImage();
    }

    
    $(document).on('click', function(e){

        let target = e.target.parentElement;
    
        if($(target) && $(target).hasClass('burger-close-icon')){

            preventMultiClick('.burger-close-icon')
            slideBar();
        
        }else if($(target) && $(target).hasClass('main-section-productImages')){

            let className = e.target.className;
            
            preventMultiClick('.' + className)
            imageSlider(e.target);
        
        }else if ($(target) && $(target).hasClass('add-to-cart')){
            let amount = parseInt($('.amount').text());
            let cart = $('.cart');

            if(amount > 0 ){
                cart.addClass('active');
                cart.attr('data-amount', amount)
                
                addProduct();
            }

        }else if($(target) && $(target).hasClass('product-count')){
            CountQuantity(e.target);
        
        }else if($(target) && $(target).hasClass('cart')){
            setTimeout(function(){
                DisplayCart();
            }, 200)
        
        }else if($(target) && $(target).hasClass('delete')){
            if(confirm('Are you sure to delete all product?')){
                deleteProducts();
            }
        
        }else if($(e.target) && $(e.target).hasClass('background')){// Close the slide bar if click on th body
            slideBar();
        
        }else if($(e.target) && $(e.target).hasClass('smell-image')){
            changeImage(e.target)
        }
    })


 //Display sideBar
function slideBar(){

    if($('.menu').css('left') !== '-254px'){

        $('.menu').animate({width: '0', left: '-254px'}, 300);

        setTimeout(function(){
            $('.burger-close-icon img').attr('src', 'icons/icon-menu.svg');
        },200)

        setTimeout(function(){
            $('.background').remove();
        }, 100)
        
    }else {
        $('.menu').animate({width: '65%', left:'0',}, 300);
        
        setTimeout(function(){
            $('.burger-close-icon img').attr('src', 'icons/icon-close.svg');
        }, 100)

        setTimeout(function(){
            $('.main-div').after('<div class="background"></div>');
        } , 200)
    }
}

// Change product image
function imageSlider(target){

    if($(target).hasClass('next-arrow')){
        
        counter ++;

        if(counter == imageUrl.length ){
            counter = 0;
        }

        $('.main-section-productImages').css('background-image', 'url(' +imageUrl[counter]+ ')');

    }else if ($(target).hasClass('prev-arrow')){

        counter --;

        if(counter == -1){
            counter = imageUrl.length - 1;
        }

        $('.main-section-productImages').css('background-image', 'url(' +imageUrl[counter]+ ')');                
    }
}

// Prevent multi click
function preventMultiClick(elmName){

    $(elmName).css('pointer-events', 'none')

    setTimeout(function(){
        $(elmName).css('pointer-events', 'unset')
        }, 400)
}

function CountQuantity(ele){
    if($(ele).hasClass('minus')){
        numOfProd --;

        if(numOfProd <= 0 ){
            numOfProd = 1;
        }

        $('.amount').text(numOfProd);
    
    }else if($(ele).hasClass('plus')){
        numOfProd ++;
        $('.amount').text(numOfProd);
    }
}

//Display product in the cart and all details
function DisplayCart(){

    let cartList = `
    <div class="cart-list">
        <header>
            <h3>Cart</h3>
        </header>
        <section class="cart-list-body">
            <p>Your cart is empty</p>
        </section>
    </div>`;

    $(cartList).slideDown();

    if($('body').find('.cart-list').length != 1){
        $('.main-div').after(cartList);

        if($('.cart').hasClass('active')){
            addProduct()
        }

    }else {
        $('body .cart-list').remove();
    }
}

//Add product to the cart
function addProduct(){
    let amount = parseInt($('.amount').text());
    let totalPrice = $('.total-price').text().slice(1);
    let totalCost = amount * totalPrice;

    let addProduct = `
    <div class="product-container">
        <div class="product-img">
            <img src="imgs/image-product-1-thumbnail.jpg" alt="">
        </div>
        <div class="product-details">
            <div class="product-name">Fall Limited Edition Sneakers</div>
            <div class="price-details">
                <span class="price-of-product">${totalPrice} x</span>
                <span class="CountQuantity">${amount}</span>
                <span class="total-cost">$${totalCost}</span>
            </div>
        </div>
        <div class="delete">
            <p class="delete-icon"></p>
        </div>
    </div>
        <div class="checkout">
            <button class="chekBtn">Checkout</button>
        </div>`;

    $('.cart-list-body').html(addProduct);
}

//Delete product from cart
function deleteProducts(){
    $('.cart').removeClass('active');
    $('.cart-list-body').html('<p>Your cart is empty</p>');

}

//Change image 
function changeImage(imgSrc){

    let src = $(imgSrc).children().attr('src').slice(0, 20) + '.jpg';
    $('.main-section-productImages').css('background-image', 'url(' +src+ ')');
    
}

//Show small image when the window size more than or equal 768
function insertSmallImage (){
    let smallImage = `
    <div class="smell-image-container">
        <div class="smell-image">
            <img src="imgs/image-product-1-thumbnail.jpg" alt="">
        </div>
        <div class="smell-image">
            <img src="imgs/image-product-2-thumbnail.jpg" alt="">
        </div>
        <div class="smell-image">
            <img src="imgs/image-product-3-thumbnail.jpg" alt="">
        </div>
        <div class="smell-image">
            <img src="imgs/image-product-4-thumbnail.jpg" alt="">
        </div>
    </div>`

    $('.main-section-productImages').prepend(smallImage)

}

//Remove small image when the window size less than 768
function deleteSmallImage(){
    let mainSection = $('.main-section-productImages').children('.smell-image-container');
    
    if(mainSection){
        $('.smell-image-container').remove();
    }
}
})