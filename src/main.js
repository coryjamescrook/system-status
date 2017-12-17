import $ from 'jquery';

$('document').ready(function(){
    $('.header').animate({
        opacity: 1
    }, 800, "swing");
    
    $('.container').delay(300).animate({
        opacity: 1
    }, 1200, "swing");
});