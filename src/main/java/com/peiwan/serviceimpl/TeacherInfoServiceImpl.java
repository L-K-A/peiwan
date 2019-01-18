package com.peiwan.serviceimpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.TAttention;
import com.peiwan.bean.TPerson;
import com.peiwan.dao.TAttentionMapper;
import com.peiwan.dao.TeacherInfoMapper;
import com.peiwan.peiUtils.AgeByBirthUtil;
import com.peiwan.service.TeacherInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import static com.peiwan.peiUtils.ConstellationUtil.calculateConstellation;

/**
 * @Author: zhangwanli
 * @Despriction:
 * @Date:Created in 12:08 2019/1/4
 * @Modify by:
 */
@Service
public class TeacherInfoServiceImpl implements TeacherInfoService {
    @Resource
    private TAttentionMapper aAttentionMapper;
    @Resource
    private TeacherInfoMapper teacherInfoMapper;



    /*获取导师全部信息*/
    @Override
    public Map<String, Object> getInfo(int pid) throws ParseException {
        Map<String, Object> map = teacherInfoMapper.selectInfo(pid);
        System.out.println(map);
        /* 获取星座  暂存person_sex字段内*/
       String personBirthday =(String)map.get("person_birthday");
        String s = calculateConstellation(personBirthday);
        map.put("person_sex",s);
        /*获取年龄   暂存person_birthday 字段内*/
        int age = AgeByBirthUtil.getAgeByBirth(personBirthday);
        String s1 = String.valueOf(age);
        map.put("person_birthday",s1);
        /*获取主播评分   暂存person_weight*/
        Integer v = this.selectAvg(pid);
        String s2 = String.valueOf(v);
        map.put("person_weight",s2);
        return map;
    }

    /*分页实现*/
    @Override
    public IPage<Map<String, Object>> selectPageExt(int page, int pageSize, Integer zid, Integer gid) throws RuntimeException {
        try {
            Page<Map<String, Object>> p = new Page<Map<String, Object>>(page, pageSize);
            Page<Map<String, Object>> mapPage = p.setRecords(teacherInfoMapper.selectPageExt(p, zid, gid));
            System.out.println(mapPage);
            return p;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    //查询是否关注
    public Integer selectAttention(Integer pid, Integer zid) {
        QueryWrapper<TAttention> queryWrapper = new QueryWrapper<TAttention>();
        queryWrapper
                .eq("pid", pid)
                .eq("zid", zid);
        if (aAttentionMapper.selectList(queryWrapper).isEmpty()) {
            return 0;
        }
        return 1;
    }

    /*关注按钮*/
    @Override
    public Integer insertAttention(Integer pid, Integer zid) {
        QueryWrapper<TAttention> queryWrapper = new QueryWrapper<TAttention>();
        queryWrapper
                .eq("pid", pid)
                .eq("zid", zid);
        /*判断是否已经关注*/
        if (aAttentionMapper.selectList(queryWrapper).isEmpty() && pid != zid) {
            /*未关注 执行插入操作*/
            TAttention tAttention = new TAttention();
            tAttention.setPid(pid);
            tAttention.setZid(zid);
            aAttentionMapper.insert(tAttention);
            return 1;
        }
        /*已关注   执行删除操作*/
        aAttentionMapper.delete(queryWrapper);
        return 0;
    }

    @Override
    public Integer selectAvg(Integer zid) {
        double selectavg = teacherInfoMapper.selectavg(zid);
        Integer zong = teacherInfoMapper.countzongdan(zid);
        if (zong != null && zong < 20) {
            return 0;
        } else if ((zong * 0.6 + selectavg * 0.4) >= 12 && (zong * 0.6 + selectavg * 0.4) < 40) {
            return 1;
        } else if ((zong * 0.6 + selectavg * 0.4) >= 40 && (zong * 0.6 + selectavg * 0.4) < 60) {
            return 2;
        } else if ((zong * 0.6 + selectavg * 0.4) >= 60 && (zong * 0.6 + selectavg * 0.4) < 80) {
            return 3;
        } else if ((zong * 0.6 + selectavg * 0.4) >= 80 && (zong * 0.6 + selectavg * 0.4) < 100) {
            return 4;
        } else if ((zong * 0.6 + selectavg * 0.4) >= 100 && (zong * 0.6 + selectavg * 0.4) < 120) {
            return 5;
        } else if ((zong * 0.6 + selectavg * 0.4) >= 120 && (zong * 0.6 + selectavg * 0.4) < 140) {
            return 6;
        } else if ((zong * 0.6 + selectavg * 0.4) >= 140 && (zong * 0.6 + selectavg * 0.4) < 180) {
            return 7;
        } else {
            return 8;
        }
    }


    /*获取主播服务类型*/
    @Override
    public List<Map<String, Object>> selectZhuboService(Integer zid) {
        List<Map<String, Object>> list = teacherInfoMapper.selectZhuboService(zid);
        return list;
    }

    /*依据 zid   获取主播的  指定服务 的游戏 段位 价格 描述 评价g_name,g_price,g_duanwei,g_content*/
    @Override
    public Map<String, Object> selectZhudp(Integer zid, Integer pageNum) {
        Map<String, Object> map = new HashMap<>();
        List<Map<String, Object>> list = teacherInfoMapper.selectZhudp(zid);
        for (Map<String, Object> st : list) {
            Integer gid = (Integer) st.get("gid");
            /*接单次数*/
            Integer countdan = teacherInfoMapper.countdan(zid, gid);
            st.put("countdan", countdan);
            Map<String, Object> selectfuwuavg = teacherInfoMapper.selectfuwuavg(zid, gid);
            String avgrank =selectfuwuavg.get("avgrank").toString();
            /*避免pingfeng过长 在前台显示不必要  封入当前zid 和gid 下的评价分*/
            String pingfengstring =avgrank.substring(0,3);
            st.put("pingfeng", pingfengstring);
            /*获取到当前状态的评论数 用于分页*/
            Integer selectpagesize =Integer.valueOf(String.valueOf(selectfuwuavg.get("selectpagesize")));
            /*评论分页*/
            Integer pageSize = 0;
            switch(selectpagesize) {
                case 0:
                    pageSize = 0;
                    break;
                case 1:
                    pageSize = 1;
                    break;
                case 2:
                    pageSize = 2;
                    break;
                case 3:
                    pageSize = 3;
                    break;
                case 4:
                    pageSize = 4;
                    break;
                case 5:
                    pageSize = 5;
                    break;
                default:
                    pageSize = 6;
            }
            Page<Map<String, Object>> p = new Page<>(pageNum, pageSize);
            Page<Map<String, Object>> mapPage = p.setRecords(teacherInfoMapper.selectPageExt(p, zid, gid));
            mapPage.getRecords();
            /*将每一条评价分取出  除 2  获取多少个星*/
            for (int sta=0;sta<pageSize;sta++){
                Double dou = (Double) mapPage.getRecords().get(sta).get("c_rank");
                mapPage.getRecords().get(sta).put("c_rank",Math.round(dou / 2));
                System.out.println(mapPage.getRecords().get(0).get("c_rank"));
                st.put("IPage", mapPage);
            }
        }
        map.put("zuiduodenei", list);
        return map;
    }


    public TeacherInfoMapper getTeacherInfoMapper() {
        return teacherInfoMapper;
    }

    public void setTeacherInfoMapper(TeacherInfoMapper teacherInfoMapper) {
        this.teacherInfoMapper = teacherInfoMapper;
    }
}
