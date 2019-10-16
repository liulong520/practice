(function($){
	//下拉框
	$.fn.sel = function(option){
		option = $.extend({
			parent: '',
			title: '',
			list: ''
		},option)
		$(this).find(option.list).hide()
		$(this).find(option.title).click(function(e){
			e.stopPropagation()
			$(this).siblings().toggle()
			$(this).parent().siblings(option.parent).find(option.list).hide()
		})
		$(option.list).children().click(function(){
			$(this).parent().siblings().find('input').val($(this).text())
			$(this).parent().hide()
		})
		$(document).click(function(){
			$(option.parent).find(option.list).hide()
		})
	}
	
	//给图片添加懒加载图片
	$.extend({
		imgLazy: function(ele){
			$(ele).attr('data-original',$(ele).attr('src'))
		}
	})
	
	//翻页的页码
	$.extend({
		changePage: function(ele1,ele2){
			var index = 0;
			$(ele1).click(function(){
				index = $(this).index()-1
				$(this).addClass('on').siblings(ele1).removeClass('on')
			})
			$(ele2).click(function(){
				if($(this).index()==0&&$(ele1+'.on').index()>1){
					$(ele1).eq(--index).addClass('on').siblings(ele1).removeClass('on')
				}else if($(this).index()!=0&&$(ele1+'.on').index()<$(this).index()-1){
					$(ele1).eq(++index).addClass('on').siblings(ele1).removeClass('on')
				}
			})
		}
	})
	
	//登录验证出现提示	
	$.totip = function(option){
		$.extend({
			parent: '.login',
			classname: 'errortooltip',
			content: '请输入',
		},option)
		$(".tooltip").remove()
		clearTimeout(timer)
		var html = `<div class="${option.classname} tooltip">${option.content}</div>`
		$(option.parent).append(html)
		console.log($('.'+option.classname))
		var timer = setTimeout(function(){
			$('.'+option.classname).remove()
			if(option.success){
				option.success()
			}
		},2000)
	}
	
	//验证输入
	$.extend({
		subMit: function(ele){
			$.extend($.validator.messages,{
				required: "这是必填字段",
			    remote: "请修正此字段",
			    email: "请输入有效的电子邮件地址",
			    url: "请输入有效的网址",
			    date: "请输入有效的日期",
			    dateISO: "请输入有效的日期 (YYYY-MM-DD)",
			    number: "请输入有效的数字",
			    digits: "只能输入数字",
			    creditcard: "请输入有效的信用卡号码",
			    equalTo: "你的输入不相同",
			    extension: "请输入有效的后缀",
			    maxlength: $.validator.format("最多可以输入 {0} 个字符"),
			    minlength: $.validator.format("最少要输入 {0} 个字符"),
			    rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
			    range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
			    max: $.validator.format("请输入不大于 {0} 的数值"),
			    min: $.validator.format("请输入不小于 {0} 的数值")
			})
			ele.validate({
				rules:{
					email: {
						required: true,
						email: true
					},
					password:{
						required: true,
						rangelength: [6,18]
					},
					repwd:{
						required: true,
						equalTo: $("[name=password]")
					},
					tel: {
						required: true,
						tel: true
					},
					check: {
						required: true,
					},
					age: {
						required: true,
						min: 10
					},
					sex: {
						required: true,
						sex: true
					}
				},
				messages:{
					email: {
						required: '邮箱不能为空'
					},
					password: {
						required: '密码不能为空'
					},
					repwd: {
						required: '密码不能为空'
					},
					tel: {
						required: '手机号不能为空'
					},
					age: {
						required: '年龄不能为空',
						min: '输入年龄不能小于10岁'
					},
					sex: {
						required: '性别不能为空'
					}
				}
			})
			$.validator.addMethod('tel',function(value,element){
				return /^1[356789]\d{9}$/.test(value)
			},'请输入正确手机号')
			$.validator.addMethod('sex',function(value,element){
				return value == ("男"||"女"||"famale"||"male")?true:false
			},'请输入性别')
		}
	})
	
	//线条动画
	$.extend({
		lineAnimate: function(){
			function n(n, e, t) {
		        return n.getAttribute(e) || t
		    }
		    function e(n) {
		        return document.getElementsByTagName(n)
		    }
		    function t() {
		        var t = e("script"),o = t.length,i = t[o - 1];
		        console.log()
		        return {
		            l: o,//1
		            z: n(i, "zIndex", -1),//移动点的z-index
		            o: n(i, "opacity", .5),//移动点的透明度
		            c: n(i, "color", "0,0,0"),//移动点的颜色
		            n: n(i, "count", 99)//控制移动点的个数
		        }
		    }
		    function o() {
		    	console.log(document.documentElement.clientWidth);
		    	console.log(window.innerWidth);
		    	console.log(document.body.clientWidth);
		        a = m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
		        c = m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
		    }
		    function i() {
		        r.clearRect(0, 0, a, c);
		        var n, e, t, o, m, l;
		        s.forEach(function(i, x) {
		            for (i.x += i.xa, 
		            	 i.y += i.ya,
		            	 i.xa *= i.x > a || i.x < 0 ? -1 : 1, //1或-1
		            	 i.ya *= i.y > c || i.y < 0 ? -1 : 1, //1或-1
		            	 r.fillRect(i.x - .5, i.y - .5, 1, 1), 
		            	 e = x + 1; e < u.length; e++)
		            
		            	 n = u[e],null !== n.x && null !== n.y && 
		            	 (o = i.x - n.x, m = i.y - n.y, l = o * o + m * m,
			            	l < n.max && 
			            	(n === y && l >= n.max / 2 && (i.x -= .03 * o, i.y -= .03 * m),
			            	t = (n.max - l) / n.max, r.beginPath(), r.lineWidth = t / 2, 
			            	r.strokeStyle = "rgba(" + d.c + "," + (t + .2) + ")", 
			            	r.moveTo(i.x, i.y), r.lineTo(n.x, n.y), r.stroke()
			            	)
			             )
		        }),
		        x(i)
		    }
		    var a, c, u, m = document.createElement("canvas"),
		    d = t(),
		    l = "c_n" + d.l,// c_n+1
		    r = m.getContext("2d"),//设置为2d
		    x = window.requestAnimationFrame || window.webkitRequestAnimationFrame 
		    || window.mozRequestAnimationFrame || window.oRequestAnimationFrame|| window.msRequestAnimationFrame 
		    ||function(n) {
		        window.setTimeout(n, 1e3 / 45)
		    },
		    w = Math.random,
		    y = {
		        x: null,
		        y: null,
		        max: 2e4
		    };
		    m.id = l,
		    m.style.cssText = "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o,
		    e("body")[0].appendChild(m),
		    o(),
		    window.onresize = o,
		    window.onmousemove = function(n) {
		        n = n || window.event,
		        y.x = n.clientX,
		        y.y = n.clientY
		    },
		    window.onmouseout = function() {
		        y.x = null,        y.y = null
		    };
		    for (var s = [], f = 0; f<d.n; f++) {
		        var h = w() * a,//w为Math.random
		        g = w() * c,
		        v = 2 * w() - 1,
		        p = 2 * w() - 1;
		        s.push({
		          x: h,
		           y: g,
		             xa: v,
		             ya: p,
		         })
		             max: 6e3
		    }
		    u = s.concat([y]),//concat连接数组或字符串
		    setTimeout(function() {
		        i()
		    },100)
		}
	})

	//添加放大镜
	$.fn.magnifier = function(option){
		$(this).css('position','relative')
		var _this = this
		$(this).mouseenter(function(){
			$(this).append('<div class="magnifier"></div>')
			$(this).append('<div class="big-img"><img src='+$(this).children('img').attr('src')+'></div>')
			$(".magnifier").css({
				position: 'absolute',
				background: 'yellow',
				opacity: '0.6',
				width: option.width+'px',
				height: option.height+'px',
				left: 0,
				top: 0
			})
			$(".big-img").css({
				position: 'absolute',
				width: option.width/($(_this).children('img').width()/$(".big-img>img").width())+'px',
				height: option.height/($(_this).children('img').height()/$(".big-img>img").height())+'px',
				right: '-250px',
				top: '0',
				overflow: 'hidden'
			})
			$(".big-img>img").css('position','absolute')
		})
		$(this).mouseleave(function(){
			$(this).children('.magnifier').remove()
			$(this).children('.big-img').remove()
		})
		$(this).mousemove(function(e){
			var left = e.pageX-$(this).offset().left-$(".magnifier").width()/2
			var top = e.pageY-$(this).offset().top-$(".magnifier").height()/2
			left = left<0? 0:left
			left = left>($(this).children('img').width()-$(".magnifier").width())?($(this).children('img').width()-$(".magnifier").width()):left
			top = top>($(this).children('img').height()-$(".magnifier").height())?($(this).children('img').height()-$(".magnifier").height()):top
			top = top<0?0:top
			$(".magnifier").css({
				left: left,
				top: top
			})
			console.log($(this).width())
			$(".big-img>img").css({
				left: -left/($(this).width()/$(".big-img>img").width()),
				top: -top/($(this).height()/$(".big-img>img").height())
			})
		})
	}
	
	//轮播
	$.extend({
		lunbo:function(img,radius){
			var index = 0
			for(var i=0; i<img.length-1; i++){
				radius.append(`<span>${i+1}</span>`)
			}
			img.width(img.parent().parent().width())
			console.log(img.width())
			radius.css('left',img.width()/2)
			radius.children().eq(0).css('background','black').siblings().css('background','rgba(110,171,0,0.5)')
			var imgInterVal = setInterval(interVal,2000)
			radius.children().on('mouseenter',function(){
				img.parent().css({left: -$(this).index()*img.width()})
				$(this).css('background','black').siblings().css('background','rgba(110,171,0,0.5)')
				index = $(this).index();
				img.parent().stop(false)
			})
			img.parent().parent().mouseenter(function(){
				clearInterval(imgInterVal)
			})
			img.parent().parent().mouseleave(function(){
				imgInterVal = setInterval(interVal,2000)
			})
			function imgMove(index,time){
				img.parent().animate({
					left: -img.width()*index
				},time)
			}
			function interVal(){
				index++
				imgMove(index,1000)
				if(index == img.length-1){
					index = 0
					imgMove(index,0)
				}
				radius.children().eq(index).css('background','black').siblings().css('background','rgba(110,171,0,0.5)')
			}
			document.addEventListener('webkitvisibilitychange',function(){
				var isHidden = document.hidden;
				if(isHidden){
					clearInterval(imgInterVal)
				}else{
					imgInterVal = setInterval(interVal,1500)
				}
			})
		}
	})
	
	
	//canvas跟随鼠标动画
	$.extend({
		canvMouseMove: function(){
			let canv = $("#canvas")
			let cav = canv.getContext('2d')
			let circleArr = []
			canv.width(window.innerWidth())
			canv.height(window.innerHeight())
			function Circle(options){
				for(let prop in options){
					this[prop] = options[prop]
				}
				this.speedx = Math.random()*12-6
				this.speedy = Math.random()*12-6
				this.speedz = Math.random()+0.05
				this.color = "rgb("+(9+parseInt(Math.random()*240))+","+(18+parseInt(Math.random()*220))+",203)"
				circleArr.push(this)
			}
			Circle.prototype.addCircle = function(){
				cav.beginPath()
				cav.arc(this.x,this.y,this.z,0,Math.PI*2)
				cav.fillStyle = this.color
				cav.fill()
			}
			Circle.prototype.animate = function(){
				this.x -= this.speedx
				this.y -= this.speedy
				if(this.z>0){
					this.z -= this.speedz
				}
				if(this.z<=0){
					for(let i = 0;i<circleArr.length;i++){
						if(circleArr[i] == this){
							circleArr.splice(i,1)
						}
					}
					this.z = 0
				}
			}
			canv.mousemove(function(e){
				for(let i = 0;i<50; i++){
					let a = new Circle({
						x:e.offsetX,
						y:e.offsetY,
						z:5
					})
				}
			})
			let inter = setInterval(()=>{
				cav.clearRect(0,0,window.innerWidth,innerHeight)
				for(let i=0;i<circleArr.length;i++){
					circleArr[i].addCircle()
					circleArr[i].animate()
				}
			},50)
		}
	})	
})($)
