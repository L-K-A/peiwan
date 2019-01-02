package com.peiwan.serviceimpl;

import com.peiwan.bean.YService;
import com.peiwan.dao.YServiceMapper;
import com.peiwan.service.YServiceService;
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
public class YServiceServiceImpl extends ServiceImpl<YServiceMapper, YService> implements YServiceService {

}
