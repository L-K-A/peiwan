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
public interface ZyfIndexService extends IService<TPerson> {

    //查询主播列表
    Page<Map<String,Object>> selectPersonList(int curPage);

    //导航栏根据昵称和Id模糊查询
    List<Map<String,Object>> selectPersonByNameId(TPerson person);

    //热度榜 周榜 前三：先筛选规定时间，然后按照订单数排序
    Page<Map<String,Object>> selectPersonOrderTop(int curPage,int pageSize);
    //热度榜 周榜 前三：先筛选规定时间，然后按照订单数排序
    Page<Map<String,Object>> selectPersonOrder(int curPage,int pageSize);

    //热度榜 总榜 前三：查询主播总订单数
    Page<Map<String,Object>> selectPersonOrderAllTop(int curPage,int pageSize);
    //热度榜 总榜 第四到第十：查询主播总订单数
    Page<Map<String,Object>> selectPersonOrderAll(int curPage,int pageSize);



    //富豪榜 周榜 前三:先按照规定时间筛选，然后按照用户充值总金额排序
    Page<Map<String,Object>> selectPersonMoneyTop(int curPage);
    //富豪榜 周榜 第四到第十:先按照规定时间筛选，然后按照用户充值总金额排序
    Page<Map<String,Object>> selectPersonMoney(int curPage);

    //富豪榜 总榜 前三:查询用户充值总金额
    Page<Map<String,Object>> selectPersonMoneyAllTop(int curPage);
    //富豪榜 总榜 第四到第十:查询用户充值总金额
    Page<Map<String,Object>> selectPersonMoneyAll(int curPage);




}
