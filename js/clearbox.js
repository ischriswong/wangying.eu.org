function show() {
    document.getElementById("top1").style.display = "block";
    document.getElementById("top2").style.display = "none";

}
function show1() {
    document.getElementById("top1").style.display = "none";
    document.getElementById("top2").style.display = "block";
 
}

var	CB_ScriptDir='clearbox';
var	CB_Language='en';



//
//	ClearBox load:
//

	var CB_Scripts = document.getElementsByTagName('script');
	for(i=0;i<CB_Scripts.length;i++){
		if (CB_Scripts[i].getAttribute('src')){
			var q=CB_Scripts[i].getAttribute('src');
			if(q.match('clearbox.js')){
				var url = q.split('clearbox.js');
				var path = url[0];
				var query = url[1].substring(1);
				var pars = query.split('&');
				for(j=0; j<pars.length; j++) {
					par = pars[j].split('=');
					switch(par[0]) {
						case 'config': {
							CB_Config = par[1];
							break;
						}
						case 'dir': {
							CB_ScriptDir = par[1];
							break;
						}
						case 'lng': {
							CB_Language = par[1];
							break;
						}
					}
				}
			}
		}
	}

	if(!CB_Config){
		var CB_Config='default';
	}

	document.write('<link rel="stylesheet" type="text/css" href="'+CB_ScriptDir+'/config/'+CB_Config+'/cb_style.css" />');
	document.write('<script type="text/javascript" src="'+CB_ScriptDir+'/config/'+CB_Config+'/cb_config.js"></script>');
	document.write('<script type="text/javascript" src="'+CB_ScriptDir+'/language/'+CB_Language+'/cb_language.js"></script>');
	document.write('<script type="text/javascript" src="'+CB_ScriptDir+'/core/cb_core.js"></script>');

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