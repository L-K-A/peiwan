package com.peiwan.controller;


import com.peiwan.bean.TComment;
import com.peiwan.service.CommentService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @Author: 秦世昌
 * @Despriction:
 * @Date:Created in 16:38 2019/1/21
 * @Modify by:
 */
@RestController
public class CommentController {

    @Resource
    private CommentService cs;

    public CommentService getCs() {
        return cs;
    }

    public void setCs(CommentService cs) {
        this.cs = cs;
    }

    @RequestMapping("/getcomment")
    public Integer comment(Integer pid,String oid,Integer zid,Integer gid,String content,Double pf){

        /*System.out.println("评分："+pf);
        System.out.println("评价："+content);
        System.out.println("订单id："+oid);
        System.out.println("主播id："+zid);
        System.out.println("游戏id："+gid);
        System.out.println("用户id："+pid);*/

        /*时间戳转化为String类型，精确到分*/
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String tim = sdf.format(new Date());

        TComment comment = new TComment();
        comment.setPid(pid);
        comment.setOid(oid);
        comment.setZid(zid);
        comment.setGid(gid);
        comment.setCContext(content);
        comment.setCCreatetime(tim);
        comment.setCRank(pf);

        /*添加评价之前先进行判断此订单是否已经评价过*/
        Integer seachComment = cs.seachComment(comment);
        if (seachComment>0){
            return 3;
        }else {
            Integer addComment = cs.addComment(comment);
            return addComment;
        }

    }
}
