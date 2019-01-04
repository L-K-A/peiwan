package com.peiwan.serviceimpl;

import com.peiwan.bean.PPerson;
import com.peiwan.dao.TeacherInfoMapper;
import com.peiwan.service.TeacherInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

/**
 * @Author: zhangwanli
 * @Despriction:
 * @Date:Created in 12:08 2019/1/4
 * @Modify by:
 */
@Service
public class TeacherInfoServiceImpl implements TeacherInfoService {

    @Resource
    private TeacherInfoMapper teacherInfoMapper;
    /*获取导师全部信息*/
    @Override
    public PPerson getInfo(int pid) {
        return teacherInfoMapper.selectById(pid);

    }


    
    public TeacherInfoMapper getTeacherInfoMapper() {
        return teacherInfoMapper;
    }
    public void setTeacherInfoMapper(TeacherInfoMapper teacherInfoMapper) {
        this.teacherInfoMapper = teacherInfoMapper;
    }
}
