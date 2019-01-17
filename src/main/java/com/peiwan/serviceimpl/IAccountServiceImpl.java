package com.peiwan.serviceimpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.sql.SqlHelper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.peiwan.bean.MMomey;
import com.peiwan.bean.OOrder;
import com.peiwan.dao.IAccountMapper;
import com.peiwan.service.IAccountService;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;

@Service
public class IAccountServiceImpl extends ServiceImpl<IAccountMapper, MMomey> implements IAccountService {

    @Resource
    private IAccountMapper accountMapper;
    /**
     * 根据充值id删除
    * @Author : YJH
    * @Date : 2019/1/15  11:12
    * @Parm :
    * @Return :
    */
    @Override
     public boolean removeById(Serializable id){
        boolean b = SqlHelper.delBool(accountMapper.deleteById(id));
        return b;
    }
}
