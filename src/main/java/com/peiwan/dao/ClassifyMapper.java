package com.peiwan.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.GService;
import com.peiwan.bean.GSortDuanwei;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * @Author: QSC
 * @Despriction:
 * @Date:Created in 15:24 2019/1/4
 * @Modify by:
 */
public interface ClassifyMapper extends BaseMapper<GSortDuanwei> {


    @Select("select p.pid,p.person_nickname,p.person_name,p.person_age,p.person_image,p.person_adress,p.person_coverphoto,g.gid,g.g_name,g.g_daqu,g.g_duanwei from p_person p left join g_service g on p.pid=g.pid where p.z_zhubo=1 and g.gid=#{gid}")
    List<Map<String,Object>> getPidGid(GService gid);

}
