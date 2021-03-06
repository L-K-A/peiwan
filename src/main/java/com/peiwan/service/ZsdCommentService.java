package com.peiwan.service;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.peiwan.bean.TComment;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
public interface ZsdCommentService extends IService<TComment> {

    /**
    * @description: 分页查询评论数据
    * @author: 张帅东
    */
    IPage<TComment> queryCommentPage(@Param("pg") Page<TComment> page, TComment tComment, String minTime, String maxTime);

    /**
    * @description: 根据评分删除评论信息
    * @author: 张帅东
    */
    int deleteComment(TComment tComment);

}
