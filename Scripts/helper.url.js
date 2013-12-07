function RootUrl() {
    return app_virtual_dir_name;
}

function notyMsg(layout, text, type) {
    var n = noty({
        text: text,
        type: type,
        dismissQueue: true,
        layout: layout,
        theme: 'defaultTheme'
    });
}
function notyconfirmMsg(layout, text, type,idnum) {
    var n = noty({
        text: text,
        type: type,
        dismissQueue: true,
        layout: layout,
        theme: 'defaultTheme',
        buttons: [
		{ addClass: 'btn btn-primary', text: '确定', onClick: function ($noty) {
		    $noty.close();
		    if (idnum) {
		        delrow(idnum);
		    }
		}
		},
		{ addClass: 'btn btn-danger', text: '关闭', onClick: function ($noty) {
		    $noty.close();
		}
		}
	]
    });
}