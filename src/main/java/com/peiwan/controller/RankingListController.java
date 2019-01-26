package com.peiwan.controller;

import com.peiwan.service.RankingListService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: 秦世昌
 * @Despriction:
 * @Date:Created in 14:26 2019/1/15
 * @Modify by:
 */
@RestController
public class RankingListController {

    @Resource
    private RankingListService rls;


    /*热度榜*/
    @RequestMapping("/gethotrank")
    public Map<String,Object> getHotRank(Integer gid,Integer hotday){

        System.out.println(gid);
        System.out.println(hotday);

        Map<String,Object> map = new HashMap<>();
        map.put("gid",gid);
        map.put("hotday",hotday);
        List<Map<String, Object>> hotRank = rls.getHotRanking(map);
        for (Map<String, Object> stringObjectMap : hotRank) {
            System.out.println(stringObjectMap);
        }
        map.put("hotRank",hotRank);

        return map;
    }


    /*富豪榜*/
    @RequestMapping("/gemagnaterank")
    public Map<String,Object> getMagnateRank(Integer gid,Integer magnateday){

        System.out.println(gid);
        System.out.println(magnateday);

        Map<String,Object> map = new HashMap<>();
        map.put("gid",gid);
        map.put("magnateday",magnateday);
        List<Map<String, Object>> magnateRank = rls.getMagnateRanking(map);
        for (Map<String, Object> stringObjectMap : magnateRank) {
            System.out.println(stringObjectMap);
        }
        map.put("magnateRank",magnateRank);
        return map;
    }



    public RankingListService getRls() {
        return rls;
    }

    public void setRls(RankingListService rls) {
        this.rls = rls;
    }
}
