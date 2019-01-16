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
    @Select("select ps.person_nickname ,ps.person_image ,pc.c_createtime,pc.c_context,pc.c_rank,pc.cid from p_comment pc left join p_person ps on pc.pid = ps.pid where pc.zid=#{zid} and pc.gid=#{gid}")
    List<Map<String, Object>> selectPageExt(Page<Map<String, Object>> page, @Param("pComment") PComment pComment,Integer zid,Integer gid);

    /*获取主播总评分的平均数*/
    @Select("select avg(c_rank) from p_comment where zid =#{zid}")
    double selectavg(Integer zid);

    /*获取主播指定服务评分的平均数*/
    @Select("select avg(c_rank) from p_comment where zid =#{zid} and gid=#{gid}")
    Double selectfuwuavg(Integer zid,Integer gid);
    /*多条数据获取主播服务类型*/
    @Select("select pid, gid ,g_name from g_service where pid=#{zid}")
    List<Map<String,Object>> selectZhuboService(Integer zid);

    /* 依据 zid  获取主播的  全部服务 的 段位 价格 服务介绍 */
   @Select("select gs.gid, gs.g_name,gs.g_price,gs.g_duanwei,gs.g_content from g_service gs  where gs.pid=#{zid}")
   List< Map<String,Object>> selectZhudp(Integer zid);

   /*依据 zid  获取接单次数   */
   @Select("select count(oid) from p_comment where zid =#{zid} and gid=#{gid} ")
   Integer countdan(Integer zid ,Integer gid);

    /*依据 zid  获取全部接单次数   */
    @Select("select count(oid) from p_comment where zid =#{zid}")
    Integer countzongdan(Integer zid);

    /* 获取全部评论信息*/
    @Select("select ps.person_nickname ,ps.person_image ,pc.c_createtime,pc.c_context,pc.c_rank,pc.cid from p_person ps,p_comment pc where ps.pid in (select pco.pid from p_comment pco where pco.zid=#{zid} and pco.gid=#{gid}) group by pc.cid ")
    List<Map<String, Object>> selectComment(Integer zid,Integer gid);
}
