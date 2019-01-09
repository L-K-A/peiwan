package com.peiwan.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.PComment;
import com.peiwan.bean.PPerson;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * @Author: zhangwanli
 * @Despriction:
 * @Date:Created in 12:07 2019/1/4
 * @Modify by:
 */
@Mapper
public interface TeacherInfoMapper extends BaseMapper<PPerson> {
    /*分页查询  评论信息*/
    @Select("select * from p_comment pc left join p_person pp on pc.pid = pp.pid ")
    List<Map<String, Object>> selectPageExt(Page<Map<String, Object>> page, @Param("pComment") PComment pComment);

    /*获取主播评分的平均数*/
    @Select("select avg(c_rank) from p_comment where zid =#{zid} ")
    double selectavg(Integer zid);
}