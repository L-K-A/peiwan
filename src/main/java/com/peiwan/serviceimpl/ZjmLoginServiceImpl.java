package com.peiwan.serviceimpl;

import com.alibaba.fastjson.JSON;
import com.peiwan.bean.TPerson;
import com.peiwan.common.utils.TimeTools;
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
        String personName = tPerson.getPersonName();
        String personPwd = tPerson.getPersonPwd();
        // 生成uuid
        String id = UUIDUtil.getOneUUID();
        // 将用户名作为盐值
        ByteSource salt = ByteSource.Util.bytes(personName);
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
        tPerson.setPersonName(personName);
        tPerson.setPersonPwd(newPs);
        TPerson TPersonList= zjmLoginMapper.nameTPerson(tPerson);
        return TPersonList;
    }


    @Override
    public List<TPerson> addTPerson(int id) {
        return zjmLoginMapper.addTPerson(id);
    }

    @Override
    public TPerson myTPersonname(String personName) {
        return zjmLoginMapper.myTPersonname(personName);
    }
    //给据用户名返回是否存在 0 不出存在 用户名不存在，请先去注册！  大于0 用户名存在  不用提示
    @Override
    public Integer iTPersonname(String personName) {
        return zjmLoginMapper.iTPersonname(personName);
    }
    //  根据用户名和密码 判断密码是否正确  0 不正确  大于0正确
    @Override
    public Integer iTPersonpwd(String personName, String personPwd) {
        // 生成uuid
        String id = UUIDUtil.getOneUUID();
        // 将用户名作为盐值
        ByteSource salt = ByteSource.Util.bytes(personName);
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
        return  zjmLoginMapper.iTPersonpwd(personName, newPs);
    }

    //根据用户名 判断用户是否可用
    @Override
    public Integer checkRegisterName(String personName) {
        return zjmLoginMapper.iTPersonname(personName);
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
//            获取手机号
            String personTel = tPerson.getPersonTel();
            //获取当前时间
            String currentTime = new TimeTools().currentTime();

            //把需要的东西都放在对象中
            TPerson person = new TPerson();
            person.setPersonName(personTel);
            person.setPersonCreatetime(currentTime);
            person.setPersonTel(personTel);
            // 将用户名作为盐值
            ByteSource salt = ByteSource.Util.bytes(personTel);
            String newPs = new SimpleHash("MD5", personTel, salt, 1024).toHex();
            person.setPersonPwd(newPs);
            person.setPersonPwdencry(newPs);
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
        System.out.println("验证码"+smscode);
        //2将验证码放入redis
        redisTemplate.boundHashOps("smscodl").put("personTel",smscode);
//        //3将短信内容发送给activeMQ
//        Map map = new HashMap();
//        Map map2 = new HashMap();
//        map.put("mobile",personTel);
//        map.put("template_code","PW工作室");
//        map.put("sign_name","SMS_155861806");
//        map2.put("name","Tom");
//        map2.put("code",smscode);
//        map.put("param", JSON.toJSONString(map2));
//        jmsMessagingTemplate.convertAndSend("sms",map);
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

    /*
     * 普通注册要进行的插入语句
     * */

    @Override
    public Integer registerInto(TPerson tPerson) {
        if (tPerson != null) {
            String personName = tPerson.getPersonName();
            String personPwd = tPerson.getPersonPwd();
            Date currentTime = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            String PersonCreatetime = formatter.format(currentTime);
            // 将用户名作为盐值
            ByteSource salt = ByteSource.Util.bytes(personName);
            String newPs = new SimpleHash("MD5", personPwd, salt, 1024).toHex();
            TPerson tPersons = new TPerson();
            tPersons.setPersonName(personName);
            tPersons.setPersonPwd(newPs);
            tPersons.setPersonPwdencry(newPs);
            tPersons.setPersonCreatetime(PersonCreatetime);
            Integer integer = zjmLoginMapper.registerInto(tPersons);
            return integer;
        } else {
            return -1;
        }
    }
}
