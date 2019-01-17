package com.peiwan.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.peiwan.bean.TPerson;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Zhou先生
 * @since 2019-01-02
 */
public interface ZYFService extends IService<TPerson> {

    //查询主播列表
    Page<Map<String,Object>> selectPersonList(int curPage);

    //导航栏根据昵称和Id模糊查询
    List<Map<String,Object>> selectPersonByNameId(TPerson person);

    //热度榜 周榜：查询主播订单数，先筛选规定时间，然后按照订单数排序
    Page<Map<String,Object>> selectPersonOrder(int curPage);
    //热度榜 总榜：查询主播总订单数
    Page<Map<String,Object>> selectPersonOrderAll(int curPage);




}
