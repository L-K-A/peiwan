package com.peiwan.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.TOrder;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface IYjhOrderMapper extends BaseMapper<TOrder> {

    /**
     * 根据Id查询列表分页
    * @Author : YJH
    * @Date : 2019/1/17  14:44
    * @Parm :
    * @Return :
    */
    @Select("select * from t_order where pid=#{id}")
    List<Map<String,Object>> selOrdById(int id, Page page);
}
