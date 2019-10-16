$(function(){
	//设置页面fontsize
	var $window = $(window),           
	ww = $window.width(),
	wh = $window.height();
	var FontSize = (100/1200)*ww;
	$('html').css('font-size',FontSize);
	
	
	$(window).resize(function(){
	    var ww = window.innerWidth,
	    FontSize = (100/1200)*ww;
		$('html').css('font-size',FontSize);
	})
	
	//顶部导航
	$(".survival-top .top-modal").hover(function(){
		$(this).find('.list').stop().toggle(300)
	})
	
	//滚动页面时让顶部固定
	$(document).scroll(function(){
		//由滚动条设置顶部导航为固定定位
		if($(document).scrollTop()>=70){
			$(".survival-top").css({
				position: 'fixed',
				'box-shadow': '0 0 .05rem cadetblue'
			})
		}
	})
	$(".survival-top .top-modal.top-search a").click(function(){
		$(".survival-top>.my-model").stop().slideToggle(300)
	})

})
