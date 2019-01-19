package com.peiwan.controller;
import com.peiwan.bean.TPerson;
import com.peiwan.service.TeacherInfoService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: zhangwanli
 * @Despriction:
 * @Date:Created in 12:00 2019/1/4
 * @Modify by:
 */
@RestController
@RequestMapping("/teacherPage")
public class TeacherInfoController {
    @Resource
    private TeacherInfoService teacherInfoService;

    /*获取导师表全部信息*/
    @RequestMapping("/getInfo")
    public Map getInfo(Integer pid) throws ParseException {
        Map<String, Object> map = teacherInfoService.getInfo(pid);
        return map;
    }

    /*评论数据分页的实现*/
    /*@RequestMapping("/findComment")
    public Map<String, Object> findComment(Integer pageNum ,Integer zid,Integer gid) {
        TComment ppc = new TComment();
        int pageSize = 4;//页面接收数据大小
        IPage<Map<String, Object>> iPage = teacherInfoService.selectPageExt(ppc, pageNum, pageSize,zid,gid);
        iPage.getRecords();
        System.out.println(iPage.getRecords());
        System.out.println(iPage.getTotal());
        HashMap<String, Object> map = new HashMap<>();
        map.put("content",iPage);
        return map;
    }*/

    /*查询关注 */
    @RequestMapping("/selectAttention")
    /*传入关注人和被关注人的id  返回1插入成功  返回零表示取消关注成功*/
    public Integer selectAttention(Integer pid, Integer zid) {
        Integer s = teacherInfoService.selectAttention(pid, zid);
        return s;
    }

    /*增加关注 */
    @RequestMapping("/insertAttention")
    /*传入关注人和被关注人的id  返回1插入成功  返回零表示取消关注成功*/
    public Integer insertAttention(Integer pid, Integer zid) {
        Integer integer = teacherInfoService.insertAttention(pid, zid);
        return integer;
    }

    /*获取主播的评价分数 */
    @RequestMapping("/getCommentavg")
    public double getComment(Integer zid) {
        double avg = teacherInfoService.selectAvg(zid);
        /*System.out.println(avg);*/
        return avg;
    }

    /*获取主播服务类型*/
    @RequestMapping("/selectZhuboService")
    public Map<String,Object> selectZhuboService(Integer zid) {
        List<Map<String,Object>> stri = teacherInfoService.selectZhuboService(zid);
        Map<String,Object> map= new HashMap<>();
        map.put("strin",stri);
        return map;
    }

    /*依据 zid  gid   获取主播的  指定服务 的 段位 价格 服务介绍   服务次数*/
    @RequestMapping("/selectZhudp")
    public Map<String, Object> selectZhudp(Integer zid,Integer pageNum) {
        Map<String, Object> map = teacherInfoService.selectZhudp(zid,pageNum);
        return map;
    }


    public TeacherInfoService getTeacherInfoService() {
        return teacherInfoService;
    }

    public void setTeacherInfoService(TeacherInfoService teacherInfoService) {
        this.teacherInfoService = teacherInfoService;
    }
}
