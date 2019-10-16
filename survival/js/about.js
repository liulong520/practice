$(function() {

	//发展史的横线高度
	$('.flow-list').hover(function() {
		_this = $(this).index();
		LH = 0;
		$(this).addClass('this').siblings().removeClass('this');
		for(i = 0; i <= _this; i++) {
			console.log($('.flow-list').eq(i - 1).height())
			LH = LH + $('.flow-list').eq(i - 1).height();
		}
		$('.about-history .line-ef').height(LH - 52);
	})
})

//tab切换
$(".tab-title").click(function() {

	$(this).addClass('on')
	$(this).siblings().removeClass('on')

	var index = $(this).index()-1;

	var parent = $(this).parents('.tab-box')

	var ele = parent.find('.tab-list')

    ele.eq(index).siblings().removeClass('on')
	ele.eq(index).addClass('on')
})

//
$('.about-customer-list').mouseenter(function(){
	$(this).addClass('this')
	$(this).removeClass('this')
	
	var pro=$(this).find('.desc')
	
	pro.siblings().removeClass('on')
	pro.addClass('on')
})

$('.about-customer-list').mouseleave(function(){
	
	var pro=$(this).find('.desc')
	
	pro.siblings().removeClass('on')
})