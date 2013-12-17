$(document).ready(function () {
    if (getCookie("cartAmount")) {
        $("#cartAmount").html("￥"+getCookie("cartAmount"));
    } else {
        $("#cartAmount").html("￥0.00");
    }
})
function DataSet() {
    var data = [
                { Phone: [
                   {
                       Id:1,
                       Brand: "苹果 Apple",
                       Type: "iPhone 5(16G)",
                       Description: "苹果 iPhone 5(16G) 3G智能手机(黑配碳黑色）",
                       Price: "4880",
                       marketPrice: "5888",
                       Integral: "24",
                       Color: "黑色",
                       ProNumber: "EZG2013032803573240",
                       Images: [
                            { url: "http://113.247.222.77:5222/2013/03/28/EZG2013032803573240/20130328155853.jpg" }
                       ]
                   }
                ],
                    Pad: [
                    {
                        Id:2,
                        Brand: "海信 Hisense",
                        Type: "iTV F270BW",
                        Description: "Hisense/海信 Hisense iTV F270BW 7英寸通话平板电脑 IPS屏 双核 3G上网 通话短信 导航 每人限购1台 多拍不发货",
                        Price: "999",
                        marketPrice: "1399",
                        Integral: "79.2",
                        Color: "白色",
                        ProNumber: "EZG2013032803573240",
                        Images: [
                            { url: "http://113.247.222.77:5222/2013/09/17/EZG201309170302081279/20130917150658.jpg" },
                            { url: "http://113.247.222.77:5222/2013/09/17/EZG201309170302081279/20130917150726.jpg" }
                        ]
                    }
                ]
                },
            ];
    return data;
}
function getAlldata() {
    var alldata = [];
    $.each(DataSet(), function (index, value) {
        $.each(value.Phone, function (i, v) {
            alldata.push(v);

        })
        $.each(value.Pad, function (i, v) {
            alldata.push(v);
        });
    })
    return alldata;
}