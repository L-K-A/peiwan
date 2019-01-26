package com.peiwan.serviceimpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.peiwan.Utils.OrderCodeFactory;
import com.peiwan.bean.*;
import com.peiwan.dao.*;
import com.peiwan.service.OrderService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Resource
    private OrderMapper orderMapper;

    @Resource
    private OrderZMapper orderZMapper;

    @Resource
    private PMoneyMapper moneyMapper;

    @Resource
    private TeacherInfoMapper teacherInfoMapper;

    @Resource
    private RechargeMapper rechargeMapper;

    @Resource
    private OrderCodeFactory codeFactory;


    /*
     * 订单生成
     * */
    public int POrderInsert(TOrder order) {

        return orderMapper.insert(order);
    }



    /*
     * 用户订单未支付次数
     * */
    @Override
    public int POrderSlect(TOrder order) {
        int code=0;
        QueryWrapper<TOrder> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("pid",order.getPid());
        queryWrapper.eq("o_flate",0);
        List list=orderMapper.selectList(queryWrapper);
        if (list.size()>5){
            code=1;
        }
        else {
            code=0;
        }
        return code;
    }

    //查询用户余额
    @Override
    public Double PersonMony(TOrder order) {
        QueryWrapper<TMoney> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("pid",order.getPid());
        TMoney money=moneyMapper.selectOne(queryWrapper);
        return money.getMBalance();
    }

    /*
    更改账户表
    * */
    @Override
    public int TMoneyUpdate(TOrder order, Double money) {

        int code= 0;
        if (money>order.getOMoney()) {
            money = money - order.getOMoney();
            TMoney tMoney=new TMoney();
            tMoney.setMBalance(money);
            UpdateWrapper<TMoney> Wrapper = new UpdateWrapper<>();
            Wrapper.eq("pid", order.getPid());
            code=moneyMapper.update(tMoney, Wrapper);
        }
        else {
            code=0;
        }
        return code;
    }

    /*
    余额未支付
    * */
    @Override
    public int TOrderdelect(TOrder order) {

        UpdateWrapper<TOrder> Wrapper = new UpdateWrapper<>();
        Wrapper.eq("oid",order.getOid());
        return orderMapper.delete(Wrapper);
    }

    /*
     * 支付成功
     * */
    @Override
    public int POrderUpdate(TOrder order) {

        UpdateWrapper<TOrder> Wrapper = new UpdateWrapper<>();
        Wrapper.eq("oid",order.getOid());


        return orderMapper.update(order,Wrapper);
    }

    /*
    生成主播订单
    * */
    @Override
    public int ZOrderInsert(TOrder order,String oQq) {
        TOrderZ orderZ=new TOrderZ();
        orderZ.setOid(order.getOid());
        orderZ.setPid(order.getAid());
        orderZ.setPersonName(order.getPersonName());
        orderZ.setGid(order.getGid());
        orderZ.setOContent(order.getOContent());
        orderZ.setOCreatetime(order.getOCreatetime());
        orderZ.setOService(order.getOService());
        orderZ.setOXiadanshijian(order.getOXiadanshijian());
        orderZ.setOFlate(order.getOFlate());
        orderZ.setOMoney(order.getOMoney());
        orderZ.setOStarttime(order.getOStarttime());
        orderZ.setODatetime(order.getODatetime());
        orderZ.setOQq(oQq);
        return orderZMapper.insert(orderZ);
    }

    /*
     * 查询主播时间段订单
     * */
    @Override
    public int ZOrderSelect(TOrder order) {

        int code=0;
        QueryWrapper<TOrderZ> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("pid",order.getAid());
        queryWrapper.eq("o_starttime",order.getOStarttime());
        queryWrapper.eq("o_datetime",order.getODatetime());
//        Map<String, Object> map = new HashMap<>();
//        map.put("pid",order.getAid());
//        map.put("o_starttime",order.getOStarttime());
//        map.put("o_datetime",order.getODatetime());
        List list=orderZMapper.selectList(queryWrapper);
        System.out.println(list);
        if (!list.isEmpty()){
            code=-1002;
        }
        return code;
    }

    @Override
    public Integer ZPersonPid(TOrder order) {
        QueryWrapper<TPerson> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("person_name",order.getPersonName());
        TPerson person=teacherInfoMapper.selectOne(queryWrapper);
        return person.getPid();
    }

    /*
     * 充值记录
     * */
    @Override
    public Integer MoneyInsert(TRecharge tRecharge) {
        tRecharge.setRRechargetime(codeFactory.getOrderByDate());
        int a=rechargeMapper.insert(tRecharge);
        if (a==1){
            int b= MoneyUpdate(tRecharge.getPid(),tRecharge.getRRechargemoney(),tRecharge.getRRechargetime());
            System.out.println(b+"充值成功");
        }
        return a;
    }

    /*
     * 账户表
     * */
    @Override
    public Integer MoneyUpdate(Integer Pid, Double money,String time) {

        return moneyMapper.UpMoney(money,time,money,Pid);
    }

    /*
     * 支付宝未支付
     * */
    public String ZhiFuBao(TOrder order){
        order.setOFlate(0);
        String oid= codeFactory.getOrderIdByTime();
        order.setOCreatetime(codeFactory.getOrderByDate());
        order.setOid(oid);
        orderMapper.insert(order);
        return oid;
    }

    @Override
    public TOrder SelecOrder(String oid) {

        return orderMapper.getSelectOrder(oid);
    }

}
