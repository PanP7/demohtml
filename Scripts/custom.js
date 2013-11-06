jQuery.noConflict()(function($){
	"use strict";
	$(document).ready(function() {

		$('p:empty, .nav-next-top:empty, .nav-previous-top:empty').remove();

		$('.sf-menu').css({'display':'block'});

		$("a").has("img").css({
			"border": "0 none"
		});

//
//	jQuery Toggles
//
 $(".ct_faq .entry-faq").hide();
    $(".ct_faq .entry-title").click(function() {
        $(this).toggleClass("active").next().slideToggle("slow");
        return false; //Prevent the browser jump to the link anchor
    });

    $("a[href='" + window.location.hash + "']").parent(".ct_faq .entry-title").click();






	});
});

/*-------------------------------------------------*/
/*	Pretty Photo
/*-------------------------------------------------*/
jQuery.noConflict()(function($){
	"use strict";
	$(document).ready(function() {

		$('a[data-rel]').each(function() {
			$(this).attr('rel', $(this).data('rel'));
		});

		$("a[rel^='prettyPhoto']").prettyPhoto({
			animationSpeed: 'normal', /* fast/slow/normal */
			opacity: 0.80, /* Value between 0 and 1 */
			showTitle: true, /* true/false */
			theme:'light_square',
			deeplinking: false
		});
		
	});
});


jQuery.noConflict()(function($){
	"use strict";
	$(document).ready(function() {
		$("<select />").appendTo(".navigation");
		$("<option />",{
			"selected":"selected",
			"value":"",
			"text":"Go to..."
		}).appendTo(".navigation select");
		$(".navigation li a").each(function() {
			var el = $(this);
			$("<option />",{
				"value":el.attr("href"),
				"text":el.text()
			}).appendTo(".navigation select");
		});
		$(".navigation select").change(function() {
			window.location = $(this).find("option:selected").val();
		});
	});
});


		
/***************************************************
			SuperFish Menu
***************************************************/	
jQuery.noConflict()(function(){
		"use strict";
		jQuery('ul.sf-menu').superfish({
			delay:400,
			autoArrows:true,
			dropShadows:false,
			animation:{ opacity:'show', height:'show'},
			animationOut:  {opacity:'hide'}
		});
});


/*-------------------------------------------------*/
/*	CUSTOM BACKGROUND
/*-------------------------------------------------*/
jQuery(window).load(function() {    
	"use strict";
	var theWindow		= jQuery(window),
		$bg				= jQuery("#bg-stretch"),
		aspectRatio		= $bg.width() / $bg.height();

	function resizeBg() {
			
		if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
			$bg
				.removeClass()
				.addClass('bg-height');
		} else {
			$bg
				.removeClass()
				.addClass('bg-width');
		}

			var pW = (theWindow.width() - $bg.width())/2;
						$bg.css("left", pW);
			var pH = (theWindow.height() - $bg.height())/2;
						$bg.css("top", pH);

	}

	theWindow	.resize(function() {
		resizeBg();
	}).trigger("resize");

});