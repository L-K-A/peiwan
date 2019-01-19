package com.peiwan.serviceimpl;

import com.alibaba.fastjson.JSON;
import com.peiwan.bean.TPerson;
import com.peiwan.bean.TPerson;
import com.peiwan.common.utils.UUIDUtil;
import com.peiwan.dao.ZjmLoginMapper;
import org.apache.shiro.crypto.hash.SimpleHash;
import com.peiwan.service.ZjmLoginService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@Service
public class ZjmLoginServiceImpl extends ServiceImpl<ZjmLoginMapper, TPerson> implements ZjmLoginService {

    @Resource
    private ZjmLoginMapper zjmLoginMapper;

//    测试
    @Override
    public TPerson nameTPerson(TPerson tPerson) {
        String personNickname = tPerson.getPersonNickname();
        String personPwd = tPerson.getPersonPwd();
        // 生成uuid
        String id = UUIDUtil.getOneUUID();
        // 将用户名作为盐值
        ByteSource salt = ByteSource.Util.bytes(personNickname);
        /*
         * MD5加密：
         * 使用SimpleHash类对原始密码进行加密。
         * 第一个参数代表使用MD5方式加密
         * 第二个参数为原始密码
         * 第三个参数为盐值，即用户名
         * 第四个参数为加密次数
         * 最后用toHex()方法将加密后的密码转成String
         * */
        String newPs = new SimpleHash("MD5",personPwd, salt, 1024).toHex();
        tPerson.setPersonNickname(personNickname);
        tPerson.setPersonPwd(newPs);
        TPerson TPersonList= zjmLoginMapper.nameTPerson(tPerson);
        return TPersonList;
    }


    @Override
    public List<TPerson> addTPerson(int id) {
        return zjmLoginMapper.addTPerson(id);
    }

    @Override
    public TPerson myTPersonname(String personNickname) {
        return zjmLoginMapper.myTPersonname(personNickname);
    }
//给据用户名返回是否存在 0 不出存在 用户名不存在，请先去注册！  大于0 用户名存在  不用提示
    @Override
    public String iTPersonname(String personNickname) {
        String msg;
        Integer iTPersonname = zjmLoginMapper.iTPersonname(personNickname);
        if(iTPersonname==0){
            msg="用户名不存在，请先去注册！";
            return msg;
        }else {
            msg="可登陆";
            return msg;
        }
    }
//  根据用户名和密码 判断密码是否正确  0 不正确  大于0正确
    @Override
    public String iTPersonpwd(String personNickname, String personPwd) {
        String msg="";
        // 生成uuid
        String id = UUIDUtil.getOneUUID();
        // 将用户名作为盐值
        ByteSource salt = ByteSource.Util.bytes(personNickname);
        /*
         * MD5加密：
         * 使用SimpleHash类对原始密码进行加密。
         * 第一个参数代表使用MD5方式加密
         * 第二个参数为原始密码
         * 第三个参数为盐值，即用户名
         * 第四个参数为加密次数
         * 最后用toHex()方法将加密后的密码转成String
         * */
        String newPs = new SimpleHash("MD5",personPwd, salt, 1024).toHex();
        Integer iTPersonpwd = zjmLoginMapper.iTPersonpwd(personNickname, newPs);
        if (iTPersonpwd==0){
            msg = "密码不正确,请输入正确密码";
            return msg;
        }
        if (iTPersonpwd>0){
            msg = "密码输入正确,可登陆";
            return msg;
        }
        return msg;
    }

    @Override
    public Integer checkRegisterName(String personNickname) {
        return zjmLoginMapper.iTPersonname(personNickname);
    }

    /**
     * 注册功能
     *
     * @param
     * @return
     */
    @Override
    public boolean registerData(TPerson tPerson) {
       if (tPerson!=null){
           //获取前台传过来的值
           //昵称
           String personNickname = tPerson.getPersonNickname();
           //密码
           String personPwd = tPerson.getPersonPwd();
           String personTel = tPerson.getPersonTel();
           //获取系统当前时间 把它转换成 xxxx-xx-xx
           Date currentTime = new Date();
           SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
           String PersonCreatetime = formatter.format(currentTime);

           // 生成uuid
           String id = UUIDUtil.getOneUUID();
           // 将用户名作为盐值
           ByteSource salt = ByteSource.Util.bytes(personNickname);
           /*
            * MD5加密：
            * 使用SimpleHash类对原始密码进行加密。
            * 第一个参数代表使用MD5方式加密
            * 第二个参数为原始密码
            * 第三个参数为盐值，即用户名
            * 第四个参数为加密次数
            * 最后用toHex()方法将加密后的密码转成String
            * */
           String newPs = new SimpleHash("MD5",personPwd, salt, 1024).toHex();
           //把需要的东西都放在对象中
           TPerson person = new TPerson();
           person.setPersonNickname(personNickname);
           person.setPersonPwd(newPs);
           person.setPersonPwdencry(newPs);
           person.setPersonCreatetime(PersonCreatetime);
           person.setPersonTel(personTel);
           Integer integer = zjmLoginMapper.registerData(person);
           if (integer==1){
               return true;
           }else {
               return false;
           }
       }else {
           return false;
       }
    }

    /**
     * 封装发送验证码逻辑
     */
    @Autowired
    private RedisTemplate redisTemplate;

    @Autowired
    private JmsMessagingTemplate jmsMessagingTemplate;

    @Override
    public void createSmsCode(String personTel) {

        //1生产一个6位随机数
        String smscode=(long)(Math.random()*1000000)+"";
        System.out.println(smscode);
        //2将验证码放入redis
        redisTemplate.boundHashOps("smscodl").put("personTel",smscode);

        //3将短信内容发送给activeMQ
        Map map = new HashMap();
        Map map2 = new HashMap();
        map.put("mobile",personTel);
        map.put("template_code","PW工作室");
        map.put("sign_name","SMS_155861806");
        map2.put("name","Tom");
        map2.put("code",smscode);
        map.put("param", JSON.toJSONString(map2));
        jmsMessagingTemplate.convertAndSend("sms",map);

    }

    /**
     * 验证码校验
     *
     * @param PersonTel
     * @param code
     */
    @Override
    public boolean checkSmsCode(String PersonTel, String code) {
        System.out.println("service里是否等到手机号和验证码"+PersonTel+":"+code);
        String  systemcode = (String) redisTemplate.boundHashOps("smscodl").get("personTel");
        if (systemcode==null){
            System.out.println("缓存的验证码不存在");
            return false;
        }else if (!code.equals(systemcode)){
            System.out.println("两次的验证码不一致");
            return false;
        }else {
            return true;
        }
    }
}
