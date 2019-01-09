package com.peiwan.serviceimpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.AAttention;
import com.peiwan.bean.PComment;
import com.peiwan.bean.PPerson;
import com.peiwan.dao.AAttentionMapper;
import com.peiwan.dao.TeacherInfoMapper;
import com.peiwan.service.TeacherInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
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
    private AAttentionMapper aAttentionMapper;
    @Resource
    private TeacherInfoMapper teacherInfoMapper;

    /*获取导师全部信息*/
    @Override
    public PPerson getInfo(int pid) {
        PPerson pPerson = teacherInfoMapper.selectById(pid);
        String personBirthday = pPerson.getPersonBirthday();

        String s = calculateConstellation(personBirthday);
        pPerson.setPersonBirthday(s);
        return pPerson;
    }

    /*分页实现*/
    @Override
    public IPage<Map<String, Object>> selectPageExt(PComment pComment, int page, int pageSize) throws RuntimeException {
        try {
            Page<Map<String, Object>> p = new Page<Map<String, Object>>(page, pageSize);
            p.setRecords(teacherInfoMapper.selectPageExt(p, pComment));
            return p;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    /*关注*/
    @Override
    public Integer insertAttention(Integer pid, Integer zid) {
        QueryWrapper<AAttention> queryWrapper = new QueryWrapper<AAttention>();
        queryWrapper
                .eq("pid", pid)
                .eq("zid", zid);
        /*判断是否已经关注*/
        if (aAttentionMapper.selectList(queryWrapper).isEmpty() && pid != zid) {
            /*未关注 执行插入操作*/
            AAttention aAttention = new AAttention();
            aAttention.setPid(pid);
            aAttention.setZid(zid);
            aAttentionMapper.insert(aAttention);
            return 1;
        }
        /*已关注   执行删除操作*/
        aAttentionMapper.delete(queryWrapper);
        return 0;
    }

    /*获取主播当前评分*/
    @Override
    public double selectAvg(Integer zid) {
        double selectavg = teacherInfoMapper.selectavg(zid);
        return selectavg;
    }


    public TeacherInfoMapper getTeacherInfoMapper() {
        return teacherInfoMapper;
    }

    public void setTeacherInfoMapper(TeacherInfoMapper teacherInfoMapper) {
        this.teacherInfoMapper = teacherInfoMapper;
    }

}
