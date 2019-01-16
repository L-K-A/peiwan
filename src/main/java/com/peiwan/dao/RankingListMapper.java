package com.peiwan.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.PPerson;
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


    List<Map<String,Object>> getHotRanking(Map map);

}
