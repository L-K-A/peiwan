package com.peiwan.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.TOrder;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface OrderMapper extends BaseMapper<TOrder> {


    /**
     * 用户订单查询
     */
    @Select("SELECT * FROM t_order WHERE oid=#{oid}")
    TOrder getSelectOrder(String oid);
}
