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

    /*获取主播服务类型*/
    @Select("select g_name from g_service where pid=#{zid}")
    List<String> selectZhuboService(Integer zid);

    /* 依据 zid  gid   获取主播的  指定服务 的 段位 价格 */
   @Select("select g_price, g_duanwei from g_service where pid=#{zid} and gid=#{gid}")
    Map<String,Object> selectZhudp(Integer zid ,Integer gid);


    /* 依据 zid  gid   获取主播的  指定服务 的 接单次数*/
    @Select("select count(oid) from o_order_z where pid = #{zid} and gid = #{gid} ")
    Integer selectJiedanCount(Integer zid ,Integer gid);

}
