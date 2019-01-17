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
public interface IAccountMapper extends BaseMapper<MMomey> {

    @Select("SELECT * FROM m_momey WHERE pid=#{pid}")
    List<Map<String,Object>>  selMoneyById(Page mypage,int pid);
}
