package com.peiwan.serviceimpl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.TAlity;
import com.peiwan.bean.TAttention;
import com.peiwan.bean.TPerson;
import com.peiwan.bean.TService;
import com.peiwan.dao.LxqUserInfoMapper;
import com.peiwan.service.LxqUserInfoService;
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
public class LxqUserInfoServiceImpl extends ServiceImpl<LxqUserInfoMapper, TAttention> implements LxqUserInfoService {

    @Resource
    private LxqUserInfoMapper lxqUserInfoMapper;
    @Override
    public List<TAttention> queryAAttentionList() {
        /*List list= lxqUserInfoMapper.getAAttentionList();*/
        return null;
    }

    @Override
    public int queryPPersonInsert(TPerson pPerson) {
        int a= lxqUserInfoMapper.getUpdatePPerson(pPerson);
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
        List list= lxqUserInfoMapper.getSelectAttention(page,pid);
        return list;
    }

    @Override
    public int queryUpdateUserInfo(TPerson person) {
        int a=lxqUserInfoMapper.getUpdatePPerson(person);
        return a;
    }

    @Override
    public int queryUpdateUserAlity(TAlity ality) {
        lxqUserInfoMapper.getUpdateAlity(ality);
        return 0;
    }

    @Override
    public int queryUpdateUserService(TService service) {
        lxqUserInfoMapper.getUpdateGservice(service);
        return 0;
    }

    public LxqUserInfoMapper getLxqUserInfoMapper() {
        return lxqUserInfoMapper;
    }

    public void setLxqUserInfoMapper(LxqUserInfoMapper lxqUserInfoMapper) {
        this.lxqUserInfoMapper = lxqUserInfoMapper;
    }
}
