package com.peiwan.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.peiwan.bean.AAttention;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

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
}
