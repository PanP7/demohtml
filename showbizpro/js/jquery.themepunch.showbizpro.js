/**************************************************************************
 * $.themepunch.ShoBiz Pro.js - $ Plugin for ShowBiz Pro Teaser Rotator
 * @version: 1.0 (04.03.2012)
 * @requires $ v1.7 or later
 * @author ThemePunch
**************************************************************************/



(function($,undefined){


	////////////////////////////////////////
	// THE REVOLUTION PLUGIN STARTS HERE //
	///////////////////////////////////////

	$.fn.extend({

		///////////////////////////
		// MAIN PLUGIN  FUNCTION //
		///////////////////////////
		showbizpro: function(options) {

				$.fn.showbizpro.defaults = {
					entrySizeOffset:0,
					containerOffsetRight:0,
					heightOffsetBottom:0,
					carousel:"off",
					visibleElementsArray:[4,3,2,1],
					mediaMaxHeight:[0,0,0,0],
					ytMarkup:"<iframe src='http://www.youtube.com/embed/%%videoid%%?hd=1&amp;wmode=opaque&amp;autohide=1&amp;showinfo=0&amp;autoplay=1'></iframe>",
					vimeoMarkup:"<iframe src='http://player.vimeo.com/video/29298709?title=0&amp;byline=0&amp;portrait=0;api=1&amp;autoplay=1'></iframe>",
					closeOtherOverlays:"off",
					allEntryAtOnce:"off",
					dragAndScroll:"off"

				};

				options = $.extend({}, $.fn.showbizpro.defaults, options);


				return this.each(function() {

					var container=$(this);

					// SAVE THE DEFAULT OPTIONS
					container.data('eoffset',options.entrySizeOffset);
					container.data('croffset',options.containerOffsetRight);
					container.data('hboffset',options.heightOffsetBottom);
					if (options.carousel=="on")
						container.data('carousel',1)
					else
						container.data('carousel',0);

					container.data('ytmarkup',options.ytMarkup);
					container.data('vimeomarkup',options.vimeoMarkup);
					container.data('vea',options.visibleElementsArray);
					container.data('coo',options.closeOtherOverlays);
					container.data('allentry',options.allEntryAtOnce);
					container.data('mediaMaxHeight',options.mediaMaxHeight);
					container.data('das',options.dragAndScroll);

					container.data('ie',!$.support.opacity);
					container.data('ie9',(document.documentMode == 9));

					// Delegate .transition() calls to .animate()
					// if the browser can't do CSS transitions.
					if (!$.support.transition)
						$.fn.transition = $.fn.animate;


					var tr = container.find('.showbiz');

					/*tr.css({'height':'200px'});
					tr.find('ul').css({'height':'200px'});
					tr.find('.overflowholder').css({'height':'200px'});
					container.css({'height':'200px'});*/




					// IF DRAG AND SCROLL FUNCTION IS ACTIVATED....
					if (options.dragAndScroll=="on") {

						// CALL THE SWIPE FUNCTION TO THE ITEM
						tr.find('.overflowholder').overscroll({

						})



					}

					initTeaserRotator(container,tr);

					// INIT THE REVEAL FUNCTIONS
					initRevealContainer(container,tr);

					// FIT VIDEO SIZES IN DIFFERENT COTAINERS
					try {
						container.find('.mediaholder_innerwrap').each(function() {
							$(this).fitVids();
						});
					} catch(e) {}

					// SOME HOVER EFFECTS
					initHoverAnimations(container);
				})

			},

		///////////////////////
		// METHODE RESUME    //
		//////////////////////
		showbizredraw: function(option) {
				return this.each(function() {
					// CATCH THE CONTAINER
					var container=$(this);
					var tr = container.find('.showbiz');
					rebuildTeasers(200,container,tr);
				})
		}

		
	})



		////////////////////////////
		// INIT HOVER ANINATIONS //
		////////////////////////////
		function initHoverAnimations(container) {

			container.find('.show_on_hover, .hovercover').each(function() {

				var li=$(this).closest('li');

				if (container.data('ie9') || container.data('ie'))
							$(this).animate({'opacity':0},{duration:200,queue:false});
						 else
						 	$(this).transit({'opacity':0},{duration:200,queue:false});

				li.hover(function() {

					$(this).find('.show_on_hover, .hovercover').each(function() {
						var maxop=1;
						if ($(this).data('maxopacity')!=undefined) maxop=$(this).data('maxopacity');

						if (container.data('ie9') || container.data('ie'))
							$(this).animate({'opacity':maxop},{duration:200,queue:false});
						 else
						 	$(this).transit({'opacity':maxop},{duration:200,queue:false});
					})
				},
				function() {
					$(this).find('.show_on_hover, .hovercover').each(function() {
						if (container.data('ie9') || container.data('ie'))
							$(this).animate({'opacity':0},{duration:200,queue:false});
						 else
						 	$(this).transit({'opacity':0},{duration:200,queue:false});
					})

				});
			})
		}



		////////////////////////////
		// INIT REVEAL ITEMS HERE //
		////////////////////////////
		function initRevealContainer(container,tr) {
			container.find('.reveal_opener').each(function() {
				var ro=jQuery(this);
				ro.click(function() {

					// IDENTIFICATE WHERE THE REVEAL CONTAINER IS
					if (ro.parent().hasClass('reveal_container'))
						var rop = ro.parent();
					else
						var rop = ro.parent().find('.reveal_container');

					// CHECK IF OVERLAY OPEN OR CLOSED
					if (rop.hasClass("revactive")) {

						// IF OPENED THEN LET IT CLOSE
						rop.removeClass("revactive");
						ro.removeClass("revactive");
						rop.closest('li').removeClass("revactive");
						if (container.data('ie9') || container.data('ie')) {
							rop.find('.reveal_wrapper').css({'visibility':'visible'}).animate({height:'0px', 'opacity':0},{duration:300});
						} else {
							rop.find('.reveal_wrapper').css({'visibility':'visible'}).transit({height:'0px', 'opacity':0},{duration:300});
						}


						// REMOVE THE VIDEO CONTAINER CONTENTS
						rop.find('.sb-vimeo-markup, .sb-yt-markup').html("");

						if (rop.hasClass('tofullwidth')) {
							setTimeout(function() {
								rop.appendTo(rop.data('comefrom'));

								rebuildTeasers(200,container,tr);

							},300);
						}
					} else {

						// IF IT IS CLOSED, THEN WE NEED TO OPEN IT
						if (rop.hasClass('tofullwidth')) {
							rop.data('comefrom',rop.parent());
							rop.data('indexli',rop.closest('li').index());
							rop.appendTo(rop.closest('.showbiz'));
													}
						setTimeout(function() {
							// CLOSE ALL OTHER OPENED OVERLAYS
							if (container.data('coo') == "on")
								rop.closest('ul').find('.reveal_opener').each(function(i) {
									if ($(this).hasClass("revactive")) $(this).click();
								})

							rop.addClass("revactive");
							ro.addClass("revactive");
							rop.closest('li').addClass("revactive");
							if (container.data('ie9') || container.data('ie')) {
								rop.find('.reveal_wrapper').css({'visibility':'visible'}).animate({height:'100%', 'opacity':1},{duration:300});
							} else {
								rop.find('.reveal_wrapper').css({'visibility':'visible'}).transit({height:'100%', 'opacity':1},{duration:300});
							}


							// AUTO EMBED VIMEO AND YOUTUBE VIDEOS ON DEMAND
							rop.find('.sb-vimeo-markup, .sb-yt-markup').each(function() {
								var video = $(this);

								if (video.hasClass("sb-vimeo-markup"))
									var basic = container.data('vimeomarkup');
								else
									var basic = container.data('ytmarkup');

								var basic= basic.split('%%videoid%%')[0]+video.data('videoid')+basic.split('%%videoid%%')[1];

								video.append(basic);
								try{ video.fitVids(); } catch(e) { }
							});


							setTimeout(function() {setRevContHeight(container,tr);},500);
						},100);
					}
				});
			});
		}


		//////////////////////////////////////////////////
		// CALCULATE THE HEIGHT OF THE REVEAL CONTAINER //
		//////////////////////////////////////////////////
		function setRevContHeight(container,tr) {
			var revc=container.find('.tofullwidth.revactive .heightadjuster');

			var ul = tr.find('ul');
			var dif = parseInt(revc.parent().css('paddingTop'),0) + parseInt(revc.parent().css('paddingBottom'),0);

			var hbo=0;
			if (container.data('hboffset')!=undefined) hbo=container.data('hboffset');

			var nh = hbo + dif +revc.outerHeight(true);

			if (container.data('ie9') || container.data('ie')) {
				ul.animate({height:nh+"px"},{duration:300,queue:false});
				ul.parent().animate({height:nh+"px"},{duration:300,queue:false});

			} else {
				ul.transit({height:nh+"px",duration:300,queue:false});
				ul.parent().transit({height:nh+"px",duration:300,queue:false});
			}

		}



		///////////////////////////////////////
		// FUNCTION HOVER ON SQUARE ELEMENTS //
		///////////////////////////////////////
		function initTeaserRotator(container,tr) {

			var car= container.data('carousel');
			var lb = jQuery(tr.data('left'));
			var rb = jQuery(tr.data('right'));

			var di = container.width();

			//container.css({"overflow":"hidden"});
			lb.data('teaser',tr);
			rb.data('teaser',tr);


			tr.data('offset',0);

			rebuildTeasers(0,container,tr);

			container.find('img').each(function() {
				jQuery(this).parent().waitForImages(function() {
					//rebuildTeasers(200,container,tr);

				});
			})


			// THE RIGHT CLICK EVENT ON TEASER ROTATOR
			// THE LEFT CLICK EVENT ON TEASER ROTATOR
			rb.click(function() {


				// IF FULLWIDTH REVACTIVE IS ALREADY ON
				if (container.find('.tofullwidth.revactive .heightadjuster').length>0) {
					var activerev_index=container.find('.tofullwidth.revactive').data('indexli');
					var newindex=activerev_index+2;
					if (newindex>container.find('ul:first-child li').length) newindex=1;
					container.find('.tofullwidth.revactive').addClass("sb-removemesoon");
					setTimeout(function() {
						container.find('.tofullwidth.revactive.sb-removemesoon .reveal_opener').click();
						container.find('.sb-removemesoon').each(function() {$(this).removeClass('sb-removemesoon');});
					},350);

					container.find('ul:first-child li:nth-child('+newindex+')').find('.reveal_opener').click();


				} else {


						if (rb.data('inmove')!=1) {
							var tr=jQuery(jQuery(this).data('teaser'));

							var ul = tr.find('ul:first-child');

							var off=ul.find('>li:first-child').offset().left;

							if (car==1 && off<0) {
									rb.data('inmove',1);
									tr.data('offset',tr.data('offset')-1);
									rebuildTeasers(0,container,tr);
									ul.find('>li:first-child').appendTo(ul);
									tr.data('offset',tr.data('offset')+1);
									rebuildTeasers(200,container,tr);
									setTimeout(function() { rb.data('inmove',0);},350);
							} else {
								rb.data('inmove',1);
								var moveit=1;

								var di=container.width();
								if (container.data('allentry')=="on") {
									if (di>980)  { moveit=container.data('vea')[0]; }
									if (di<981 && di>768)  { moveit=container.data('vea')[1];}
									if (di<769 && di>420)  { moveit=container.data('vea')[2]; }
									if (di<421 && di>320)  { moveit=container.data('vea')[3]; }
									if (di<321)  		   { moveit=container.data('vea')[4]; }
								}

								tr.data('offset',tr.data('offset')+moveit);
								rebuildTeasers(200,container,tr);
								setTimeout(function() { rb.data('inmove',0);},350);
							}
						 }
				 }
				 return false;
			});


			// THE LEFT CLICK EVENT ON TEASER ROTATOR
			lb.click(function() {

				// IF FULLWIDTH REVACTIVE IS ALREADY ON
				if (container.find('.tofullwidth.revactive .heightadjuster').length>0) {
					var activerev_index=container.find('.tofullwidth.revactive').data('indexli');
					var newindex=activerev_index-1;
					if (newindex<=0) newindex=container.find('ul:first-child li').length;
					container.find('.tofullwidth.revactive').addClass("sb-removemesoon");
					setTimeout(function() {
						container.find('.tofullwidth.revactive.sb-removemesoon .reveal_opener').click();
						container.find('.sb-removemesoon').each(function() {$(this).removeClass('sb-removemesoon');});
					},350);

					container.find('ul:first-child li:nth-child('+newindex+')').find('.reveal_opener').click();

				}  else {

						if (lb.data('inmove')!=1) {
							var tr=jQuery(this).data('teaser');
							var ul = tr.find('ul:first-child');
							var off=ul.find('>li:first-child').offset().left;

							if (car==1 && off>=0) {
									lb.data('inmove',1);
									tr.data('offset',tr.data('offset')+1);
									rebuildTeasers(0,container,tr);
									ul.find('>li:last-child').prependTo(ul);
									tr.data('offset',tr.data('offset')-1);
									rebuildTeasers(200,container,tr);
									setTimeout(function() { lb.data('inmove',0);},350);
							} else {
								lb.data('inmove',1);
								var moveit=1;

								var di=container.width();
								if (container.data('allentry')=="on") {
									if (di>980)  { moveit=container.data('vea')[0]; }
									if (di<981 && di>768)  { moveit=container.data('vea')[1];}
									if (di<769 && di>420)  { moveit=container.data('vea')[2]; }
									if (di<421 && di>320)  { moveit=container.data('vea')[3]; }
									if (di<321)  		   { moveit=container.data('vea')[4]; }
								}

								tr.data('offset',tr.data('offset')-moveit);
								rebuildTeasers(200,container,tr);
								setTimeout(function() { lb.data('inmove',0);},350);
							}
						}
					}
					return false;
			});


			if (container.data('das')!="on")
				container.swipe( {data:container,
											swipeRight:function()
													{

														lb.click();
													},
											swipeLeft:function()
													{

														rb.click();
													},
											excludedElements:".reveal_opener, a,  .linkicon, .notalone, .lupeicon, .hovercover, .showbiz-navigation, .sb-navigation-left, .sb-navigation-right",
										allowPageScroll:"auto"} );



			var timeouts;



			// IF WINDOW IS RESIZED, TEASER SHOUL REPOSITION ITSELF
			jQuery(window).resize(function() {
				clearTimeout(timeouts);
				timeouts= setTimeout(function() {
						tr.data('offset',0);
					   rebuildTeasers(0,container,tr);
				},150);
			});





			if (car==1) {
				rb.data('inmove',1);
				lb.data('inmove',1);
			}


			for (var j=0;j<3;j++) {
				jQuery(window).data('teaserreset',setTimeout(function() {
					rebuildTeasers(200,container,tr);
				},j*500));

				if (j==2)
					setTimeout(function() {
						rb.data('inmove',0);
						lb.data('inmove',0);
					},(j*500)+200);

			}



		}



		/////////////////////////////////////////////////////
		// FUNCTION TO REPOSITION AND REBUILD THE TEASERS //
		////////////////////////////////////////////////////

		function rebuildTeasers(speed,container,tr) {

					var car= container.data('carousel');
					var ul = tr.find('ul');
					var offset=tr.data('offset');
					var di = container.width();
					var padds = parseInt(tr.css('paddingLeft'),0) + parseInt(tr.css('paddingRight'),0);
					di=di-padds;



					var ul = tr.find('ul:first');
					maxitem=ul.find('>li').length;
					var rb=$(tr.data('right'));
					rb.removeClass('notclickable');

					var lb=$(tr.data('left'));
					lb.removeClass('notclickable');

					var visibleamount=container.data('vea')[0];
					var marray=container.data('mediaMaxHeight');

					if (di>980)  {
						visibleamount=container.data('vea')[0];

						try{
								if (marray[0] !=0)
								container.find('.mediaholder_innerwrap').each(function() {
											$(this).css({'maxHeight':marray[0]+"px"});
								});
							} catch(e) {  }
					}
					if (di<981 && di>768)  {
						visibleamount=container.data('vea')[1];
						try{
								if (marray[1] !=0)
								container.find('.mediaholder_innerwrap').each(function() {
											$(this).css({'maxHeight':marray[1]+"px"});
								});
							} catch(e) {  }
					}
					if (di<769 && di>420)  {
						visibleamount=container.data('vea')[2];
						try{
								if (marray[2] !=0)
								container.find('.mediaholder_innerwrap').each(function() {
											$(this).css({'maxHeight':marray[2]+"px"});
								});
							} catch(e) {  }

					}
					if (di<421 && di>320)  {
						visibleamount=container.data('vea')[3];
						try{
								if (marray[3] !=0)
								container.find('.mediaholder_innerwrap').each(function() {
											$(this).css({'maxHeight':marray[3]+"px"});
								});
							} catch(e) {  }
					}

					if (di<321)  {
						visibleamount=container.data('vea')[4];
						try{
								if (marray[4] !=0)
								container.find('.mediaholder_innerwrap').each(function() {
											$(this).css({'maxHeight':marray[4]+"px"});
								});
							} catch(e) {  }
					}					



					if (car!=1) {
							if (offset>=maxitem-visibleamount) {
										offset=maxitem-visibleamount;
										rb.addClass("notclickable");
							}


							if (offset<=0) {
								offset=0;
								lb.addClass("notclickable");
							}
					}

					var space = ul.find('>li:first-child').outerWidth(true) - ul.find('>li:first-child').width();

					var eo=0;
					if (container.data('eoffset')!=undefined) eo=container.data('eoffset') * (visibleamount-1);

					var cro=0;
					if (container.data('croffset')!=undefined) cro=container.data('croffset');



					step=(di-((visibleamount-1)*space)) / visibleamount;
					step=step-eo;



					tr.data('offset',offset);


					ul.find('>li').each(function() { $(this).width(step) });
					step=ul.find('li:first').outerWidth(true);
					tr.data('step',step);

					ul.css({'width':'10000px'});

					
					if (speed==0)
						ul.css({'left':(0 - (step*offset))+"px"});
					else {
						//if (container.data('ie9') || container.data('ie')) {
							ul.animate({'left':(0 - (step*offset))+"px"},{duration:speed,queue:false});
						//} else {
						//	ul.transit({'left':(0 - (step*offset))+"px",duration:speed,queue:false});
						//}
					}

					// SET THE HEIGHTS OF THE OUTTER CONTIANER

					var hbo=0;
					if (container.data('hboffset')!=undefined) hbo=container.data('hboffset');
					setTimeout(function() {
							var aktheight=0;
							ul.find('li').each(function(){

									if ($(this).outerHeight(true)>aktheight) aktheight=$(this).outerHeight(true);


							});
							setTimeout(function() {
								if (step>100) {
									var last=ul.find('>li:last-child');
									var w=(last.position().left+last.outerWidth(true))+space;

									ul.css({'width':w+"px"});

								}
							},200);

							if (container.find('.tofullwidth.revactive .heightadjuster').length>0) {

								setRevContHeight(container,tr)
							} else {
								if (container.data('ie9') || container.data('ie')) {
									ul.animate({height:(aktheight+hbo)+"px"},{duration:300, queue:false});
									ul.parent().animate({height:(aktheight+hbo)+"px"},{duration:300,queue:false});
								} else {
									ul.transit({height:(aktheight+hbo)+"px",duration:300, queue:false});
									ul.parent().transit({height:(aktheight+hbo)+"px",duration:300,queue:false});
								}
							}


					 },speed+210)


		}




})($);




