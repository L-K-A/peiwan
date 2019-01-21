package com.peiwan.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.peiwan.bean.TPerson;
import io.lettuce.core.dynamic.annotation.Param;

import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
public interface XyPersonService extends IService<TPerson> {

    //查询各游戏板块主播注册人数比例
    Map game();

    //查询各娱乐板块主播注册人数比例
    Map Yu();

    //日志模糊查询PPerson加分页
    IPage<TPerson> queryGamePage(@Param("pg") Page<TPerson> page,TPerson pPerson,String minTime, String maxTime);

    //日志根据id删除
    Boolean delete(int id);

    //根据pid来查询用户详情
    TPerson searchPerson(int pid);

    //查询用户是申请状态的用户(+模糊查询)
    IPage<TPerson> anchorList(Page<TPerson> page,TPerson pPerson);

    //申请主播页面同意事件
    int agreeEvent(TPerson tPerson);

    //不同意主播事件
    int repulseEvent(TPerson tPerson);

    //批量删除
    int deleteTags(String ids);
}
