<<<<<<< HEAD
function encrypt(a) {
    var c = $("#publicKey")[0].innerHTML, b = new JSEncrypt;
    b.setPublicKey(c);
    return b.encrypt(a)
}

function encrypt_general(a) {
    var c = publicKey, b = new JSEncrypt;
    b.setPublicKey(c);
    return b.encrypt(a)
}

function packSendData_general(a) {
    a = "||tuwan|" + JSON.stringify(a);
    return encrypt_general(a)
}

function packSendData(a) {
    a = "||tuwan|" + JSON.stringify(a);
    return encrypt(a)
};

=======
﻿function encrypt(a){var c=$("#publicKey")[0].innerHTML,b=new JSEncrypt;b.setPublicKey(c);return b.encrypt(a)}function encrypt_general(a){var c=publicKey,b=new JSEncrypt;b.setPublicKey(c);return b.encrypt(a)}function packSendData_general(a){a="||tuwan|"+JSON.stringify(a);return encrypt_general(a)}function packSendData(a){a="||tuwan|"+JSON.stringify(a);return encrypt(a)};
>>>>>>> 62f535f901c014b9188b44f6c4b3b6f12f87f396
