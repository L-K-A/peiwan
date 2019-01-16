package com.peiwan.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.peiwan.bean.PPerson;

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
public interface ZYFService extends IService<PPerson> {

    //查询主播列表
    Page<Map<String,Object>> selectPersonList(int curPage);

    //导航栏根据昵称和Id模糊查询
    List<Map<String,Object>> selectPersonByNameId(PPerson person);

    //热度榜查询主播订单数：先按照订单数排序，再查询主播详细信息
    Page<Map<String,Object>> selectPersonOrder(int curPage);




}
