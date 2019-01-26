package com.peiwan.controller;


import com.peiwan.Utils.OrderCodeFactory;
import com.peiwan.bean.TOrder;
import com.peiwan.bean.TOrderZ;
import com.peiwan.bean.TRecharge;
import com.peiwan.service.OrderService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@RestController
//@RequestMapping("/order")
public class OrderController {

    @Resource
    private OrderService orderService;

    @Resource
    private OrderCodeFactory codeFactory;

    String foid = null;
    int code = 0;
    int status = 0;


    /*
     * 用户订单生成
     * */
    @RequestMapping("/oisert")
    public Map OrderInsert(TOrder rder, String oQq) {

        System.out.println("conter" + rder);
        if (rder.getPid() == rder.getAid()) {
            code = -6;
        } else {
            //主播时间段
            code = orderService.ZOrderSelect(rder);
            if (code != -1002) {
                rder.setOCreatetime(codeFactory.getOrderByDate());
                rder.setOid(codeFactory.getOrderIdByTime());
                //查看用户未支付订单数
                code = orderService.POrderSlect(rder);
                if (code == 0) {
                    if (rder.getOFlate() == 3) {
                        foid = orderService.ZhiFuBao(rder);
                        code = 0;
                    } else {
                        //订单表插入
                        code = orderService.POrderInsert(rder);
                        //余额查询
                        Double Ymoney = orderService.PersonMony(rder);
                        //余额操作
                        status = orderService.TMoneyUpdate(rder, Ymoney);
                        if (status == 0) {
                            //删除订单表
                            orderService.TOrderdelect(rder);
                        } else {
                            rder.setOFlate(1);
                            orderService.POrderUpdate(rder);
                            orderService.ZOrderInsert(rder, oQq);
                        }
                    }
                }
            }
        }

        Map map = new HashMap<>();
        map.put("code", code);
        map.put("status", status);
        map.put("foid", foid);


        return map;
    }

    /*
     * 支付成功
     * */
    @RequestMapping("/orderUpdate")
    public int POrderUpdate(String oid,Integer flate) {
        TOrder order=new TOrder();
        order.setOFlate(flate);
        order.setOid(oid);
        return orderService.POrderUpdate(order);
    }
    /*
     * 主播时间段订单查询
     * */
    @RequestMapping("/ZorderSelect")
    public int ZOrderSelect() {

        TOrder orderZ = new TOrder();
        orderZ.setAid(1);
        orderZ.setOStarttime("2019");


        int d = orderService.ZOrderSelect(orderZ);
        return d;
    }

    /*
     * 主播订单生成
     * */
    @RequestMapping("/ZorderInsert")
    public int ZorderInsert(String oid, String oQq) {
        TOrder order = orderService.SelecOrder(oid);

        return orderService.ZOrderInsert(order, oQq);
    }

    @RequestMapping("/Zper")
    public Integer ZPersonPid(TOrder order) {
        order.setPersonName("李四");
        return orderService.ZPersonPid(order);
    }

    /*
     * 生成充值订单
     * */
    @RequestMapping("/MoneyU")
    public Integer MoneyUpdate(TRecharge tRecharge) {
        return orderService.MoneyInsert(tRecharge);
    }

}
