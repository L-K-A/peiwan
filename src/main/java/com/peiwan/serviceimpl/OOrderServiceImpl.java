package com.peiwan.serviceimpl;

import com.peiwan.bean.OOrder;
import com.peiwan.dao.OOrderMapper;
import com.peiwan.service.OOrderService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@Service
public class OOrderServiceImpl extends ServiceImpl<OOrderMapper, OOrder> implements OOrderService {

}
