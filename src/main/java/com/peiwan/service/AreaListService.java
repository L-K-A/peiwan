package com.peiwan.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

/**
 * @Author: QSC
 * @Despriction:
 * @Date:Created in 15:24 2019/1/4
 * @Modify by:
 */
public interface AreaListService {


    List<Map<String,Object>> getDuanWei(int gid);

    List<Map<String,Object>> getAreaList(Map map, Page page) throws ParseException;

    /*List<Map<String,Object>> seachPage(Map map, Page page);*/

}
