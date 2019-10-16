let wid
let fontsize
let api = 'http://192.168.97.249:3003/'
let {log} = console
let classHtml = ''
htmlFonts()
$(window).resize(function(){
	htmlFonts()
})
function htmlFonts(){
	wid = window.screen.availWidth
	fontsize = $(document).width()*100/wid
	$('html').css('font-size',fontsize)
}
$(function(){
	$.ajax({
		url: api+'list',
		type: 'get',
		success: function(res){
			for(let item of res){
				let html = 
				`<div class="shop-all content clearfix">
					<div class="order"><input type="checkbox" /></div>
					<div class="shop-num">${item.id}</div>
					<div class="type flex-betwe overflow name">
						<div><img src="${item.img}" alt="" /></div>
						<div class="intro">
							<div class="overflow-1 shop-name">${item.nam}</div>
							<div class="flex-betwe">
								<div class="word cu">促</div>
								<div class="word hot">热</div>
								<div class="word new">新</div>
								<div class="word push">推</div>
								<div class="fontc-blue">查看商品属性</div>
							</div>
						</div>
					</div>
					<div class="type name">
						<div class="intro">
							<div class="overflow-1">品牌名称</div>
							<div class="intro">分类名称>分类名称>分类名称</div>
						</div>
					</div>
					<div class="price-ope"><span>￥</span><span class="price-num">${item.price}</span></div>
					<div class="order">${item.store}</div>
					<div class="order overflow-1">${item.id}</div>
					<div class="order fontc-blue cursor-poi">✔</div>
					<div class="price-ope name">
						<div class="intro operate">
							<div><span>查看</span></div>
							<div>
								<span>编辑</span>
								<span>删除</span>
							</div>
						</div>
					</div>
				</div>`
				$(".bottom-right>.all-shop").append(html)
			}
		}
	})
	$.ajax({
		type:"get",
		url: api+"class",
		datatype: 'json',
		success: function(res){
			if(res.status == 200){
				for(let item of res.data){
					classHtml = `<option value="${item.c_id}">${item.c_name}</option>`
					$(".add-modal>.add-modal-content>.add-modal-body select").append(classHtml)
				}
			}
		}
	})
	
	$(".add-modal-content>.add-modal-footer>.save").on('click',function(){
		let classifyPost = document.querySelector('.add-modal>.add-modal-content>.add-modal-body>.post-classify')
		let formData = new FormData(classifyPost)
		$.ajax({
			url: api+'postclass',
			type: 'post',
			data: formData,
			datatype: 'json',
			contentType: false,//将传送的文件格式转为json格式传送
			processData: false,//限定文件传送数据格式
			success: function(res){
				console.log(res)
			}
		})
	})
	
	$(".all-shop").on('click','.word',function(){
		$(this).css('opacity','0.3')
	})
	// 控制复选框是否全选
	let a = 0
	$(".all-shop").on('click','.shop-all input',function(){
		$(".all-shop .shop-all input").each(function(){
			if($(this).prop('checked') == true){
				a++;
			}
		})
		if(a == 4){
			$(".bottom-right>.all-shop>.shop-head input").prop('checked',true)
		}else{
			$(".bottom-right>.all-shop>.shop-head input").prop('checked',false)
			a = 0
		}
	})

	// 点击全选复选框，让所有复选框全选
	$(".bottom-right>.all-shop>.shop-head input").click(function(){
		$(".bottom-right .shop-all input").prop('checked',$(".bottom-right>.all-shop>.shop-head input").prop('checked'))
	})
	// 点击按钮进行
	$(".bottom-bottom>.bottom-right>.prov>div:last-child").click(function(){
		$(this).find('div').toggleClass('show')
		$(".bottom-bottom>.bottom-right>.some-prov").slideToggle(300)
	})

	// 点击出现分类的类别
	$(".search>div>.please-choose>span").click(function(){
		$(this).closest('.search-one').find('div.absolute').slideToggle(300)
		$(this).closest('.search-one').siblings().find('div.absolute').slideUp(300)
	})
	// 点击添加类别的边框
	$(".please-choose .detail-classify>div li").click(function(){
		$(this).addClass('border')
		$(this).siblings().removeClass('border')
	})

	// 点击确定后收起类别选择
	$('div.absolute>.choose-result>.resure').click(function(){
		$('.search .please-choose>div.absolute').slideUp(300)
	})
	
	//点击出现模态框
	$(".bottom-right>ul>li:first").click(function(){
		$(".add-modal").show(300)
//		$(".add-modal>.add-modal-content").slideUp()
	})
	// 点击模态框的X关闭模态框
	$(".add-modal>.add-modal-content>.add-modal-title>.add-modal-close").click(function(){
		$(".add-modal").hide(300)
	})
	// 点击模态框的确认按钮，关闭模态框
	$(".add-modal-content>.add-modal-footer>.save").click(function(){
		$(".add-modal").hide(300)
	})
})