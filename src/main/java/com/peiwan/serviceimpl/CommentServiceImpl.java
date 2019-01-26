package com.peiwan.serviceimpl;

import com.peiwan.bean.TComment;
import com.peiwan.dao.CommentMapper;
import com.peiwan.service.CommentService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

/**
 * @Author: 秦世昌
 * @Despriction:
 * @Date:Created in 11:49 2019/1/22
 * @Modify by:
 */
@Service
public class CommentServiceImpl implements CommentService {


    @Resource
    private CommentMapper cm;

    public CommentMapper getCm() {
        return cm;
    }

    public void setCm(CommentMapper cm) {
        this.cm = cm;
    }

    /*添加评论是先根据订单id（oid）查询数据库是否已经有此订单的评论，如果有则不再添加评论，遵循一个订单只有一个评论的规则*/
    @Override
    public Integer seachComment(TComment comment) {
        return cm.seachComment(comment);
    }


    /*用户支付完成之后对导师的评价*/
    @Override
    public Integer addComment(TComment comment) {

        Integer add = cm.addComment(comment);

        return add;
    }
}
