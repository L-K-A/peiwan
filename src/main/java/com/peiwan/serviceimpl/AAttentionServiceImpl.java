package com.peiwan.serviceimpl;

import com.peiwan.bean.AAttention;
import com.peiwan.bean.PPerson;
import com.peiwan.dao.AAttentionMapper;
import com.peiwan.service.AAttentionService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

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

    public AAttentionMapper getaAttentionMapper() {
        return aAttentionMapper;
    }

    public void setaAttentionMapper(AAttentionMapper aAttentionMapper) {
        this.aAttentionMapper = aAttentionMapper;
    }
}
