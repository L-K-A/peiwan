package com.peiwan.serviceimpl;

import com.peiwan.bean.PComment;
import com.peiwan.dao.PCommentMapper;
import com.peiwan.service.PCommentService;
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
public class PCommentServiceImpl extends ServiceImpl<PCommentMapper, PComment> implements PCommentService {

}
