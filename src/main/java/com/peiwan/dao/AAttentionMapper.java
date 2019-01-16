package com.peiwan.dao;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.GSort;
import org.apache.ibatis.annotations.Mapper;
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
@Mapper
public interface AAttentionMapper extends BaseMapper<GSort> {

    /**
    * @description: 查询板块id最大值+1
    * @author: 张帅东
    */
    @Select("select max(gid)+1 as id from g_sort")
    int selectGameId();


}
