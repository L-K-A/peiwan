var publicKey = "";
getRSAKey();

function getRSAKey() {
    $.ajax({
        type: "get",
        url: "",
        dataType: "jsonp",
        jsonp: "callback",
        success: function (a) {
            publicKey = 1037 == a.code ? a.data : ""
        }
    })
};
