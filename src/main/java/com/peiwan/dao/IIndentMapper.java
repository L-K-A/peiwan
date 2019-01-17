package com.peiwan.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.MMomey;
import com.peiwan.bean.OOrder;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface IIndentMapper extends BaseMapper<OOrder> {

    @Select("select pid,oid,person_name,o_service,o_xiandanshijian,o_money from o_order where pid=#{pid}")
    List<Map<String,Object>> selOrdById(int id, Page page);
}
