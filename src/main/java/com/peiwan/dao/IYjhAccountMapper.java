package com.peiwan.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.TMoney;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface IYjhAccountMapper extends BaseMapper<TMoney> {
    /**
     * 根据id查询账户列表
    * @Author : YJH
    * @Date : 2019/1/17  15:57
    * @Parm :
    * @Return :
    */
    @Select("SELECT * FROM t_money WHERE pid=#{id}")
    List<Map<String,Object>>  selMoneyById(int id, Page page);
}
