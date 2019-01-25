package com.peiwan.serviceimpl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.TPerson;
import com.peiwan.dao.ZyfIndexMapper;
import com.peiwan.service.ZyfIndexService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.peiwan.util.AgeByBirthUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Zhou先生
 * @since 2019-01-02
 */
@Service
public class ZyfIndexServiceImpl extends ServiceImpl<ZyfIndexMapper, TPerson> implements ZyfIndexService {

    @Resource
    private ZyfIndexMapper zyfIndexMapper;


    //热门推荐主播列表
    @Override
    public Page<Map<String, Object>> selectHotPerson(Integer curPage,Integer pageSize) {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>();
        Page<Map<String, Object>> mapPage = page.setRecords(this.baseMapper.selectHotPersonList(curPage, pageSize));
        return mapPage;
    }

    //导航栏根据昵称和Id模糊查询
    @Override
    public List<Map<String,Object>> selectPersonByNameId(TPerson person) {
        List<Map<String, Object>> maps =zyfIndexMapper.selectPersonByNameAndId(person);
        return maps;
    }

    //新人推荐
    @Override
    public Page<Map<String, Object>> selectNewPerson(Integer curPage, Integer pageSize) {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>();
        Page<Map<String, Object>> newList = page.setRecords(this.baseMapper.selectNewPersonList(curPage, pageSize));
        return newList;
    }

    //魅力榜 周榜 前三：先筛选规定时间，然后按照订单数排序
    @Override
    public Page<Map<String, Object>> selectPersonOrderTop(int curPage,int pageSize) throws ParseException {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>();
        Page<Map<String, Object>> orderListTop = page.setRecords(this.baseMapper.selectOrderListTop(curPage,pageSize));
        //获取年龄
        for (int i =0 ;i<orderListTop.getRecords().size();i++ ){
            String birthday = (String)orderListTop.getRecords().get(i).get("person_birthday");
            String a  = String.valueOf(AgeByBirthUtil.getAgeByBirth(birthday));
            orderListTop.getRecords().get(i).put("person_birthday",a);
            String adress = (String)orderListTop.getRecords().get(i).get("person_adress");
            String ad = adress.substring(adress.length()- 3);
            orderListTop.getRecords().get(i).put("person_adress",ad);
        }
        return orderListTop;
    }
    //魅力榜 周榜 第四到第十：先筛选规定时间，然后按照订单数排序
    @Override
    public Page<Map<String, Object>> selectPersonOrder(int curPage,int pageSize) throws ParseException {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>();
        Page<Map<String, Object>> orderList = page.setRecords(this.baseMapper.selectOrderList(curPage,pageSize));
        //获取年龄
        for (int i=0;i<orderList.getRecords().size();i++){
            String birthday = (String) orderList.getRecords().get(i).get("person_birthday");
            String a = String.valueOf(AgeByBirthUtil.getAgeByBirth(birthday));
            orderList.getRecords().get(i).put("person_birthday",a);
            String adress = (String)orderList.getRecords().get(i).get("person_adress");
            String ad = adress.substring(adress.length()- 3);
            orderList.getRecords().get(i).put("person_adress",ad);
        }
        return orderList;
    }

    //热度榜 总榜 前三 ：查询主播总订单数
    @Override
    public Page<Map<String, Object>> selectPersonOrderAllTop(int curPage, int pageSize) throws ParseException {
        Page<Map<String,Object>> page = new Page<Map<String, Object>>();
        Page<Map<String, Object>> orderListAllTop = page.setRecords(this.baseMapper.selectOrderListAllTop(curPage, pageSize));
        //获取年龄
        for (int i=0;i<orderListAllTop.getRecords().size();i++){
            String birthday = (String) orderListAllTop.getRecords().get(i).get("person_birthday");
            String a = String.valueOf(AgeByBirthUtil.getAgeByBirth(birthday));
            orderListAllTop.getRecords().get(i).put("person_birthday",a);
            String adress = (String)orderListAllTop.getRecords().get(i).get("person_adress");
            String ad = adress.substring(adress.length()- 3);
            orderListAllTop.getRecords().get(i).put("person_adress",ad);
        }
        return orderListAllTop;
    }
    //热度榜 总榜 第四到第十：查询主播总订单数
    @Override
    public Page<Map<String, Object>> selectPersonOrderAll(int curPage, int pageSize) throws ParseException {
        Page<Map<String,Object>> page = new Page<Map<String, Object>>();
        Page<Map<String, Object>> orderListAll = page.setRecords(this.baseMapper.selectOrderListAll(curPage,pageSize));
        //获取年龄
        for (int i=0;i<orderListAll.getRecords().size();i++){
            String birthday = (String) orderListAll.getRecords().get(i).get("person_birthday");
            String a = String.valueOf(AgeByBirthUtil.getAgeByBirth(birthday));
            orderListAll.getRecords().get(i).put("person_birthday",a);
            String adress = (String)orderListAll.getRecords().get(i).get("person_adress");
            String ad = adress.substring(adress.length()- 3);
            orderListAll.getRecords().get(i).put("person_adress",ad);
        }
        return orderListAll;
    }



