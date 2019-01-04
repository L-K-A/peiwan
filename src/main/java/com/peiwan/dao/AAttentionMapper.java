package com.peiwan.dao;

import com.peiwan.bean.AAttention;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
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
public interface AAttentionMapper extends BaseMapper<AAttention> {
    /*@Select(" select  * from a_attention")*/
    List<AAttention> getAAttentionList();

}
