package com.peiwan.serviceimpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.sql.SqlHelper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.peiwan.bean.MMomey;
import com.peiwan.bean.OOrder;
import com.peiwan.dao.IIndentMapper;
import com.peiwan.service.IIndentService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;

@Service
public class IIndentServiceImpl extends ServiceImpl<IIndentMapper,OOrder> implements IIndentService{

    @Resource
    private IIndentMapper indentMapper;
    /**
     * 根据订单id删除
     * @Author : YJH
     * @Date : 2019/1/15  11:12
     * @Parm :
     * @Return :
     */
    @Override
    public boolean removeById(Serializable id){
        boolean b = SqlHelper.delBool(indentMapper.deleteById(id));
        return b;
    }


}
