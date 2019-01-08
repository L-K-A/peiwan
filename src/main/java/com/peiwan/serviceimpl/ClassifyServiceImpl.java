package com.peiwan.serviceimpl;

import com.peiwan.bean.GService;
import com.peiwan.bean.GSortDuanwei;
import com.peiwan.dao.ClassifyMapper;
import com.peiwan.service.ClassifyService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

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

    @Override
    public List<Map<String, Object>> getPidGid(GService gid) {
        List<Map<String,Object>> mapList = cm.getPidGid(gid);
        return mapList;
    }

    public ClassifyMapper getCm() {
        return cm;
    }

    public void setCm(ClassifyMapper cm) {
        this.cm = cm;
    }
}
