package com.peiwan.controller;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.Result;
import com.peiwan.bean.TComment;
import com.peiwan.bean.TSort;
import com.peiwan.dao.ZsdSortMapper;
import com.peiwan.service.ZsdSortService;
import com.peiwan.service.ZsdCommentService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@RestController
public class ZsdSortController {

    /**
    * @description: 板块管理
    * @author: 张帅东
    */
    @RequestMapping("/service-game")
    public ModelAndView showGame(){
        return new ModelAndView("service-game");
    }


   /**
   * @description: 评论列表
   * @author: 张帅东
   */
    @RequestMapping("/comment-list")
    public ModelAndView showComment(){
        return new ModelAndView("comment-list");
    }

    @Resource
    private ZsdSortService zsdSortService;
    @Resource
    private ZsdCommentService zsdCommentService;

    /**
    * @description: 分页查询板块数据
    * @author: 张帅东
    */
    @RequestMapping("/toGame")
    public ModelAndView toGame() {
        return new ModelAndView("service-game");
    }
    @RequestMapping("/getGamePage")
    public Map queryGameList(int pageCurrent, int pageSize, TSort tSort){
        Map map = new HashMap();
        Page<TSort> page = new Page<>(pageCurrent,pageSize);
        IPage<TSort> tSortIPage = zsdSortService.queryGamePage(page,tSort);
        /**得到板块数据*/
        List<TSort> tSortList = tSortIPage.getRecords();
        map.put("page",tSortList);
        /**板块总页数*/
        map.put("totalPage",tSortIPage.getPages());
        /**板块总条数*/
        map.put("totalNumber",tSortIPage.getTotal());
        return map;
    }
    @Resource
    private ZsdSortMapper zsdSortMapper;

    /**
     * @description: 查询板块id最大值+1
     * @author: 张帅东
     */
    @RequestMapping("/selectGameId")
    public ModelAndView selectGameId(){
        Map map=new HashMap<>();
        int gId = zsdSortService.selectGameId();
        map.put("id",gId);
        return new ModelAndView("add-board",map);
    }

    /**
    * @description: 校验板块名是否存在
    * @author: 张帅东
    */
    @RequestMapping("/selectGameName")
    public Map selectGameName(TSort tSort){
        Map map=new HashMap();
        boolean result = zsdSortService.selectGameName(tSort);
        map.put("result",result);
        return map;
    }

    /**
    * @description: 增加新板块
    * @author: 张帅东
    */
    @RequestMapping("/addGame")
    public String addGame(TSort tSort){
        tSort.setGid(zsdSortService.selectGameId());
        zsdSortService.addGame(tSort);
        return "";
    }

    /**
    * @description: 根据板块id删除板块信息
    * @author: 张帅东
    */
    @RequestMapping("/deleteGame")
    public int deleteGame(Integer gid){
        return zsdSortService.deleteGameById(gid);
    }

    /**
    * @description: 分页查询评论数据
    * @author: 张帅东
    */
    @RequestMapping("/toComment")
    public ModelAndView toComment(){
        return new ModelAndView("comment-list");
    }
    @RequestMapping("/getCommentPage")
    public Map queryCommentList(int pageCurrent, int pageSize, TComment tComment, String minTime, String maxTime){
        String min=minTime.replaceAll("-","");
        String max=maxTime.replaceAll("-","");
        Map map = new HashMap();
        Page<TComment> page = new Page<>(pageCurrent,pageSize);
        IPage<TComment> tCommentIPage = zsdCommentService.queryCommentPage(page,tComment,min,max);
        /**得到评论数据*/
        List<TComment> tCommentList = tCommentIPage.getRecords();
        map.put("page",tCommentList);
        /**评论总页数*/
        map.put("totalPage",tCommentIPage.getPages());
        /**评论总条数*/
        map.put("totalNumber",tCommentIPage.getTotal());
        return map;
    }

    /**
    * @description: 根据评论id删除评论信息
    * @author: 张帅东
    */
    @RequestMapping("/deleteComment")
    public int deleteComment(Integer cid){
        return zsdCommentService.deleteCommentById(cid);
    }

    /**
    * @description: 根据板块id批量删除
    * @author: 张帅东
    */
    @RequestMapping("/deleteGames")
    public boolean deleteGames(String ids){
        List<String> list = new ArrayList<>();
        String[] str = ids.split(",");
        for (int i = 0; i < str.length; i++) {
            list.add(str[i]);
            }
        int j = zsdSortService.deleteGames(list);
        if(j > 0){
            return true;
        }
        return false;
    }

    /**
    * @description: 根据评论id批量删除
    * @author: 张帅东
    */
    @RequestMapping("/deleteComments")
    public boolean deleteComments(String ids){
        List<String> list = new ArrayList<>();
        String[] str = ids.split(",");
        for (int i=0;i<str.length;i++){
            list.add(str[i]);
        }
        int j = zsdCommentService.deleteComments(list);
        if (j>0){
            return true;
        }
        return false;
    }


    public ZsdSortService getZsdSortService() {
        return zsdSortService;
    }

    public void setZsdSortService(ZsdSortService zsdSortService) {
        this.zsdSortService = zsdSortService;
    }


    public ZsdCommentService getZsdCommentService() {
        return zsdCommentService;
    }

    public void setZsdCommentService(ZsdCommentService zsdCommentService) {
        this.zsdCommentService = zsdCommentService;
    }

    public ZsdSortMapper getZsdSortMapper() {
        return zsdSortMapper;
    }

    public void setZsdSortMapper(ZsdSortMapper zsdSortMapper) {
        this.zsdSortMapper = zsdSortMapper;
    }
}
