package com.peiwan.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.TComment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import java.util.Map;

/**
 * @Author: 秦世昌
 * @Despriction:
 * @Date:Created in 11:47 2019/1/22
 * @Modify by:
 */
public interface CommentMapper extends BaseMapper {
    /*添加评论是先根据订单id（oid）查询数据库是否已经有此订单的评论，如果有则不再添加评论，遵循一个订单只有一个评论的规则*/
    @Select("select count(oid) from t_comment where oid=#{oid}")
    Integer seachComment(TComment comment);

    @Insert("insert t_comment values(#{pid},#{zid},#{oid},#{gid},null,#{cContext},#{cCreatetime},#{cRank})")
    Integer addComment(TComment comment);

}
