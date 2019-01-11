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
    public Page<Map<String, Object>> selectPersonList(int currentPage, int pageNum) {
        Page<Map<String,Object>> page = new Page<Map<String,Object>>(currentPage,pageNum);
        Page<Map<String, Object>> mapPage = page.setRecords(this.baseMapper.selectPersonPage(page, 1));
        System.out.println("service:"+mapPage);
        return mapPage;
    }



    //根据昵称和id查询
    @Override
    public List<PPerson> selectPersonByNameId(PPerson person) {
        List<PPerson> list = attentionMapper.selectPersonByNameAndId(person);
        return list;
    }

    public AAttentionMapper getAttentionMapper() {
        return attentionMapper;
    }

    public void setAttentionMapper() {
        this.attentionMapper = attentionMapper;
    }
}
