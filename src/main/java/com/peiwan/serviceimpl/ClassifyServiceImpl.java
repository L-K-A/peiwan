package com.peiwan.serviceimpl;

import com.peiwan.bean.GSortDuanwei;
import com.peiwan.dao.ClassifyMapper;
import com.peiwan.service.ClassifyService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Author: QSC
 * @Despriction:
 * @Date:Created in 15:25 2019/1/4
 * @Modify by:
 */
@Service
public class ClassifyServiceImpl implements ClassifyService {

    @Resource
    private ClassifyMapper cm;

    @Override
    public List<GSortDuanwei> getList() {
        List<GSortDuanwei> list = cm.selectList(null);

        return list;
    }
}
