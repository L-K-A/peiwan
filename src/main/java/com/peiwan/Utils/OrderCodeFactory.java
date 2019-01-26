package com.peiwan.Utils;

import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

@Service
public class OrderCodeFactory {
    /*
    * 生成订单号
    * */
    public String getOrderIdByTime() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String newDate = sdf.format(new Date());
        String result = "";
        Random random = new Random();
        for (int i = 0; i < 8; i++) {
            result += random.nextInt(10);
        }
        return newDate + result;
    }
    public String getOrderByDate(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String newDate = sdf.format(new Date());
        return newDate;
    }
}
