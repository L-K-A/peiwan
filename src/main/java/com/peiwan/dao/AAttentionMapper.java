package com.peiwan.dao;

import com.peiwan.bean.AAttention;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.PPerson;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@Mapper
public interface AAttentionMapper extends BaseMapper<PPerson> {

//    测试根据用户名进行查询全部信息

    @Select("select * from p_person where person_name=#{personName} and person_pwd=#{personPwd}")
    List<PPerson> namepperson(PPerson pPerson);

//    测试是否能链接数据库  查询用户表的所有字段
    @Select("select * from p_person")
    List<PPerson> addpperson(int id);

}
