package com.peiwan.serviceimpl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.sql.SqlHelper;
import com.peiwan.bean.PPerson;
import com.peiwan.dao.IPersonMapper;
import com.peiwan.service.IPersonService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@Service
public class IPersonServiceImpl extends ServiceImpl<IPersonMapper, PPerson> implements IPersonService {

    @Resource
    private IPersonMapper personMapper;

    /**
     * 用户列表分页
    * @Author : YJH
    * @Date : 2019/1/10  15:19
    * @Parm :
    * @Return :
    */

    @Override
    public IPage<PPerson> page(@Param("pg") IPage<PPerson> page, PPerson pPerson){
        QueryWrapper<PPerson> wrapper = new QueryWrapper<>();
        wrapper.like("person_name",pPerson.getPersonName());
        IPage<PPerson> iPage = personMapper.selectPage(page, wrapper);
        return iPage;
    }


    /**查询总列表数
    * @Author : YJH
    * @Date : 2019/1/11  9:37
    * @Parm :
    * @Return :
    */
    @Override
    public int count(Wrapper<PPerson> queryWrapper){
        QueryWrapper<PPerson> wrapper=new QueryWrapper<>();
        Integer integer = personMapper.selectCount(queryWrapper);
        return integer;
    }

    /**
     * 根据id删除
    * @Author : YJH
    * @Date : 2019/1/14  10:05
    * @Parm :
    * @Return :
    */
    @Override
    public boolean removeById(Serializable id){
        boolean b = SqlHelper.delBool(personMapper.deleteById(id));
        return b;
    }


    /**
     * 根据id批量删除
    * @Author : YJH
    * @Date : 2019/1/14  10:06
    * @Parm :
    * @Return :
    */

    @Override
    public boolean removeByIds(Collection<? extends Serializable> idList) {
        return SqlHelper.delBool(personMapper.deleteBatchIds(idList));
    }
}
