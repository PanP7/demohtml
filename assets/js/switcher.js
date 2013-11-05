jQuery(function($){
    checkCookie();

    $("#reset").live('click', function(e){
        e.preventDefault();
        del_cookie("theme_pattern");
        del_cookie("theme_bg_img");
        del_cookie("theme_color");
        del_cookie("theme_width");
        setTimeout(function(){
            window.location.reload(true);								
        }, 500);
    });
    
    $("#page-width").live('change', function(){
        var value = $(this).val();
        document.cookie = 'theme_width='+value ; 
        setTimeout(function(){
            window.location.reload(true);								
        }, 1000);
    });
 
    $("#bgpattern a").live('click', function(){
        var value = $(this).data('class');
        $('#page-bg img').remove();

        document.cookie = 'theme_pattern='+value ; 
        if($("body").attr("class")){
            $("body").removeAttr("class");
        }
        $("body").addClass(value);
        del_cookie("theme_bg_img");
        del_cookie("theme_bg");
    });
    
    $("#color-skin a").live('click', function(){
        var value = $(this).data('value');
        document.cookie = 'theme_color='+value ;
        setTimeout(function(){
            window.location.reload(true);								
        }, 1000);
    });

    $("#bgimage a").live('click', function(){
        var value = $(this).data('src');
        $('#page-bg img').remove();
        var img = $('<img >'); //Equivalent: $(document.createElement('img'))
        img.attr('src', value);
        img.appendTo('#page-bg');
        document.cookie = 'theme_bg_img='+value ; 
        del_cookie("theme_pattern");
        del_cookie("theme_bg");
    });

    function getCookie(c_name)
    {
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++)
        {
            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x=x.replace(/^\s+|\s+$/g,"");
            if (x==c_name)
            {
                return unescape(y);
            }
        }
    }

    function checkCookie()
    {
        var pattern= getCookie("theme_pattern");
        if(pattern!= null && pattern != ""){
				
            $('#page-bg img').remove();
            $("body").addClass(pattern);
        }
        
        var theme_width = getCookie("theme_width");
        if(theme_width!= null && theme_width != ""){
	    if(theme_width == "100"){
                theme_width_block = "1000px";
            }else{
                theme_width_block = theme_width;
            }
            $('#content').width(theme_width_block);
            $("#page-width option").each(function(){
                if($(this).val()==theme_width){ // EDITED THIS LINE
                    $(this).attr("selected","selected");    
                }
            });
        }
        
        var bg_img= getCookie("theme_bg_img");
        if(bg_img!= null && bg_img != ""){

            $('#page-bg img').remove();
            var img = $('<img >'); //Equivalent: $(document.createElement('img'))
            img.attr('src', bg_img);
            img.appendTo('#page-bg');
        }
    }

    function del_cookie(name)
    {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

});