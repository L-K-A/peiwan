package com.peiwan.serviceimpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.PPerson;
import com.peiwan.dao.AAttentionMapper;
import com.peiwan.service.AAttentionService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@Service
public class AAttentionServiceImpl extends ServiceImpl<AAttentionMapper, PPerson> implements AAttentionService {

    @Resource
    private AAttentionMapper attentionMapper;

    //登录时根据用户名和密码查询是否存在
    @Override
    public PPerson selectPersonByNameAndPwd(PPerson person) {
        PPerson people = attentionMapper.selectPersonByNameAndPwd(person);
        return people;
    }

    //查询主播列表
    @Override
    public Page<Map<String, Object>> selectPersonList(int curPage) {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>();
        Page<Map<String, Object>> mapPage = page.setRecords(this.baseMapper.selectPersonPage(curPage));
        System.out.println("service:"+mapPage);
        return mapPage;
    }


    //根据昵称和id查询
    @Override
    public List<Map<String,Object>> selectPersonByNameId(PPerson person) {
        List<Map<String, Object>> maps = attentionMapper.selectPersonByNameAndId(person);
        return maps;
    }

    //热度榜查询主播订单数：先按照订单数排序，再查询主播详细信息
    @Override
    public Page<Map<String, Object>> selectPersonOrder(int curPage, int pageNum) {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>(curPage,pageNum);
        Page<Map<String, Object>> orderList = page.setRecords(this.baseMapper.selectOrderList(page, 1));
        System.out.println("service:"+orderList);
        return orderList;
    }



    public AAttentionMapper getAttentionMapper() {
        return attentionMapper;
    }

    public void setAttentionMapper() {
        this.attentionMapper = attentionMapper;
    }
}
