$(function() {
	$("img").lazyload({
        threshold :100,
		placeholder : "../images/loading.gif",
		effect : "fadeIn"
	});
	$("ul.sub-navigation").parent().addClass("pos");
	$("ul.navigation li.pos").hover(function(){
		$(this).children().eq(1).css("display","block");
		$(this).children().first().addClass("on");
	}, function(){
		$(this).parent().find("ul.sub-navigation").css("display","none");
		$(this).children().first().removeClass("on");
	});
	$('.notice').totemticker({
        row_height  :   '60px',
        interval    :   6000,
        next        :   '.next',
        previous    :   '.prev',
        mousestop   :   true
    });
    $('#mobile-sidebar-toggle a').click(function(){
        $('.sidebar').slideToggle();
    });
    $('.donate-btn a').click(function () {
        $('.donate-box').slideToggle();
    });
});
