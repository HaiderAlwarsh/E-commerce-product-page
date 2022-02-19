$(document).ready(function(){

    let imageUrl = ['/imgs/image-product-1.jpg', '/imgs/image-product-2.jpg', '/imgs/image-product-3.jpg', '/imgs/image-product-4.jpg'];
    let counter = 0;
    
    $(document).on('click', function(e){

        let target = e.target.parentElement;

        console.log(target);

        if($(target) && $(target).hasClass('burger-close-icon')){
            slideMenu();
        
        }else if($(target) && $(target).hasClass('main-section-productImages')){
            imageSlider(e.target);
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


})
