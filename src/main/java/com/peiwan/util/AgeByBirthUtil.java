package com.peiwan.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * @Author: Zhou先生
 * @Despriction:
 * @Date:Created in 16:33 2019/1/10
 * @Modify by:
 */
public class AgeByBirthUtil {
    /*将出生日期转化为年龄*/
    public static int getAgeByBirth(String birthday) throws ParseException {
        //String LockDates = birthday.substring(0, 4) + "-" + birthday.substring(4, 6) + "-" + birthday.substring(6, 8);
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
