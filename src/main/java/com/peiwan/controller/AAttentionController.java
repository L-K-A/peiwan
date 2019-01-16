package com.peiwan.controller;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.GSort;
import com.peiwan.bean.PComment;
import com.peiwan.bean.Result;
import com.peiwan.dao.AAttentionMapper;
import com.peiwan.service.AAttentionService;
import com.peiwan.service.PCommentService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import javax.annotation.Resource;
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
public class AAttentionController {

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
    private AAttentionService aAttentionService;
    @Resource
    private PCommentService pCommentService;

    /**
    * @description: 分页查询板块数据
    * @author: 张帅东
    */
    @RequestMapping("/toGame")
    public ModelAndView toGame() {
        return new ModelAndView("service-game");
    }
    @RequestMapping("/getGamePage")
    public Map queryGameList(int pageCurrent, int pageSize, GSort gSort){
        Map map = new HashMap();
        Page<GSort> page = new Page<>(pageCurrent,pageSize);
        IPage<GSort> gSortIPage = aAttentionService.queryGamePage(page,gSort);
        /**得到板块数据*/
        List<GSort> gSortList = gSortIPage.getRecords();
        map.put("page",gSortList);
        /**板块总条数*/
        map.put("totalPage",gSortIPage.getPages());
        /**System.out.println("板块数据"+gSortList);*/
        return map;
    }
    @Resource
    private AAttentionMapper aAttentionMapper;

    /**
     * @description: 查询板块id最大值+1
     * @author: 张帅东
     */
    @RequestMapping("/selectGameId")
    public ModelAndView selectGameId(){
        Map map=new HashMap<>();
        int gId = aAttentionService.selectGameId();
        map.put("id",gId);
        return new ModelAndView("add-board",map);
    }

    /**
    * @description: 校验板块名是否存在
    * @author: 张帅东
    */
    @RequestMapping("/selectGameName")
    public Map selectGameName(GSort gSort){
        Map map=new HashMap();
        boolean result = aAttentionService.selectGameName(gSort);
        map.put("result",result);
        /**System.out.println(map.get("result"));*/
        return map;
    }

    /**
    * @description: 增加新板块
    * @author: 张帅东
    */
    @RequestMapping("/addGame")
    public String addGame(GSort gSort){
        gSort.setGid(aAttentionService.selectGameId());
        aAttentionService.addGame(gSort);
        return "";
    }

    /**
    * @description: 根据板块名删除板块信息
    * @author: 张帅东
    */
    @RequestMapping("/deleteGame")
    public Result deleteGsort(GSort gSort){
        aAttentionService.deleteGsort(gSort);
        /**System.out.println("传的值:"+gSort.getGName());*/
        return new Result();
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
    public Map queryCommentList(int pageCurrent, int pageSize, PComment pComment,String minTime, String maxTime){
        String min=minTime.replaceAll("-","");
        String max=maxTime.replaceAll("-","");
        /**System.out.println(min+"-"+max);*/
        Map map = new HashMap();
        Page<PComment> page = new Page<>(pageCurrent,pageSize);
        IPage<PComment> pCommentIPage =pCommentService.queryCommentPage(page,pComment,min,max);
        /**得到评论数据*/
        List<PComment> pCommentList = pCommentIPage.getRecords();
        map.put("page",pCommentList);
        /**评论总条数*/
        map.put("totalPage",pCommentIPage.getPages());
        return map;
    }

    /**
    * @description: 根据评分删除评论信息
    * @author: 张帅东
    */
    @RequestMapping("/deleteComment")
    public Result deleteComment(PComment pComment){
        pCommentService.deleteComment(pComment);
        return new Result();
    }


    public AAttentionService getaAttentionService() {
        return aAttentionService;
    }

    public void setaAttentionService(AAttentionService aAttentionService) {
        this.aAttentionService = aAttentionService;
    }


    public PCommentService getpCommentService() {
        return pCommentService;
    }

    public void setpCommentService(PCommentService pCommentService) {
        this.pCommentService = pCommentService;
    }

    public AAttentionMapper getaAttentionMapper() {
        return aAttentionMapper;
    }

    public void setaAttentionMapper(AAttentionMapper aAttentionMapper) {
        this.aAttentionMapper = aAttentionMapper;
    }
}
