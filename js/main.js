$(document).ready(function(){

    $('.burger-close-icon').on('click', function(){
        slideMenu();
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




})
