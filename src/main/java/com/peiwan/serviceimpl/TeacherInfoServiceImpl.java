package com.peiwan.serviceimpl;

import com.peiwan.bean.PPerson;
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
    private TeacherInfoMapper teacherInfoMapper;
    /*获取导师全部信息*/
    @Override
    public PPerson getInfo(int pid) {
        PPerson pPerson = teacherInfoMapper.selectById(pid);
        String personBirthday = pPerson.getPersonBirthday();
        String s = calculateConstellation(personBirthday);
        pPerson.setPersonBirthday(s);
        return  pPerson;
    }


    
    public TeacherInfoMapper getTeacherInfoMapper() {
        return teacherInfoMapper;
    }
    public void setTeacherInfoMapper(TeacherInfoMapper teacherInfoMapper) {
        this.teacherInfoMapper = teacherInfoMapper;
    }
}
