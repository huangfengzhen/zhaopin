$(function(){
	'use strict';//使用javascript严格语法
		
	//获取屏幕宽高
	function view () {
		return{
			w:document.documentElement.clientWidth,
			h:document.documentElement.clientHeight
		}
	}
	//首页滚动图
	function scroll () {
		var oA = $(".technician a").width()+10;
		var n = $(".technician a").length;
		$(".technician .scroll").width(oA*n+20);
	}
	scroll()
	function scroll2 () {
		var oA = $(".stampbox a").eq(0).width()+10;
		var n = $(".stampbox a").length;
		$(".stampbox .scroll").width(oA*n+20);
	}
	scroll2()
	function scroll3 () {
		var oA = $(".photos a").eq(0).width()+10;
		var n = $(".photos a").length;
		$(".photos .scroll").width(oA*n);
	}
	scroll3()
//我的订单无限滚动
	if($("#page-infinite-navbar-myorder")) {
    	$("#tab1,#tab2,#tab3,#tab4,#tab3,#tab3").infinite().on("infinite", function() {
      		var self = this;
      		if(self.loading) return;
      		self.loading = true;
      		console.log(self);
      		setTimeout(function() {
        		$(self).find(".content-padded").append('<li>'+
									      					'<div class="order">'+
											      				'<div class="title">'+
											      					'<a href="javascript:;">君和商城<i class="fa fa-angle-right"></i></a>'+
											      					'<span class="right red">交易成功</span>'+
											      				'</div>'+
											      				'<div class="info">'+
											      					'<div class="imgBox"><img src="images/1.jpg" /></div>'+
											      					'<div class="goodsName">养护洗发液</div>'+
											      					'<div class="price">'+
												      					'<div>￥35.00</div>'+
												      					'<div class="yuanjia">￥60.00</div>'+
												      					'<div class="num">x 1</div>'+
												      				'</div>'+
											      				'</div>	'+      				
											      				'<div class="statue">'+
											      					'<a href="javascript:;">删除订单</a>'+
											      					'<a href="javascript:;">查看物流</a>'+
											      				'</div>'+
											      			'</div>'+
									      				'</li>'
				);
        		self.loading = false;
      		}, 1500);   //模拟延迟
    	});
  	}
//送货地址
	//选择默认地址
	$(".address .fa-check").on("touchstart",function(){
		$(".address .fa-check").removeClass("checked");
		$(this).addClass("checked");
	})
	
	$(".address .editor").on("touchstart",function(){
		window.location.href='edit-address.html';
	})
	
	//删除地址
	$(".address .confirm-ok").on("touchend",function(){
		$.confirm("确定要删除地址吗？", function() {
		  //点击确认后的回调函数
		  	$.showLoading("正在加载...");
		  	$.ajax({
		  		url:'',
		  		type:'post',
		  		data:'',
		  		dataType:'json',
		  		success:function(){
		  			$.hideLoading();
		  			$.toast("删除成功", "text");
		  		},
		  		error:function(){
		  			$.hideLoading();
		  			$.toast("删除失败", "text");
		  		}
		  	});
		  	}, function() {
		  	//点击取消后的回调函数		  	
			}
		);
	})
//会员卡正反页切换
	$(document).on("touchstart",".header-card .card",function(){
		$(this).hide();
		$(".header-card .card-back").show();
	})
	$(document).on("touchstart",".header-card .card-back",function(){
		$(this).hide();
		$(".header-card .card").show();
	})	
//充值
	$(document).on("touchstart",".recharge .plan span",function(){
		$(this).addClass("checked").siblings().removeClass("checked");
	})
	
//打开预定时间面板
	$(document).on("touchstart",".reserveTime",function(){
		var html = '';
		var advance = 3;//可以预定的天数
		var oLi = $(".lefsidebar ul li").length;
		var myDate = new Date();
		var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
		var month = myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
		var date = myDate.getDate(); //获取当前日(1-31)
		var day = myDate.getDay(); //获取当前星期X(0-6,0代表星期天))		
		var weekday = new Array(7);//星期格式化
		weekday[0] = "周日";
		weekday[1] = "周一";
		weekday[2] = "周二";
		weekday[3] = "周三";
		weekday[4] = "周四";
		weekday[5] = "周五";
		weekday[6] = "周六";	
		function days (nian, yue) {
			var days;
			if(yue == 2){
		        days= nian % 4 == 0 ? 29 : 28;
		        
		    }
		    else if(yue == 1 || yue == 3 || yue == 5 || yue == 7 || yue == 8 || yue == 10 || yue == 12){
		        //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
		        days= 31;
		    }
		    else{
		        //其他月份，天数为：30.
		        days= 30;
		        
		    }
		    return days;
		}	
		if(oLi == 0){
			for(var i=0;i<advance;i++){
				if(day>6){
					day=0;	
				}
				html= '<li>'+
						  '<div class="date">'+year+'-'+month+'-'+date+'</div>'+
						  '<div class="week">'+weekday[day]+'</div>'+
					  '</li>';
				date++;
				if(date>days(year,month)){
					month=month+1;
					date=1;
				};
				day++;
				$(".lefsidebar ul").append(html);
			}
			$(".lefsidebar ul li").eq(0).addClass("current");
		}
					
		$(".mengban").show();
		$(".timeBox").addClass("open");
	})
	//关闭预定时间面板
	$(document).on("touchstart",".timeBox .fa-close",function(e){
		e.preventDefault();
		$(".timeBox").removeClass("open");
		$(".mengban").hide();
	})
	//选择预定日期
	$(document).on("touchstart",".lefsidebar li",function(e){
		e.preventDefault();
		$(this).addClass("current").siblings().removeClass("current");	
	})
	$(document).on("touchstart",".time li",function(e){
		e.preventDefault();
		var sTime = $(this).html();//获取预定的时间
		var sDate = $(".lefsidebar").children().children(".current").children().eq(0).html();//获取预定日期
		
		$(".reserveTime").val(sDate+" "+sTime);//将预定的具体时间输出
		$(this).addClass("current").siblings().removeClass("current");
		$(".timeBox").removeClass("open");
		$(".mengban").hide();	
	})
	
//购物车
	/**加**/
	$(".shopcart .add").on("touchstart",function(event){
		event.stopPropagation();
		var jishu = $(this).prev();
		var n = parseInt(jishu.text());
		n++;
		jishu.text(n);
		
	})
	$(".shopcart .reduce").on("touchstart",function(){
		event.stopPropagation();
		var jishu = $(this).next();
		var n = parseInt(jishu.text());
		n--;
		if (n>0) {				
			jishu.text(n);
		} else{
			n=1;
			jishu.text(n);
		}		
	})


})