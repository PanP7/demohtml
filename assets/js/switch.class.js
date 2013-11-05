//alert($.cookie("css")+" "+$.cookie("css-bg")+" "+$.cookie("css-width"));
			
			jQuery(function($){
			
				if($.cookie("css")!=null)
				{
					$("#style-schem").attr("href",$.cookie("css"));
				}		
				
				if($.cookie("css-bg")!=null && $.cookie("css-width")=="1000")
					$("body").addClass($.cookie("css-bg"));
				
				if($.cookie("css-width"))
				{
					var nw = $.cookie("css-width");
					
					if(nw == "100")
					{
						var nwb = "100%";
						$.cookie("css-bg", null);
					}
					else
					{
						var nwb = "1000px";
					}
					$("div.wide_cont").css("width", nwb);
					$("#page-width option").each(function(){
						if($(this).val()==nw){
							$(this).attr("selected","selected");    
						}
					});
				}
				else
				{
					$("div.wide_cont").css("width", "100%");
				}
				
				$("#page-width").change(function() {
					if($(this).val()==1000)
						var w = "1000";
					else
					{
						var w = "100";
						//$("body").removeClass();
					}
					//$("div.wide_cont").css("width", w);
					$.cookie("css-width", w, {expires: 365});
					
					setTimeout(function(){
						window.location.reload(true);								
					}, 1000);
				});
				
				$("#color-skin a").click(function() {
					$("link#style-schem").attr("href","assets/css/layouts/"+$(this).data('rel')+".css");
					$.cookie("css","assets/css/layouts/"+$(this).data('rel')+".css", {expires: 365});
					
					return false;
				});
				
				$("a.bg-change").click(function(){
					if($("div.wide_cont").css("width")=="1000px")
					{
						$("body").removeClass();
						$("body").addClass($(this).data('rel'));
						
						$.cookie("css-bg",$(this).data('rel'), {expires: 365});
					}
					return false;
				});				
				
				$("#reset").click(function(){
					//$("body").removeClass();
					//$("div.wide_cont").css("width", "100%");
					//$("link#style-schem").attr("href", "");
					//$("#page-width [value=100]").attr("selected", "selected");
					$.cookie("css", null);
					$.cookie("css-width", "100");
					$.cookie("css-bg", null);
					
					setTimeout(function(){
						window.location.reload(true);								
					}, 1000);
				});
				
			});