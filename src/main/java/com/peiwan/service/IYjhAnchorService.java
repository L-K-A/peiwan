package com.peiwan.service;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.peiwan.bean.TPerson;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
public interface IYjhAnchorService extends IService<TPerson> {
    /**
     * 查询列表并分页
    * @Author : YJH
    * @Date : 2019/1/11  9:34
    * @Parm :
    * @Return :
    */
    IPage<TPerson> page(@Param("pg") IPage<TPerson> page, TPerson person);


}
