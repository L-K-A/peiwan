package com.peiwan.Config.ActiveMQ;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 测试是否能取到配置文件的值
 * @description:
 * @program: peiwan
 * @author: 张家明
 * @create: 2019-01-18 17:20
 **/

@RestController
public class testt {

    @Autowired
    private Environment environment;

    @RequestMapping("/info")
    public String info(){
        return "测试是否能取到配置文件的值："+environment.getProperty("accessKeyId");
    }

}
