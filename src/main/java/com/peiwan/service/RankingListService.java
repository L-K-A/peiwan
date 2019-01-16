package com.peiwan.service;

import java.util.List;
import java.util.Map;

/**
 * @Author: 秦世昌
 * @Despriction:
 * @Date:Created in 14:26 2019/1/15
 * @Modify by:
 */
public interface RankingListService {


    List<Map<String,Object>> getHotRanking(Map map);

}
