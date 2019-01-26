package com.peiwan.serviceimpl;

import com.baomidou.mybatisplus.core.toolkit.sql.SqlHelper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.peiwan.bean.TOrder;
import com.peiwan.dao.IYjhOrderMapper;
import com.peiwan.service.IYjhOrderService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.Serializable;

@Service
public class IYjhOrderServiceImpl extends ServiceImpl<IYjhOrderMapper,TOrder> implements IYjhOrderService {

    @Resource
    private IYjhOrderMapper indentMapper;
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

    public IYjhOrderMapper getIndentMapper() {
        return indentMapper;
    }

    public void setIndentMapper(IYjhOrderMapper indentMapper) {
        this.indentMapper = indentMapper;
    }
}
