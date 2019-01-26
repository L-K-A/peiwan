package com.peiwan.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.TPerson;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@Mapper
public interface IYjhPersonMapper extends BaseMapper<TPerson> {
/*    *//**
     * 根据Id将登录时间改成无数据(假删除)
    * @Author : YJH
    * @Date : 2019/1/17  14:43
    * @Parm :
    * @Return :
    *//*
    @Update("Update t_person set person_logintime=’无数据‘ where pid=#{pid}")
    public TPerson dUpSex(int id);

    *//**恢复删除
    * @Author : YJH
    * @Date : 2019/1/17  15:04
    * @Parm :
    * @Return :
    *//*
    @Update("Update t_person set person_logintime=curdate() where pid=#{pid}")
    public TPerson iUpSex(int id);*/

}
