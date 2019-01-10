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
public class AAttentionServiceImpl extends ServiceImpl<AAttentionMapper, PPerson> implements AAttentionService {

    @Resource
    private AAttentionMapper aAttentionMapper;

    @Override
    public List<PPerson> namepperson(PPerson pPerson) {
        List<PPerson> pPersonList=aAttentionMapper.namepperson(pPerson);
        return pPersonList;
    }


    @Override
    public List<PPerson> addpperson(int id) {
        return aAttentionMapper.addpperson(id);
    }

}
