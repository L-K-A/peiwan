package com.peiwan.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.peiwan.bean.TPerson;

import java.text.ParseException;
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

    //热门推荐主播列表
    Page<Map<String,Object>> selectHotPerson(Integer curPage,Integer pageSize);

    //导航栏根据昵称和Id模糊查询
    List<Map<String,Object>> selectPersonByNameId(TPerson person);

    //新人推荐
    Page<Map<String,Object>> selectNewPerson(Integer curPage,Integer pageSize);

    //热度榜 周榜 前三：先筛选规定时间，然后按照订单数排序
    Page<Map<String,Object>> selectPersonOrderTop(int curPage,int pageSize) throws ParseException;
    //热度榜 周榜 前三：先筛选规定时间，然后按照订单数排序
    Page<Map<String,Object>> selectPersonOrder(int curPage,int pageSize) throws ParseException;

    //热度榜 总榜 前三：查询主播总订单数
    Page<Map<String,Object>> selectPersonOrderAllTop(int curPage,int pageSize) throws ParseException;
    //热度榜 总榜 第四到第十：查询主播总订单数
    Page<Map<String,Object>> selectPersonOrderAll(int curPage,int pageSize) throws ParseException;



    //人气榜 周榜 前三：先按照规定时间筛选，根据主播的接单总时长来排序
    Page<Map<String,Object>> selectPersonTimeTop(int curPage,int pageSize) throws ParseException;
    //人气榜 周榜 第四到第十：先按照规定时间筛选，根据主播的接单总时长来排序
    Page<Map<String,Object>> selectPersonTime(int curPage,int pageSize) throws ParseException;

    //人气榜 总榜 前三：根据主播的接单总时长来排序
    Page<Map<String,Object>> selectPersonTimeAllTop(int curPage,int pageSize) throws ParseException;
    //人气榜 总榜 第四到第十：根据主播的接单总时长来排序
    Page<Map<String,Object>> selectPersonTimeAll(int curPage,int pageSize) throws ParseException;



    //富豪榜 周榜 前三:先按照规定时间筛选，然后按照用户充值总金额排序
    Page<Map<String,Object>> selectPersonMoneyTop(int curPage) throws ParseException;
    //富豪榜 周榜 第四到第十:先按照规定时间筛选，然后按照用户充值总金额排序
    Page<Map<String,Object>> selectPersonMoney(int curPage) throws ParseException;

    //富豪榜 总榜 前三:查询用户充值总金额
    Page<Map<String,Object>> selectPersonMoneyAllTop(int curPage) throws ParseException;
    //富豪榜 总榜 第四到第十:查询用户充值总金额
    Page<Map<String,Object>> selectPersonMoneyAll(int curPage) throws ParseException;




}
