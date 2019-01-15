package com.peiwan.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * @Author: 秦世昌
 * @Despriction:
 * @Date:Created in 14:26 2019/1/15
 * @Modify by:
 */
public interface RankingListMapper extends BaseMapper {

    @Select("")
    List<Map<String,Object>> hotRanking(Map map);

}
