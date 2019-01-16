var appid = 'dsQIsvEEt22a2B72';
var web_domain = 'static/js';
if (!userid) {
    var userid = '';
}
if (!sceneId) {
    var sceneId = '';
}
if (!staffId) {
    var staffId = '';
}
if (!nickname) {
    var nickname = '';
}
if (!group) {
    var group = '';
}
function kefuWindow() {
    var iHeight = 600;
    var iWidth = 800;
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
    window.open(web_domain + "/im/text/" + appid + ".html?userid=" + userid + "&nickname=" + nickname + "&group=" + group + "&staffId=" + staffId + "&sceneId=" + sceneId, "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=" + iWidth + ", height=" + iHeight + ",top=" + iTop + ",left=" + iLeft + "");
}