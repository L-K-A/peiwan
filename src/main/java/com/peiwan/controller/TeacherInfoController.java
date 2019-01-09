package com.peiwan.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;

import com.peiwan.bean.PComment;
import com.peiwan.bean.PPerson;
import com.peiwan.dao.TeacherInfoMapper;
import com.peiwan.service.TeacherInfoService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
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
    private TeacherInfoMapper teacherInfoMapper;
    @Resource
    private TeacherInfoService teacherInfoService;
    /*获取导师表全部信息*/
    @RequestMapping("/getInfo")
    public Map getInfo(Integer pid) {
        HashMap<String, PPerson> map = new HashMap<>();
        PPerson info = teacherInfoMapper.selectById(pid);
        System.out.println(info);
        map.put("pperson", info);
        return map;
    }
    /*评论数据分页的实现*/
    @RequestMapping("/findComment")
    public List<Map<String, Object>> findComment() {
        PComment ppc = new PComment();
        int page = 1;//当前页
        int pageSize = 2;//页面接收数据大小
        IPage<Map<String, Object>> iPage = teacherInfoService.selectPageExt(ppc, page, pageSize);
        iPage.getRecords();
        System.out.println(iPage.getRecords());
        System.out.println(iPage.getTotal());
        return iPage.getRecords();
    }
    /*增加关注 */
    @RequestMapping("/insertAttention")
    /*传入关注人和被关注人的id  返回1插入成功  返回零表示取消关注成功*/
    public Integer insertAttention(Integer pid, Integer zid) {
        Integer integer = teacherInfoService.insertAttention(pid, zid);
        return integer;
    }

/*获取主播的评价  分数 */
    @RequestMapping("/getCommentavg")
    public double getComment(Integer zid){
        double avg = teacherInfoService.selectAvg(zid);
        System.out.println(avg);
        return avg;
    }



    public TeacherInfoMapper getTeacherInfoMapper() {
        return teacherInfoMapper;
    }

    public void setTeacherInfoMapper(TeacherInfoMapper teacherInfoMapper) {
        this.teacherInfoMapper = teacherInfoMapper;
    }

    public TeacherInfoService getTeacherInfoService() {
        return teacherInfoService;
    }

    public void setTeacherInfoService(TeacherInfoService teacherInfoService) {
        this.teacherInfoService = teacherInfoService;
    }
}
