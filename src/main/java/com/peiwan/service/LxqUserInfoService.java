package com.peiwan.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.peiwan.bean.TAlity;
import com.peiwan.bean.TAttention;
import com.peiwan.bean.TPerson;
import com.peiwan.bean.TService;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
public interface LxqUserInfoService extends IService<TAttention> {
    List<TAttention> queryAAttentionList();
    int queryPPersonInsert(TPerson pPerson);
    /*关注查询分页*/
    List<Map<String,Object>> queryAttentionPage(Page page,int pid);
    /*申请信息更新*/
    int queryUpdateUserInfo(TPerson person);
    /*才艺表更新*/
    int queryUpdateUserAlity(TAlity ality);
    /*选择板块更新*/
    int queryUpdateUserService(TService service);
}
