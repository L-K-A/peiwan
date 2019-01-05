package com.peiwan.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.PPerson;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Author: zhangwanli
 * @Despriction:
 * @Date:Created in 12:07 2019/1/4
 * @Modify by:
 */
@Mapper
public interface TeacherInfoMapper extends BaseMapper<PPerson> {

}
