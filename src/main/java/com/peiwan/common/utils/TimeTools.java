package com.peiwan.common.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @description: 获取当前时间工具类
 * @program: peiwan
 * @author: 张家明
 * @create: 2019-01-24 09:59
 **/

public class TimeTools {

    public String currentTime(){
        //获取当前时间
        Date currentTime = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        return formatter.format(currentTime);
    }

}