    //人气榜 周榜 前三：先按照规定时间筛选，根据主播的接单总时长来排序
    @Override
    public Page<Map<String, Object>> selectPersonTimeTop(int curPage, int pageSize) throws ParseException {
        Page<Map<String,Object>> page = new Page<Map<String, Object>>();
        Page<Map<String, Object>> timeListTop = page.setRecords(this.baseMapper.selectTimeListTop(curPage,pageSize));
        //获取年龄
        for (int i=0;i<timeListTop.getRecords().size();i++){
            String birthday = (String) timeListTop.getRecords().get(i).get("person_birthday");
            String a = String.valueOf(AgeByBirthUtil.getAgeByBirth(birthday));
            timeListTop.getRecords().get(i).put("person_birthday",a);
            String adress = (String)timeListTop.getRecords().get(i).get("person_adress");
            String ad = adress.substring(adress.length()- 3);
            timeListTop.getRecords().get(i).put("person_adress",ad);
        }
        return timeListTop;
    }
    //人气榜 周榜 第四到第十：先按照规定时间筛选，根据主播的接单总时长来排序
    @Override
    public Page<Map<String, Object>> selectPersonTime(int curPage, int pageSize) throws ParseException {
        Page<Map<String,Object>> page = new Page<Map<String, Object>>();
        Page<Map<String, Object>> timeList = page.setRecords(this.baseMapper.selectTimeList(curPage,pageSize));
        //获取年龄
        for (int i=0;i<timeList.getRecords().size();i++){
            String birthday = (String) timeList.getRecords().get(i).get("person_birthday");
            String a = String.valueOf(AgeByBirthUtil.getAgeByBirth(birthday));
            timeList.getRecords().get(i).put("person_birthday",a);
            String adress = (String)timeList.getRecords().get(i).get("person_adress");
            String ad = adress.substring(adress.length()- 3);
            timeList.getRecords().get(i).put("person_adress",ad);
        }
        return timeList;
    }
    //人气榜 总榜 前三：根据主播的接单总时长来排序
    @Override
    public Page<Map<String, Object>> selectPersonTimeAllTop(int curPage, int pageSize) throws ParseException {
        Page<Map<String,Object>> page = new Page<Map<String, Object>>();
        Page<Map<String, Object>> timeListAllTop = page.setRecords(this.baseMapper.selectTimeListAllTop(curPage,pageSize));
        //获取年龄
        for (int i=0;i<timeListAllTop.getRecords().size();i++){
            String birthday = (String) timeListAllTop.getRecords().get(i).get("person_birthday");
            String a = String.valueOf(AgeByBirthUtil.getAgeByBirth(birthday));
            timeListAllTop.getRecords().get(i).put("person_birthday",a);
            String adress = (String)timeListAllTop.getRecords().get(i).get("person_adress");
            String ad = adress.substring(adress.length()- 3);
            timeListAllTop.getRecords().get(i).put("person_adress",ad);
        }
        return timeListAllTop;
    }
    //人气榜 总榜 第四到第十：根据主播的接单总时长来排序
    @Override
    public Page<Map<String, Object>> selectPersonTimeAll(int curPage, int pageSize) throws ParseException {
        Page<Map<String,Object>> page = new Page<Map<String, Object>>();
        Page<Map<String, Object>> timeListAll = page.setRecords(this.baseMapper.selectTimeListAll(curPage,pageSize));
        //获取年龄
        for (int i=0;i<timeListAll.getRecords().size();i++){
            String birthday = (String) timeListAll.getRecords().get(i).get("person_birthday");
            String a = String.valueOf(AgeByBirthUtil.getAgeByBirth(birthday));
            timeListAll.getRecords().get(i).put("person_birthday",a);
            String adress = (String)timeListAll.getRecords().get(i).get("person_adress");
            String ad = adress.substring(adress.length()- 3);
            timeListAll.getRecords().get(i).put("person_adress",ad);
        }
        return timeListAll;
    }



