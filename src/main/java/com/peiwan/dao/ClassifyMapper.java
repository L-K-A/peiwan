package com.peiwan.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.TSortDuanwei;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * @Author: QSC
 * @Despriction:
 * @Date:Created in 15:24 2019/1/4
 * @Modify by:
 */
public interface ClassifyMapper extends BaseMapper<TSortDuanwei> {


    /*
    * qsc       @Param("gSortDuanwei")
    * */
    @Select("select gid,g_dw from g_sort_duanwei where gid=#{gid}")
    List<Map<String,Object>> getDuanWei(int gid);

    /*
    * 分类查询，可以使用gid、gDw、psex进行分类，以及热门和新人进行排序；
    * */
    List<Map<String,Object>> getCondition(Map map,Page page);


    /*测试分页
    @Select("select gid,g_dw from g_sort_duanwei where gid=#{map.gid}")
    List<Map<String,Object>> seachPage(Map map, Page page);*/

}
