package com.peiwan.serviceimpl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.peiwan.bean.PComment;
import com.peiwan.bean.PPerson;
import com.peiwan.dao.TeacherInfoMapper;
import com.peiwan.service.TeacherInfoService;
import org.apache.ibatis.jdbc.Null;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;

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

    /*fenye*/
    @Override
    public IPage<PComment> selectPageExt(PComment pComment , int page, int pageSize) throws RuntimeException {
        try {
            Page<PComment> p = new Page<>(page, pageSize);
            p.setRecords(teacherInfoMapper.selectPageExt(p,pComment));
            return p;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }



    public TeacherInfoMapper getTeacherInfoMapper() {
        return teacherInfoMapper;
    }
    public void setTeacherInfoMapper(TeacherInfoMapper teacherInfoMapper) {
        this.teacherInfoMapper = teacherInfoMapper;
    }

}