    //富豪榜 周榜 前三 ：先按照规定时间筛选，然后按照用户充值总金额排序
    @Override
    public Page<Map<String, Object>> selectPersonMoneyTop(int curPage) throws ParseException {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>();
        Page<Map<String, Object>> moneyListTop = page.setRecords(this.baseMapper.selectMoneyListTop(curPage));
        //获取年龄
        for (int i=0;i<moneyListTop.getRecords().size();i++){
            String birthday = (String) moneyListTop.getRecords().get(i).get("person_birthday");
            String a = String.valueOf(AgeByBirthUtil.getAgeByBirth(birthday));
            moneyListTop.getRecords().get(i).put("person_birthday",a);
            String adress = (String)moneyListTop.getRecords().get(i).get("person_adress");
            String ad = adress.substring(adress.length()- 3);
            moneyListTop.getRecords().get(i).put("person_adress",ad);
        }
        return moneyListTop;
    }
    //富豪榜 周榜:先按照规定时间筛选，然后按照用户充值总金额排序
    @Override
    public Page<Map<String, Object>> selectPersonMoney(int curPage) throws ParseException {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>();
        Page<Map<String, Object>> moneyList = page.setRecords(this.baseMapper.selectMoneyList(curPage));
        //获取年龄
        for (int i=0;i<moneyList.getRecords().size();i++){
            String birthday = (String) moneyList.getRecords().get(i).get("person_birthday");
            String a = String.valueOf(AgeByBirthUtil.getAgeByBirth(birthday));
            moneyList.getRecords().get(i).put("person_birthday",a);
            String adress = (String)moneyList.getRecords().get(i).get("person_adress");
            String ad = adress.substring(adress.length()- 3);
            moneyList.getRecords().get(i).put("person_adress",ad);
        }
        return moneyList;
    }

    //富豪榜 总榜 前三 :查询用户充值总金额
    @Override
    public Page<Map<String, Object>> selectPersonMoneyAllTop(int curPage) throws ParseException {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>();
        Page<Map<String, Object>> moneyListAllTop = page.setRecords(this.baseMapper.selectMoneyListAllTop(curPage));
        //获取年龄
        for (int i=0;i<moneyListAllTop.getRecords().size();i++){
            String birthday = (String) moneyListAllTop.getRecords().get(i).get("person_birthday");
            String a = String.valueOf(AgeByBirthUtil.getAgeByBirth(birthday));
            moneyListAllTop.getRecords().get(i).put("person_birthday",a);
            String adress = (String)moneyListAllTop.getRecords().get(i).get("person_adress");
            String ad = adress.substring(adress.length()- 3);
            moneyListAllTop.getRecords().get(i).put("person_adress",ad);
        }
        return moneyListAllTop;
    }
    //富豪榜 总榜 第四到第十:查询用户充值总金额
    @Override
    public Page<Map<String, Object>> selectPersonMoneyAll(int curPage) throws ParseException {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>();
        Page<Map<String, Object>> moneyListAll = page.setRecords(this.baseMapper.selectMoneyListAll(curPage));
        //获取年龄
        for (int i=0;i<moneyListAll.getRecords().size();i++){
            String birthday = (String) moneyListAll.getRecords().get(i).get("person_birthday");
            String a = String.valueOf(AgeByBirthUtil.getAgeByBirth(birthday));
            moneyListAll.getRecords().get(i).put("person_birthday",a);
            String adress = (String)moneyListAll.getRecords().get(i).get("person_adress");
            String ad = adress.substring(adress.length()- 3);
            moneyListAll.getRecords().get(i).put("person_adress",ad);
        }
        return moneyListAll;
    }





    public ZyfIndexMapper getZyfIndexMapper() {
        return zyfIndexMapper;
    }

    public void setZyfIndexMapper(ZyfIndexMapper zyfIndexMapper) {
        this.zyfIndexMapper = zyfIndexMapper;
    }
}
