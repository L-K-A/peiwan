package com.peiwan.serviceimpl;

import com.baomidou.mybatisplus.core.toolkit.sql.SqlHelper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.peiwan.bean.TMoney;
import com.peiwan.dao.IYjhAccountMapper;
import com.peiwan.service.IYjhAccountService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.Serializable;

@Service
public class IYjhAccountServiceImpl extends ServiceImpl<IYjhAccountMapper, TMoney> implements IYjhAccountService {

    @Resource
    private IYjhAccountMapper accountMapper;

    /**
     * 根据充值id删除
     *
     * @Author : YJH
     * @Date : 2019/1/15  11:12
     * @Parm :
     * @Return :
     */
    @Override
    public boolean removeById(Serializable id) {
        boolean b = SqlHelper.delBool(accountMapper.deleteById(id));
        return b;
    }

    public IYjhAccountMapper getAccountMapper() {
        return accountMapper;
    }

    public void setAccountMapper(IYjhAccountMapper accountMapper) {
        this.accountMapper = accountMapper;
    }
}
