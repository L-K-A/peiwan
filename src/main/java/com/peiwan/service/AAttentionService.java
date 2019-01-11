package com.peiwan.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.peiwan.bean.PPerson;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Zhou先生
 * @since 2019-01-02
 */
public interface AAttentionService extends IService<PPerson> {

    //登录时根据用户名和密码查询是否存在
    PPerson selectPersonByNameAndPwd(PPerson person);

    //查询主播列表
    Page<Map<String,Object>> selectPersonList(int currentPage,int pageNum);


    //根据昵称和id查询
    List<PPerson> selectPersonByNameId(PPerson person);



}
