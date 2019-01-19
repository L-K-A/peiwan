package com.peiwan.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.TPerson;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@Mapper
public interface XyPersonMapper extends BaseMapper<TPerson> {

    //根据各个游戏板块来查询对应的人数
    @Select("SELECT COUNT(pid) shu,g_name FROM t_service WHERE gid>0 AND gid<9 GROUP BY gid")
    List<Map<String,Object>> GameCount();

    //查询总的游戏服务主播人数
    @Select("SELECT COUNT(*) FROM t_service WHERE gid>0 AND gid<9")
    int AllGameCount();

    //根据各个娱乐板块来查询对应的人数
    @Select("SELECT COUNT(pid) shu,g_name FROM t_service WHERE gid>8 AND gid<15 GROUP BY gid")
    List<Map<String,Object>> YuCount();

    //查询总的娱乐服务主播人数
    @Select("SELECT COUNT(*) FROM t_service WHERE gid>8 AND gid<15")
    int AllYuCount();

    //根据pid删除数据
    int delete(Integer id);

    //查询所有的PPerson
    @Select("SELECT * FROM t_person WHERE person_createtime!='无数据' AND person_logintime!='无数据'")
    List<TPerson> selectP();
}
