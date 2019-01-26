package com.peiwan.serviceimpl;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.peiwan.bean.TPerson;
import com.peiwan.dao.IYjhAnchorMapper;
import com.peiwan.service.IYjhAnchorService;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@Service
public class IYjhAnchorServiceImpl extends ServiceImpl<IYjhAnchorMapper, TPerson> implements IYjhAnchorService {

    @Resource
    private IYjhAnchorMapper anchorMapper;

    /**
     * 用户列表分页
    * @Author : YJH
    * @Date : 2019/1/10  15:19
    * @Parm :
    * @Return :
    */
    @Override
    public IPage<TPerson> page(@Param("pg") IPage<TPerson> page, TPerson person){
        QueryWrapper<TPerson> wrapper = new QueryWrapper<>();
        wrapper.like("person_name",person.getPersonName());
        wrapper.eq("person_flate",1);
        /*wrapper.ne("person_logintime","无数据");*/
        IPage<TPerson> iPage = anchorMapper.selectPage(page, wrapper);
        return iPage;
    }

    public IYjhAnchorMapper getAnchorMapper() {
        return anchorMapper;
    }

    public void setAnchorMapper(IYjhAnchorMapper anchorMapper) {
        this.anchorMapper = anchorMapper;
    }
}
