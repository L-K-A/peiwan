package com.peiwan.Config.ActiveMQ;

import com.aliyuncs.dysmsapi.model.v20170525.SendSmsResponse;
import com.aliyuncs.exceptions.ClientException;
import com.peiwan.common.utils.SmsUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import java.util.Map;

import java.util.Map;

/**
 * @description: 短信消费者
 * @program: peiwan
 * @author: 张家明
 * @create: 2019-01-18 19:43
 **/
@Component
public class SmsListener {

    @Autowired
    private SmsUtil smsUtil;

    @JmsListener(destination = "sms")
    public void sendSms(Map<String,String> map){
        try {
            SendSmsResponse response = smsUtil.sendSms(map.get("mobile"),
                    map.get("template_code"),
                    map.get("sign_name"),
                    map.get("param"));
            //打印状态码 查看是否成功
            System.out.println("code:"+response.getCode());
            System.out.println("Message=" + response.getMessage());
        } catch (ClientException e) {
            e.printStackTrace();
        }

    }
}
