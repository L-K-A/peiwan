package com.peiwan.serviceimpl;

import com.peiwan.dao.RankingListMapper;
import com.peiwan.service.RankingListService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * @Author: 秦世昌
 * @Despriction:
 * @Date:Created in 14:27 2019/1/15
 * @Modify by:
 */
@Service
public class RankingListServiceImpl implements RankingListService {

    @Resource
    private RankingListMapper rlm;

    public RankingListMapper getRlm() {
        return rlm;
    }

    public void setRlm(RankingListMapper rlm) {
        this.rlm = rlm;
    }

    /*热度榜*/
    public List<Map<String,Object>> getHotRanking (Map map){
        List<Map<String, Object>> mapList = rlm.getHotRanking(map);
        return mapList;
    }

}
