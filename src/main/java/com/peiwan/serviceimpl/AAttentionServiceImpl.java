package com.peiwan.serviceimpl;

import com.peiwan.bean.AAttention;
import com.peiwan.bean.PPerson;
import com.peiwan.common.utils.UUIDUtil;
import org.apache.shiro.crypto.hash.SimpleHash;
import com.peiwan.dao.AAttentionMapper;
import com.peiwan.service.AAttentionService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.shiro.util.ByteSource;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@Service
public class AAttentionServiceImpl extends ServiceImpl<AAttentionMapper, PPerson> implements AAttentionService {

    @Resource
    private AAttentionMapper aAttentionMapper;

//    测试
    @Override
    public PPerson namepperson(PPerson pPerson) {
        PPerson pPersonList=aAttentionMapper.namepperson(pPerson);
        return pPersonList;
    }


    @Override
    public List<PPerson> addpperson(int id) {
        return aAttentionMapper.addpperson(id);
    }

    @Override
    public PPerson myppersonname(String personNickname) {
        return aAttentionMapper.myppersonname(personNickname);
    }
//给据用户名返回是否存在 0 不出存在 用户名不存在，请先去注册！  大于0 用户名存在  不用提示
    @Override
    public String ippersonname(String personNickname) {
        String msg;
        Integer ippersonname = aAttentionMapper.ippersonname(personNickname);
        if(ippersonname==0){
            msg="用户名不存在，请先去注册！";
            return msg;
        }else {
            msg="可登陆";
            return msg;
        }
    }
//  根据用户名和密码 判断密码是否正确  0 不正确  大于0正确
    @Override
    public String ippersonpwd(String personNickname, String personPwd) {
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
        Integer ippersonpwd = aAttentionMapper.ippersonpwd(personNickname, newPs);
        if (ippersonpwd==0){
            msg = "密码不正确,请输入正确密码";
            return msg;
        }
        if (ippersonpwd>0){
            msg = "密码输入正确,可登陆";
            return msg;
        }
        return msg;
    }

    @Override
    public Integer checkRegisterName(String personNickname) {
        return aAttentionMapper.ippersonname(personNickname);
    }

    /**
     * 注册功能
     *
     * @param pPerson
     * @return
     */
    @Override
    public boolean registerData(PPerson pPerson) {
       if (pPerson!=null){
           //获取前台传过来的值
           //昵称
           String personNickname = pPerson.getPersonNickname();
           //密码
           String personPwd = pPerson.getPersonPwd();
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
           PPerson person = new PPerson();
           person.setPersonNickname(personNickname);
           person.setPersonPwd(newPs);
           person.setPersonPwdencry(newPs);
           person.setPersonCreatetime(PersonCreatetime);
           Integer integer = aAttentionMapper.registerData(person);
           if (integer==1){
               return true;
           }else {
               return false;
           }


       }else {
           return false;
       }
    }
}
