package com.peiwan.service;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.PComment;
import com.baomidou.mybatisplus.extension.service.IService;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
public interface PCommentService extends IService<PComment> {

    /**
    * @description: 分页查询评论数据
    * @author: 张帅东
    */
    IPage<PComment> queryCommentPage(@Param("pg") Page<PComment> page, PComment pComment,String minTime, String maxTime);

    /**
    * @description: 根据评分删除评论信息
    * @author: 张帅东
    */
    int deleteComment(PComment pComment);

}
