package com.peiwan.peiUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * @Author: zhangwanli
 * @Despriction: 通过出生日期获取年龄
 * @Date:Created in 14:42 2019/1/5
 * @Modify by:
 */
public class TeacherDateString {

/*
* */
public static int getAgeByBirth(String birthday) throws ParseException {
    // 格式化传入的时间
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
    Date parse = format.parse(birthday);
    int age = 0;
    try {
        Calendar now = Calendar.getInstance();
        now.setTime(new Date()); // 当前时间

        Calendar birth = Calendar.getInstance();
        birth.setTime(parse); // 传入的时间

        //如果传入的时间，在当前时间的后面，返回0岁
        if (birth.after(now)) {
            age = 0;
        } else {
            age = now.get(Calendar.YEAR) - birth.get(Calendar.YEAR);
            if (now.get(Calendar.DAY_OF_YEAR) > birth.get(Calendar.DAY_OF_YEAR)) {
                age += 1;
            }
        }
        return age;
    } catch (Exception e) {
        return 0;
    }
}

}
