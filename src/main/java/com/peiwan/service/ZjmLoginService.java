package com.peiwan.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.peiwan.bean.TPerson;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
public interface ZjmLoginService extends IService<TPerson> {
//   测试
    TPerson nameTPerson(TPerson TPerson);
    List<TPerson> addTPerson(int id);
    TPerson myTPersonname(String personNickname);

    String iTPersonname(String personNickname);

    String iTPersonpwd(String personNickname,String personPwd);

    Integer checkRegisterName(String personNickname);

    /**
     * 注册功能
     * @return
     */
     boolean registerData(TPerson TPerson);

    /**
     * 封装发送验证码逻辑
     */

    void createSmsCode(String personTel);

    /**
     * 验证码校验
     */
    boolean checkSmsCode(String PersonTel,String code);


}
