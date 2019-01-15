package com.peiwan.serviceimpl;

import com.peiwan.bean.AAttention;
import com.peiwan.bean.PPerson;
import com.peiwan.dao.AAttentionMapper;
import com.peiwan.service.AAttentionService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
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
    public PPerson myppersonname(String personName) {
        return aAttentionMapper.myppersonname(personName);
    }
//给据用户名返回是否存在 0 不出存在 用户名不存在，请先去注册！  大于0 用户名存在  不用提示
    @Override
    public String ippersonname(String personName) {
        String msg;
        Integer ippersonname = aAttentionMapper.ippersonname(personName);
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
    public String ippersonpwd(String personName, String personPwd) {
        String msg="";
        Integer ippersonpwd = aAttentionMapper.ippersonpwd(personName, personPwd);
        System.out.println("查看数据库是否正确"+ippersonpwd);
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


}
