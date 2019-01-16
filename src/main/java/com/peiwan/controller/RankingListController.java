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


    @RequestMapping("/gethotrank")
    public Map<String,Object> getHotRank(Integer gid,Integer hotday){

        System.out.println(gid);
        System.out.println(hotday);

        Map<String,Object> map = new HashMap<>();
        map.put("gid",gid);
        map.put("days",hotday);
        List<Map<String, Object>> hotRank = rls.getHotRanking(map);
        for (Map<String, Object> stringObjectMap : hotRank) {
            System.out.println(stringObjectMap);
        }
        map.put("hotRank",hotRank);

        return map;
    }



    public RankingListService getRls() {
        return rls;
    }

    public void setRls(RankingListService rls) {
        this.rls = rls;
    }
}
