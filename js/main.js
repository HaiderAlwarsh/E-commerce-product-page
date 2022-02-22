$(document).ready(function(){

    let imageUrl = ['/imgs/image-product-1.jpg', '/imgs/image-product-2.jpg', '/imgs/image-product-3.jpg', '/imgs/image-product-4.jpg'];
    let counter = 0;
    let numOfProd = 0
    
    $(document).on('click', function(e){

        let target = e.target.parentElement;
    
        if($(target) && $(target).hasClass('burger-close-icon')){

            preventMultiClick('.burger-close-icon')
            slideMenu();
        
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
        }
    })

 //Display sideBar
function slideMenu(){

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

    let cartList = '<div class="cart-list"><header><h3>Cart</h3></header><section class="cart-list-body"><p>Your cart is empty</p></section></div>';

    if($('body').find('.cart-list').length != 1){
        $('.main-div').after(cartList)
        
    }else {
        $('body .cart-list').remove()
    }

}


function addProduct(){
    let addProduct = '';
}


})
