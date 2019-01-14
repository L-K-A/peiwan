package com.peiwan.serviceimpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.AAttention;
import com.peiwan.bean.PPerson;
import com.peiwan.dao.AAttentionMapper;
import com.peiwan.service.AAttentionService;
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
 * @author bjlz
 * @since 2019-01-02
 */
@Service
public class AAttentionServiceImpl extends ServiceImpl<AAttentionMapper, AAttention> implements AAttentionService {

    @Resource
    private  AAttentionMapper aAttentionMapper;
    @Override
    public List<AAttention> queryAAttentionList() {
        List list=aAttentionMapper.getAAttentionList();
        return list;
    }

    @Override
    public int queryPPersonInsert(PPerson pPerson) {
        int a=aAttentionMapper.getPPersonInsert(pPerson);
        return a;
    }

    /**
     * 分页查询关注
     * @param page
     * @param
     * @return
     */
    @Override
    public List<Map<String,Object>> queryAttentionPage(Page page, int pid) {
        List list= aAttentionMapper.getSelectAttention(page,pid);
        return list;
    }

    public AAttentionMapper getaAttentionMapper() {
        return aAttentionMapper;
    }

    public void setaAttentionMapper(AAttentionMapper aAttentionMapper) {
        this.aAttentionMapper = aAttentionMapper;
    }
}
