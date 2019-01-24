package com.peiwan.dao;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.TPerson;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author Zhou先生
 * @since 2019-01-02
 */
@Mapper
public interface ZyfIndexMapper extends BaseMapper<TPerson> {

    //热门推荐主播列表
    List<Map<String,Object>> selectHotPersonList(Integer curPage,Integer pageSize);

    //导航栏根据昵称和Id模糊查询
    List<Map<String,Object>> selectPersonByNameAndId(TPerson person);

    //新人推荐
    List<Map<String,Object>> selectNewPersonList(Integer curPage,Integer pageSize);


    //热度榜 周榜 前三：先筛选规定时间，然后按照订单数排序
    List<Map<String,Object>> selectOrderListTop(int curPage,int pageSize);
    //热度榜 周榜 第四到第十：先筛选规定时间，然后按照订单数排序
    List<Map<String,Object>> selectOrderList(int curPage,int pageSize);

    //热度榜 总榜 前三：查询主播总订单数
    List<Map<String,Object>> selectOrderListAllTop(int curPage,int pageSize);
    //热度榜 总榜 第四到第十：查询主播总订单数
    List<Map<String,Object>> selectOrderListAll(int curPage,int pageSize);



    //人气榜 周榜 前三：先按照规定时间筛选，根据主播的接单总时长来排序
    List<Map<String,Object>> selectTimeListTop(int curPage,int pageSize);
    //人气榜 周榜 第四到第十：先按照规定时间筛选，根据主播的接单总时长来排序
    List<Map<String,Object>> selectTimeList(int curPage,int pageSize);

    //人气榜 总榜 前三：根据主播的接单总时长来排序
    List<Map<String,Object>> selectTimeListAllTop(int curPage,int pageSize);
    //人气榜 总榜 第四到第十：根据主播的接单总时长来排序
    List<Map<String,Object>> selectTimeListAll(int curPage,int pageSize);



    //富豪榜 周榜 前三:先按照规定时间筛选，然后按照用户充值总金额排序
    List<Map<String,Object>> selectMoneyListTop(int curPage);
    //富豪榜 周榜 第四到第十:先按照规定时间筛选，然后按照用户充值总金额排序
    List<Map<String,Object>> selectMoneyList(int curPage);

    //富豪榜 总榜 前三:查询用户充值总金额
    List<Map<String,Object>> selectMoneyListAllTop(int curPage);
    //富豪榜 总榜 第四到第十:查询用户充值总金额
    List<Map<String,Object>> selectMoneyListAll(int curPage);


}