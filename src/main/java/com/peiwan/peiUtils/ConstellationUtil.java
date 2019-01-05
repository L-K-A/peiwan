package com.peiwan.peiUtils;

/**
 * @Author: zhangwanli
 * @Despriction:  通过 String 类型的 yyyyMMdd  获取星座
 * @Date:Created in 13:53 2019/1/5
 * @Modify by:
 */
public class ConstellationUtil {
    public enum Constellation {
        Capricorn(1, "摩羯座"), Aquarius(2, "水瓶座"), Pisces(3, "双鱼座"), Aries(4,
                "白羊座"), Taurus(5, "金牛座"), Gemini(6, "双子座"), Cancer(7, "巨蟹座"), Leo(
                8, "狮子座"), Virgo(9, "处女座"), Libra(10, "天秤座"), Scorpio(11, "天蝎座"), Sagittarius(
                12, "射手座");

        private Constellation(int code, String chineseName) {
            this.code = code;
            this.chineseName = chineseName;
        }
        private int code;
        private String chineseName;

        public int getCode() {
            return this.code;
        }
        public String getChineseName() {
            return this.chineseName;
        }
    }

    public static final Constellation[] constellationArr = {
            Constellation.Aquarius, Constellation.Pisces, Constellation.Aries,
            Constellation.Taurus, Constellation.Gemini, Constellation.Cancer,
            Constellation.Leo, Constellation.Virgo, Constellation.Libra,
            Constellation.Scorpio, Constellation.Sagittarius,
            Constellation.Capricorn
    };

    public static final int[] constellationEdgeDay = { 21, 20, 21, 21, 22, 22,
            23, 24, 24, 24, 23, 22 };

    public static String calculateConstellation(String birthday) {

        if (birthday == null || birthday.trim().length() == 0)
            throw new IllegalArgumentException("the birthday can not be null");
        String  LockDates= birthday.substring(0, 4) + "-" + birthday.substring(4, 6) + "-" + birthday.substring(6, 8);
        String[] birthdayElements = LockDates.split("-");
        if (birthdayElements.length != 3)
            throw new IllegalArgumentException(
                    "the birthday form is not invalid");
        int month = Integer.parseInt(birthdayElements[1]);
        int day = Integer.parseInt(birthdayElements[2]);
        if (month == 0 || day == 0 || month > 12)
            return "";
        month = day < constellationEdgeDay[month - 1] ? month - 1:month;
        return month > 0 ? constellationArr[month - 1].getChineseName(): constellationArr[11].getChineseName();
    }

}
