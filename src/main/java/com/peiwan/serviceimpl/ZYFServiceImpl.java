package com.peiwan.serviceimpl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.TPerson;
import com.peiwan.dao.ZYFMapper;
import com.peiwan.service.ZYFService;
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
public class ZYFServiceImpl extends ServiceImpl<ZYFMapper, TPerson> implements ZYFService {

    @Resource
    private ZYFMapper zyfMapper;


    //查询主播列表
    @Override
    public Page<Map<String, Object>> selectPersonList(int curPage) {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>();
        Page<Map<String, Object>> mapPage = page.setRecords(this.baseMapper.selectPersonPage(curPage));
        return mapPage;
    }

    //导航栏根据昵称和Id模糊查询
    @Override
    public List<Map<String,Object>> selectPersonByNameId(TPerson person) {
        List<Map<String, Object>> maps =zyfMapper.selectPersonByNameAndId(person);
        return maps;
    }


    //热度榜 周榜：查询主播订单数，先筛选规定时间，然后按照订单数排序
    @Override
    public Page<Map<String, Object>> selectPersonOrder(int curPage) {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>();
        Page<Map<String, Object>> orderList = page.setRecords(this.baseMapper.selectOrderList(curPage));
        return orderList;
    }
    //热度榜 总榜：查询主播总订单数
    @Override
    public Page<Map<String, Object>> selectPersonOrderAll(int curPage) {
        Page<Map<String,Object>> page = new Page<Map<String, Object>>();
        Page<Map<String, Object>> orderListAll = page.setRecords(this.baseMapper.selectOrderListAll(curPage));
        return orderListAll;
    }



    public ZYFMapper getZyfMapper() {
        return zyfMapper;
    }

    public void setZyfMapper(ZYFMapper zyfMapper) {
        this.zyfMapper = zyfMapper;
    }
}
