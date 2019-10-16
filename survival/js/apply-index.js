
window.onload =function(){
	$(function(){
		$('.news-tab').addClass('active')
		$('.sight-top-img-text').addClass('active')
	})
	
	window.onscroll = function() {
	var scrolltop = document.body.scrollTop || document.documentElement.scrollTop

	if(scrolltop >= 130) {
		$(function() {
			$('.port2-h2').addClass('active')
		})
	}
	
	if(scrolltop >= 200) {
		$(function() {
			$('.port2-img-box').first().addClass('active')
		})
	}
	
	if(scrolltop >= 800) {
		$(function() {
			$('.port2-img-box').eq(1).addClass('active')
		})
	}
}
}




//家居tab切换
$('.news-tab-list').hover(function() {
	if($(this).hasClass('this')) {
		$(this).removeClass('this')
	} else {
		$(this).addClass('this')
	}
})

//