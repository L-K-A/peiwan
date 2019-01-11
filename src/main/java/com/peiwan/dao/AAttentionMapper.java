package com.peiwan.dao;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.AAttention;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.PPerson;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author Zhou先生
 * @since 2019-01-02
 */
@Mapper
public interface AAttentionMapper extends BaseMapper<PPerson> {

    //登录时根据用户名和密码查询是否存在
    @Select("select * from p_person p where p.person_name=#{personName} and p.person_pwd=#{personPwd}")
    PPerson selectPersonByNameAndPwd(PPerson person);


    //查询主播列表
    @Select("select p.pid,p.person_nickname,p.person_image,g.g_name,g.g_price from p_person p,g_service g where p.pid=g.pid")
    List<Map<String,Object>> selectPersonPage(Page<Map<String,Object>> page,Integer id);


    //根据昵称和id查询
    List<PPerson> selectPersonByNameAndId(PPerson person);
}
