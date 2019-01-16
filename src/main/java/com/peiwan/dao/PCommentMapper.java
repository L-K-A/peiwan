package com.peiwan.dao;

import com.peiwan.bean.PComment;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
public interface PCommentMapper extends BaseMapper<PComment> {

    /**
    * @description: 查询所有的评论
    * @author: 张帅东
    */
    @Select("select * from p_comment")
    List<PComment> selectComment();

}
