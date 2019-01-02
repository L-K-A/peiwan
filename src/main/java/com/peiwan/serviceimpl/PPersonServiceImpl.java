package com.peiwan.serviceimpl;

import com.peiwan.bean.PPerson;
import com.peiwan.dao.PPersonMapper;
import com.peiwan.service.PPersonService;
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
public class PPersonServiceImpl extends ServiceImpl<PPersonMapper, PPerson> implements PPersonService {

}
