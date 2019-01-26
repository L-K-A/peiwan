package com.peiwan.service;


import com.peiwan.bean.TComment;

import java.util.Map;

/**
 * @Author: 秦世昌
 * @Despriction:
 * @Date:Created in 11:48 2019/1/22
 * @Modify by:
 */
public interface CommentService {

    /*添加评论是先根据订单id（oid）查询数据库是否已经有此订单的评论，如果有则不再添加评论，遵循一个订单只有一个评论的规则*/
    Integer seachComment(TComment comment);

    /*用户支付完成之后对导师的评价*/
    Integer addComment(TComment comment);

}
