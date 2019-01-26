package com.peiwan.service;


import com.peiwan.bean.TOrder;
import com.peiwan.bean.TRecharge;

public interface OrderService {

    /*
     * 生成用户订单
     * */
    int POrderInsert(TOrder order);

    /*
     * 用户订单未支付次数
     * */

    int POrderSlect(TOrder order);

    /*
     * 查询用户余额
     * */
    Double PersonMony(TOrder order);
    /*
     * 更改账户表余额
     *
     * */
    int TMoneyUpdate(TOrder order, Double money);

    /*
     * 余额未支付
     * */
    int TOrderdelect(TOrder order);
    /*
     * 支付成功
     * */
    int POrderUpdate(TOrder order);
    /*
     * 生成主播订单
     * */
    int ZOrderInsert(TOrder order,String oQq);

    /*
     * 查询主播时间段订单
     * */
    int ZOrderSelect(TOrder order);

    /*
     * 根据主播名查询ID
     * */
    Integer ZPersonPid(TOrder order);
    /*
     * 充值记录表
     * */
    Integer MoneyInsert(TRecharge tRecharge);

    /*
    更新账户表
    * */
    Integer MoneyUpdate(Integer Pid,Double money,String time);
    /*
     * 支付宝未支付
     * */
    String ZhiFuBao(TOrder order);

    /*
     * 查询订单
     * */
    TOrder SelecOrder(String oid);



}
