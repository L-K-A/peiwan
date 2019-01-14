package com.peiwan.service;

import com.peiwan.bean.AAttention;
import com.baomidou.mybatisplus.extension.service.IService;
import com.peiwan.bean.PPerson;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
public interface AAttentionService extends IService<PPerson> {
//   测试
    PPerson namepperson(PPerson pPerson);
    List<PPerson> addpperson(int id);
}
