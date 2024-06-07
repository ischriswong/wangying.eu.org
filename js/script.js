$(function(){
	$('html').removeClass('no-js');
	
	jQuery.easing.def = 'linear';
	
	

	
	
	/* Image replacement on hover
	 -------------------------------------------------------------- */
	$('.nav a, a.button').live('hover', function(e) {
		if ( $(this).not('.current').find('img').length > 0 ) {
			var src = $(this).find('img').attr('src');
			if ( e.type == 'mouseenter' ) {
				var newSrc = src.replace(new RegExp("(\.png|\.jpg|\.gif)", "i"), "_active$1");
			} else if ( e.type == 'mouseleave' ) {
				var newSrc = src.replace('_active','');
			}
			$(this).find('img').attr('src',newSrc);
		}
	});

	
	
	/* Footer link animation
	 -------------------------------------------------------------- */
	$('#nav-footer .parent').hover(function(e) {
		var children = $(this).find('.children');
		var images = children.find('img');
		var maxIndex = images.length-1;
		
		if ( e.type == 'mouseenter' ) {
			images.each(function(index) {
				$(this).stop(true, true).hide().delay((maxIndex-index)*100).css({top:36}).show().animate({top:0}, {duration:100});
			});
			children.stop(true, true).css({bottom:20, opacity:1}).show().animate({bottom:30, opacity:1});
		} else if ( e.type == 'mouseleave' ) {
			children.stop(true, true).animate({bottom:0, opacity:0}, {duration:200}).hide({duration:0});
		}
	});
	$('#nav-footer .children a').hover(function(e) {
		
		var image = $(this).find('img');
		var tooltip = $(this).siblings('.tooltip');
		
		tooltip.stop(true, true);
		
		if ( e.type == 'mouseenter' ) {
			image.animate({top:-36}, {duration:250, queue:false});
			tooltip.css({opacity:0, display:'block', marginRight:-10}).animate({opacity:1, marginRight:0}, {duration:300, easing:'easeOutExpo'}).show();
		} else {
			image.animate({top:0}, {duration:400, queue:false});
			tooltip.animate({opacity:0, marginRight:-10}, {duration:200, complete:function() { $(this).hide() }});
		}
		
	});
	
	
	
	/* Works : hentry title
	 -------------------------------------------------------------- */
	$('#works .hentry').live('hover', function(e) {
		var title = $(this).find('.entry-title');
		var mask = $(this).find('.mask');
		
		if ( e.type == 'mouseenter' ) {
			title.show();
			mask.stop().animate({opacity:0}, {duration:300});
		} else if ( e.type == 'mouseleave' ) {
			title.hide();
			mask.stop().animate({opacity:1}, {duration:300});
		}
	});
	$('#works .hentry').live('mousemove', function(e) {
		var offset = $('#works').offset();
		
		var gapLeft = e.pageX-offset.left+16;
		var gapTop = e.pageY-offset.top+18;
		
		$(this).find('.entry-title').css({left:gapLeft, right:'auto', top:gapTop, bottom:'auto'});
    });
	
	
	
	/* Works : switcher tooltip
	 -------------------------------------------------------------- */
	$('#works-categories .switcher a').live('hover', function(e) {
		var tooltip = $(this).siblings('.tooltip');
		tooltip.stop(true, true);
		if ( e.type == 'mouseenter' ) {
			tooltip.css({opacity:0, display:'block', marginTop:-10}).animate({opacity:1, marginTop:0}, {duration:300, easing:'easeOutExpo'}).show();
		} else {
			tooltip.animate({opacity:0, marginTop:-10}, {duration:300, easing:'easeInCubic', complete:function() { $(this).hide() }});
		}
	}).live('click', function(e) {
		$('#works-categories-popin').fadeIn().find('.wrapper').css({marginTop:-30}).animate({marginTop:0});
		e.preventDefault();
	});
	$('#works-categories-popin ').live('click', function(e) {
		if (!$('html').hasClass('oldie')) {
			e.preventDefault();
		}
	});
	$('#works-categories-popin .back').live('click', function(e) {
		$('#works-categories-popin').fadeOut().find('.wrapper').animate({marginTop:-30});
		e.preventDefault();
	});
	
	
	
	/* Works : pagination animation
	 -------------------------------------------------------------- */
	$('#works-pagination .next a').live('hover', function(e) {
		var corner = $(this).siblings('.corner');
		$(this).stop(true, true);
		corner.stop(true, true);
		if ( e.type == 'mouseenter' ) {
			$(this).animate({right:0}, {duration:500, easing:'easeOutCubic'});
			corner.animate({right:20}, {duration:500, easing:'easeOutCubic'}).animate({right:14}, {duration:300});
		} else {
			$(this).delay(550).animate({right:-20}, {duration:300, easing:'easeOutCubic'});
			corner.animate({right:20}, {duration:400}).animate({right:-22}, {duration:300});
		}
	});
	$('#works-pagination .prev a').live('hover', function(e) {
		var corner = $(this).siblings('.corner');
		$(this).stop(true, true);
		corner.stop(true, true);
		if ( e.type == 'mouseenter' ) {
			$(this).animate({left:0}, {duration:500, easing:'easeOutCubic'});
			corner.animate({left:20}, {duration:500, easing:'easeOutCubic'}).animate({left:14}, {duration:300});
		} else {
			$(this).delay(550).animate({left:-20}, {duration:300, easing:'easeOutCubic'});
			corner.animate({left:20}, {duration:400}).animate({left:-22}, {duration:300});
		}
	});
	$('#works-pagination a').live('click', function(e) {
		if (!$('html').hasClass('oldie')) {
			e.preventDefault();
		}
	});
	
	
	
	/* Work : pagination handler
	 -------------------------------------------------------------- */
	$('#work-pages a').live('click', function(e) {
		if (!$(this).hasClass('current')) {
			var current = Number($('#work').attr('data-current'));
			var attachments = $('#attachments > div');
			var wrapper = $('#work .wrapper');
			var horizontalWrapper = $('#work .horizontal-wrapper');
			var nextIndex = '';
			var next = '';
			
			nextIndex = $(this).parent().index();
			
			$('#work').attr('data-current', nextIndex);
			next = attachments.eq(nextIndex);
			
			var imageLoader = $('#image-loader');
			imageLoader.animate({height:5});
				
			horizontalWrapper.fadeOut(300, function() { 
				horizontalWrapper.css({background:''}).removeClass('video');
				wrapper.attr('class', 'wrapper '+next.attr('class'));
				
				if (next.hasClass('embed')) {
					var embed = next.html();
					embed = embed.substring(4, embed.length-3);
					wrapper.html(embed);
					
					horizontalWrapper.addClass('video');
					horizontalWrapper.fadeIn(300);
					
					imageLoader.animate({height:0});
				} else if (next.hasClass('image')) {
					var image = $('<img src="'+next.attr('data-src')+'" alt="" />');
					
					if (next.hasClass('centered')) {
						horizontalWrapper.attr('style', function(i, val) { return val+' '+next.attr('style'); });
					}
					
					wrapper.html(image);
					image.load(function() {
						resizeWork();
						horizontalWrapper.fadeIn(300);
						imageLoader.animate({height:0});
					});
					
				}
				
			});
			
			$('#work-pages .current').removeClass('current');
			$(this).addClass('current');
		}
		e.preventDefault();
	}).live('hover',function(e) {
		if (e.type == 'mouseenter') {
			$(this).animate({'background-position':'0 0'}, {duration:200, easing:'easeInOutExpo'});
		} else {
			$(this).animate({'background-position':'0 5px'}, {duration:200, easing:'easeInOutExpo'});
		}
	});
	
	
	/* Work : toolbar tooltip handler
	 -------------------------------------------------------------- */
	$('#work-toolbar a, #work-back a').live('hover', function(e) {
		if (!$(this).hasClass('opened')) {
			var tooltip = $(this).siblings('.tooltip');
			
			tooltip.stop(true, true);
			
			if ( e.type == 'mouseenter' ) {
				if (tooltip.css('bottom') == '35px') {
					tooltip.css({opacity:0, display:'block', marginBottom:-10}).animate({opacity:1, marginBottom:0}, {duration:300, easing:'easeOutExpo'}).show();
				} else {
					tooltip.css({opacity:0, display:'block', marginRight:-10}).animate({opacity:1, marginRight:0}, {duration:300, easing:'easeOutExpo'}).show();
				}
			} else {
				if (tooltip.css('bottom') == '35px') {
					tooltip.animate({opacity:0, marginBottom:-10}, {duration:200, complete:function() { $(this).hide() }});
				} else {
					tooltip.animate({opacity:0, marginRight:-10}, {duration:200, complete:function() { $(this).hide() }});
				}
			}
		}
	});
	
	$('#work-toolbar .info > a').live('click', function(e) {
		var description = $(this).siblings('.description');
		if (description.css('opacity') == 0) {
			$(this).addClass('opened');
			description.css({opacity:0, display:'block', marginBottom:-10}).animate({opacity:1, marginBottom:0}, {duration:300, easing:'easeOutExpo'}).show();
		} else {
			$(this).removeClass('opened');
			description.animate({opacity:0, marginBottom:-10}, {duration:200, complete:function() { $(this).hide() }});
		}
		
		e.preventDefault();
	})
	
	/*
	$('#work-back a').live('click', function(e) {
		if (history.length > 2) {
			history.back()
		} else {
			$.address.value('/works');
		}
		e.preventDefault();
	});
	*/	
	
	
	/* Page ajax loading
	 -------------------------------------------------------------- */
	var firstLoad = true;
	
	if (!$('html').hasClass('oldie')) {
		$.address.change(function(event) {
			var url = event.value;
			
			if (firstLoad) {
				$('#loader').removeClass('front');
				
				if (window.location.pathname != window.location.hash.substring(1) && window.location.hash.substring(1) != "") {
					// rien
				} else {
					$('#ajax-container').children().not('.popin, #attachments').fadeIn(0);
					$(window).load(function() {
						resizeHandler();
						$('#loader').fadeOut();
					});
					
					firstLoad = false;
					
					return;
				}
			}
			
			if(url.indexOf('work/') === 1) {
				$('#fwa').fadeOut();
			} else {
				$('#fwa').fadeIn();
			}
			
			$('#loader').fadeIn(300);
			$('#ajax-container').children().delay(300).hide(1);
			
			$.get(url, function(data) {
				var dataHtml = $(data);
				var container = dataHtml.find('#ajax-container');
				
				$('#ajax-container').after(container).remove();
				
				if ($('#ajax-container').find('.wpcf7').length > 0) {
					wpcf7Init();
				}
				
				hideLoader();
			}).error(function() { window.location = '/404'; });
			 
		});
	} else {
		window.onload = function() { resizeHandler(); }
		resizeHandler();
		firstLoad = false;
	}

	function hideLoader() {
		$('#ajax-container').children().not('.popin, #attachments').fadeIn(0);
		
		if ($('#work .horizontal-wrapper img').length > 0) {
			$('#work .horizontal-wrapper img').load(function() {
				resizeWork();
				$('#loader').delay(300).fadeOut();
			});
		} else if ($('#works img').length > 0) {
			 $('#works img').load(function() {
				$('#loader').fadeOut();
			});
		} 
		else {
			$('#loader').fadeOut();
		}
	}

	
	/* Initialize wpcf7 forms
	 -------------------------------------------------------------- */
	function wpcf7Init() {
		try {
			if (typeof _wpcf7 == 'undefined' || _wpcf7 === null)
				_wpcf7 = {};

			_wpcf7 = $.extend({ cached: 0 }, _wpcf7);

			$('div.wpcf7 > form').ajaxForm({
				beforeSubmit: function(formData, jqForm, options) {
					jqForm.wpcf7ClearResponseOutput();
					jqForm.find('img.ajax-loader').css({ visibility: 'visible' });
					return true;
				},
				beforeSerialize: function(jqForm, options) {
					jqForm.find('.wpcf7-use-title-as-watermark.watermark').each(function(i, n) {
						$(n).val('');
					});
					return true;
				},
				data: { '_wpcf7_is_ajax_call': 1 },
				dataType: 'json',
				success: function(data) {
					var ro = $(data.into).find('div.wpcf7-response-output');
					$(data.into).wpcf7ClearResponseOutput();

					if (data.invalids) {
						$.each(data.invalids, function(i, n) {
							$(data.into).find(n.into).wpcf7NotValidTip(n.message);
						});
						ro.addClass('wpcf7-validation-errors');
					}

					if (data.captcha)
						$(data.into).wpcf7RefillCaptcha(data.captcha);

					if (data.quiz)
						$(data.into).wpcf7RefillQuiz(data.quiz);

					if (1 == data.spam)
						ro.addClass('wpcf7-spam-blocked');

					if (1 == data.mailSent) {
						$(data.into).find('form').resetForm().clearForm();
						ro.addClass('wpcf7-mail-sent-ok');

						if (data.onSentOk)
							$.each(data.onSentOk, function(i, n) { eval(n) });
					} else {
						ro.addClass('wpcf7-mail-sent-ng');
					}

					if (data.onSubmit)
						$.each(data.onSubmit, function(i, n) { eval(n) });

					$(data.into).find('.wpcf7-use-title-as-watermark.watermark').each(function(i, n) {
						$(n).val($(n).attr('title'));
					});

					ro.append(data.message).slideDown('fast');
				}
			});

			$('div.wpcf7 > form').each(function(i, n) {
				if (_wpcf7.cached)
					$(n).wpcf7OnloadRefill();

				$(n).wpcf7ToggleSubmit();

				$(n).find('.wpcf7-acceptance').click(function() {
					$(n).wpcf7ToggleSubmit();
				});

				$(n).find('.wpcf7-exclusive-checkbox').each(function(i, n) {
					$(n).find('input:checkbox').click(function() {
						$(n).find('input:checkbox').not(this).removeAttr('checked');
					});
				});

				$(n).find('.wpcf7-use-title-as-watermark').each(function(i, n) {
					var input = $(n);
					input.val(input.attr('title'));
					input.addClass('watermark');

					input.focus(function() {
						if ($(this).hasClass('watermark'))
							$(this).val('').removeClass('watermark');
					});

					input.blur(function() {
						if ('' == $(this).val())
							$(this).val($(this).attr('title')).addClass('watermark');
					});
				});
			});

		} catch (e) {
		}
	}
	
	
	
	/* Page 404 : auto redirect
	 -------------------------------------------------------------- */
	if ($('#error-404').length == 1) {
		setTimeout(function() { window.location = '/'; }, 10000);
	}
	
	
	
	/* Fwa animation
	 -------------------------------------------------------------- */
	$('#fwa').live('hover', function(e) {
		var character = $(this).find('span');
		
		
		if (e.type == 'mouseenter') {
			character.stop(true).animate({top:-70}, {duration:1000, easing:'easeOutElastic'});
		} else {
			character.stop(true).animate({top:-495}, {duration:500, easing:'easeInCubic'});
		}
	});
	
	
	/* Window resizing
	 -------------------------------------------------------------- */
	function resizeHandler() {
		resizeWork();
	}
	function resizeWork() {
		if ($('#work .horizontal-wrapper .fullscreen').length == 1) {
			var img = $('#work .horizontal-wrapper .fullscreen img');
			
			var imgRatio = img.get(0).width/img.get(0).height;
			
			var imgWidth = $(window).width();
			var imgHeight = imgWidth/imgRatio;
			
			if (imgHeight < $(window).height()) {
				imgHeight = $(window).height();
				imgWidth = imgHeight*imgRatio;
			}
			
			var gapLeft = ($(window).width()-imgWidth)/2;
			var gapTop = ($(window).height()-imgHeight)/2;
			
			img.css({left:gapLeft, top:gapTop, width:imgWidth, height:imgHeight});
		}
	}
	$(window).resize(resizeHandler);
	resizeHandler();

});
$(function(){
    var rightNav = "";
    rightNav += "<ul class='ccRightNav'>";
    rightNav += "<li><a href='http://www.qijishow.com/' target='_blank'>首页</a></li>";
    rightNav += "<li><a href='http://www.qijishow.com/time.htm' target='_blank'>记录线</a></li>";
    rightNav += "<li><a href='http://www.qijishow.com/share.htm' target='_blank'>分享秀</a></li>";
	rightNav += "<li><a href='http://www.qijishow.com/game/index.htm' target='_blank'>应用站</a></li>";
    rightNav += "<li><a href='http://www.qijishow.com/down/index.htm' target='_blank'>工具箱</a></li>";
	rightNav += "<li><a href='http://www.qijishow.com/book/book.htm' target='_blank'>资讯</a></li>";
    rightNav += "<li><a href='http://www.qijishow.com/xz1/xz.htm' target='_blank'>素材</a></li>";
	rightNav += "<li><a href='http://www.qijishow.com/video.html' target='_blank'>影视</a></li>";
	rightNav += "<li><a href='http://www.qijishow.com/photo.htm' target='_blank'>图片</a></li>";
    rightNav += "<hr>";
    rightNav += "<li class='qrBtn'><a>微信二维码</a></li>";
    rightNav += "<li class='qrBox'><img src='http://www.qijishow.com/img/ewm.jpg' alt='微信二维码'/></li>";
    rightNav += "</ul>";
    $("body").append(rightNav);
    $(".ccRightNav").css({
        "width":"200px",
        "background":"#fff",
        "position":"fixed",
        "border":"1px solid #bababa",
        "padding":"5px 0 0 0",
        "margin":"0",
        "z-index":"1200",
        "display":"none"
    });
    $(".ccRightNav li").css({
        "height":"23px",
        "line-height":"23px",
        "font-size":"12px",
        "list-style":"none",
        "padding":"0",
        "margin":"0 0 4px 0",
        "text-decoration":"none"
    }).mouseover(function(){
        $(this).css("background","#4281f4").find("a,small").css("color","#fff");
    }).mouseleave(function(){
        $(this).css("background","none").find("a").css("color","#111").find("small").css("color","#a6a6a6");
    });
    $(".ccRightNav li a").css({
        "display":"block",
        "padding":"0 25px",
        "margin":"0",
        "color":"#111",
        "text-decoration":"none",
        "font-size":"12px",
        "cursor":"pointer"
    });
    $(".ccRightNav li a small").css({
        "color":"#a6a6a6",
        "font-size":"13px",
        "float":"right"
    });
    $(".ccRightNav hr").css({
        "border":"none",
        "border-bottom":"1px solid #e9e9e9"
    });
    $(".ccRightNav li.qrBox").css({
        "width":$(".ccRightNav").height()-22+"px",
        "height":$(".ccRightNav").height()-22+"px",
        "max-width":"300px",
        "max-height":"300px",
        "position":"absolute",
        "bottom":"-5px",
        "border":"1px solid #bababa",
		"padding":"0",
        "overflow":"hidden",
        "display":"none"
    });
    $(".ccRightNav li.qrBox img").css({
        "width":"100%",
        "height":"100%",
		"margin-left":"0"
    });
    $(".ccRightNav li.qrBtn").mouseover(function(){
        $(".ccRightNav li.qrBox").fadeIn(1);
    }).mouseleave(function(){
        $(".ccRightNav li.qrBox").fadeOut(1);
    });
    $("*").bind("contextmenu",function(e){
        var pointX = (e.pageX)-($(window).scrollLeft()),pointY = (e.pageY)-($(window).scrollTop());
        $(".ccRightNav").css({
            "display":"block"
        });
        if(pointX+600>=$(window).width()){
            $(".ccRightNav").css({
                "right":$(window).width()-pointX+"px",
                "left":"auto"
            });
			$(".ccRightNav li.qrBox").css({
				"right":"200px",
				"left":"auto"
			});
        }else{
            $(".ccRightNav").css({
                "left":pointX+"px",
                "right":"auto"
            });
			$(".ccRightNav li.qrBox").css({
				"left":"200px",
				"right":"auto"
			});
        }
        if($(window).height()-pointY<=$(".ccRightNav").height()){
            $(".ccRightNav").css({
                "bottom":$(window).height()-pointY+"px",
                "top":"auto"
            });
        }else{
            $(".ccRightNav").css({
                "top":pointY+"px",
                "bottom":"auto"
            });
        }
        return false;
    }).click(function(){
        $(".ccRightNav").css("display","none");
    })
});

