package com.peiwan.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.AAttention;
import com.baomidou.mybatisplus.extension.service.IService;
import com.peiwan.bean.PPerson;

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
public interface AAttentionService extends IService<AAttention> {
    List<AAttention> queryAAttentionList();
    int queryPPersonInsert(PPerson pPerson);
    /*关注查询分页*/
    List<Map<String,Object>> queryAttentionPage(Page page,int pid);
}
