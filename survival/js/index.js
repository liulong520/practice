let length = $('img').length
$(".carousel-outer>.carousel-inner>img").on('load',function(){
	length--
	if(length<=0){
		carosol()
	}
})
carosol()
$(window).resize(function(){
	carosol()
})
function carosol(){
	$(".carousel-outer").width($('body').width())
	$(".carousel-outer>.carousel-inner>img").width($(".carousel-outer").width())
	$(".carousel-outer>.carousel-inner").width($(".carousel-outer>.carousel-inner>img").width()*$(".carousel-outer>.carousel-inner>img").length)
}

$.lunbo($(".carousel-outer>.carousel-inner>img"),$(".carousel-outer>.radius"))