(function() {
	var click_cnt = 0;
	jQuery(document).ready(function($) {
		$("html").click(function(e) {
			var n = 18;
			var $i;
			click_cnt++;
			if (click_cnt == 10) {
				$i = $("<b></b>").text("OωO");
			} else if (click_cnt == 20) {
				$i = $("<b></b>").text("(๑•́ ∀ •̀๑)");
			} else if (click_cnt == 30) {
				$i = $("<b></b>").text("(๑•́ ₃ •̀๑)");
			} else if (click_cnt == 40) {
				$i = $("<b></b>").text("(๑•̀_•́๑)");
			} else if (click_cnt == 50) {
				$i = $("<b></b>").text("（￣へ￣）");
			} else if (click_cnt == 60) {
				$i = $("<b></b>").text("(╯°口°)╯(┴—┴");
			} else if (click_cnt == 70) {
				$i = $("<b></b>").text("૮( ᵒ̌皿ᵒ̌ )ა");
			} else if (click_cnt == 80) {
				$i = $("<b></b>").text("╮(｡>口<｡)╭");
			} else if (click_cnt == 90) {
				$i = $("<b></b>").text("( ง ᵒ̌皿ᵒ̌)ง⁼³₌₃");
			} else if (click_cnt >= 100 && click_cnt <= 105) {
				$i = $("<b></b>").text("(ꐦ°᷄д°᷅)");
			} else {
				$i = $("<b></b>").text("❤");
				n = Math.round(Math.random() * 14 + 6)
			}
			var x = e.pageX,
				y = e.pageY;
			$i.css({
				"z-index": 9999,
				"top": y - 20,
				"left": x,
				"position": "absolute",
				"color": "#E94F06",
				"font-size": n,
				"-moz-user-select": "none",
				"-webkit-user-select": "none",
				"-ms-user-select": "none"
			});
			$("body").append($i);
			$i.animate({
				"top": y - 180,
				"opacity": 0
			}, 1500, function() {
				$i.remove();
			});
		});
	});
})();