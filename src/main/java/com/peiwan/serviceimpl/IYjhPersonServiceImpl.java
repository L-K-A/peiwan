package com.peiwan.serviceimpl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.peiwan.bean.TPerson;
import com.peiwan.dao.IYjhPersonMapper;
import com.peiwan.service.IYjhPersonService;
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
public class IYjhPersonServiceImpl extends ServiceImpl<IYjhPersonMapper, TPerson> implements IYjhPersonService {

    @Resource
    private IYjhPersonMapper personMapper;

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
      /*  wrapper.like("person_name",person.getPersonName());*/
        wrapper.like("person_nickname",person.getPersonNickname());
        /*wrapper.ne("person_logintime","无数据");*/
        IPage<TPerson> iPage = personMapper.selectPage(page, wrapper);
        return iPage;
    }


    /**查询总列表数
    * @Author : YJH
    * @Date : 2019/1/11  9:37
    * @Parm :
    * @Return :
    */
    @Override
    public int count(Wrapper<TPerson> queryWrapper){
        QueryWrapper<TPerson> wrapper=new QueryWrapper<>();
        Integer integer = personMapper.selectCount(queryWrapper);
        return integer;
    }




    /**
     * 根据id假删除
    * @Author : YJH
    * @Date : 2019/1/14  10:05
    * @Parm :
    * @Return :
    */
/*    @Override
    public boolean updateById(TPerson entity) {

        return retBool(personMapper.updateById(entity));
    }*/


    /**
     * 根据id批量删除
    * @Author : YJH
    * @Date : 2019/1/14  10:06
    * @Parm :
    * @Return :
    */
/*    @Override
    public boolean removeByIds(Collection<? extends Serializable> idList) {
        return SqlHelper.delBool(personMapper.deleteBatchIds(idList));
    }*/
}
