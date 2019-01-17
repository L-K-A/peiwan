package com.peiwan.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.peiwan.bean.PPerson;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
public interface IPersonService extends IService<PPerson> {

    /**
     * 查询列表并分页
    * @Author : YJH
    * @Date : 2019/1/11  9:34
    * @Parm :
    * @Return :
    */

    IPage<PPerson> page(@Param("pg") IPage<PPerson> page, PPerson pPerson);

    /**
     * 查看用户总列表数
    * @Author : YJH
    * @Date : 2019/1/11  9:35
    * @Parm :
    * @Return :
    */

    int count(Wrapper<PPerson> queryWrapper);



}
