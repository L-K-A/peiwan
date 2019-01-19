package com.peiwan.serviceimpl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.TPerson;
import com.peiwan.dao.ZyfIndexMapper;
import com.peiwan.service.ZyfIndexService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
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
    public Page<Map<String, Object>> selectHotPerson(int curPage,int pageSize) {
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



    //热度榜 周榜 前三：先筛选规定时间，然后按照订单数排序
    @Override
    public Page<Map<String, Object>> selectPersonOrderTop(int curPage,int pageSize) {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>();
        Page<Map<String, Object>> orderListTop = page.setRecords(this.baseMapper.selectOrderListTop(curPage,pageSize));
        return orderListTop;
    }
    //热度榜 周榜 第四到第十：先筛选规定时间，然后按照订单数排序
    @Override
    public Page<Map<String, Object>> selectPersonOrder(int curPage,int pageSize) {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>();
        Page<Map<String, Object>> orderList = page.setRecords(this.baseMapper.selectOrderList(curPage,pageSize));
        return orderList;
    }

    //热度榜 总榜 前三 ：查询主播总订单数
    @Override
    public Page<Map<String, Object>> selectPersonOrderAllTop(int curPage, int pageSize) {
        Page<Map<String,Object>> page = new Page<Map<String, Object>>();
        Page<Map<String, Object>> orderListAllTop = page.setRecords(this.baseMapper.selectOrderListAllTop(curPage, pageSize));
        return orderListAllTop;
    }
    //热度榜 总榜 第四到第十：查询主播总订单数
    @Override
    public Page<Map<String, Object>> selectPersonOrderAll(int curPage, int pageSize) {
        Page<Map<String,Object>> page = new Page<Map<String, Object>>();
        Page<Map<String, Object>> orderListAll = page.setRecords(this.baseMapper.selectOrderListAll(curPage,pageSize));
        return orderListAll;
    }



    //人气榜 周榜 前三：先按照规定时间筛选，根据主播的接单总时长来排序
    @Override
    public Page<Map<String, Object>> selectPersonTimeTop(int curPage, int pageSize) {
        Page<Map<String,Object>> page = new Page<Map<String, Object>>();
        Page<Map<String, Object>> timeListTop = page.setRecords(this.baseMapper.selectTimeListTop(curPage,pageSize));
        return timeListTop;
    }
    //人气榜 周榜 第四到第十：先按照规定时间筛选，根据主播的接单总时长来排序
    @Override
    public Page<Map<String, Object>> selectPersonTime(int curPage, int pageSize) {
        Page<Map<String,Object>> page = new Page<Map<String, Object>>();
        Page<Map<String, Object>> timeList = page.setRecords(this.baseMapper.selectTimeList(curPage,pageSize));
        return timeList;
    }
    //人气榜 总榜 前三：根据主播的接单总时长来排序
    @Override
    public Page<Map<String, Object>> selectPersonTimeAllTop(int curPage, int pageSize) {
        Page<Map<String,Object>> page = new Page<Map<String, Object>>();
        Page<Map<String, Object>> timeListAllTop = page.setRecords(this.baseMapper.selectTimeListAllTop(curPage,pageSize));
        return timeListAllTop;
    }
    //人气榜 总榜 第四到第十：根据主播的接单总时长来排序
    @Override
    public Page<Map<String, Object>> selectPersonTimeAll(int curPage, int pageSize) {
        Page<Map<String,Object>> page = new Page<Map<String, Object>>();
        Page<Map<String, Object>> timeListAll = page.setRecords(this.baseMapper.selectTimeListAll(curPage,pageSize));
        return timeListAll;
    }



    //富豪榜 周榜 前三 ：先按照规定时间筛选，然后按照用户充值总金额排序
    @Override
    public Page<Map<String, Object>> selectPersonMoneyTop(int curPage) {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>();
        Page<Map<String, Object>> moneyListTop = page.setRecords(this.baseMapper.selectMoneyListTop(curPage));
        return moneyListTop;
    }
    //富豪榜 周榜:先按照规定时间筛选，然后按照用户充值总金额排序
    @Override
    public Page<Map<String, Object>> selectPersonMoney(int curPage) {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>();
        Page<Map<String, Object>> moneyList = page.setRecords(this.baseMapper.selectMoneyList(curPage));
        return moneyList;
    }

    //富豪榜 总榜 前三 :查询用户充值总金额
    @Override
    public Page<Map<String, Object>> selectPersonMoneyAllTop(int curPage) {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>();
        Page<Map<String, Object>> moneyListAllTop = page.setRecords(this.baseMapper.selectMoneyListAllTop(curPage));
        return moneyListAllTop;
    }
    //富豪榜 总榜 第四到第十:查询用户充值总金额
    @Override
    public Page<Map<String, Object>> selectPersonMoneyAll(int curPage) {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>();
        Page<Map<String, Object>> moneyListAll = page.setRecords(this.baseMapper.selectMoneyListAll(curPage));
        return moneyListAll;
    }





    public ZyfIndexMapper getZyfIndexMapper() {
        return zyfIndexMapper;
    }

    public void setZyfIndexMapper(ZyfIndexMapper zyfIndexMapper) {
        this.zyfIndexMapper = zyfIndexMapper;
    }
}
