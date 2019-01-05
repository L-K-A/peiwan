package com.peiwan.service;

import com.peiwan.bean.PPerson;

import java.sql.SQLOutput;

/**
 * @Author: zhangwanli
 * @Despriction:
 * @Date:Created in 12:07 2019/1/4
 * @Modify by:
 */
public interface TeacherInfoService {
    /*查询全部导师信息*/
    PPerson getInfo(int pid);

}
