package com.peiwan.dao;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.TComment;
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
public interface ZsdCommentMapper extends BaseMapper<TComment> {

    /**
    * @description: 查询所有的评论
    * @author: 张帅东
    */
    @Select("select * from t_comment")
    List<TComment> selectComment();

}
