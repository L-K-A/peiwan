package com.peiwan.Utils;

import java.io.UnsupportedEncodingException;
import java.util.Base64;

public class baseCoverString {
    public   String baseCoverStr(String string) {
        if (null != string) {
            Base64.Decoder decoder = Base64.getDecoder();
            try {
                return new String(decoder.decode(string.getBytes()), "GBK");
            } catch (UnsupportedEncodingException e) {
                return null;
            }
        }
        return null;
    }
}
