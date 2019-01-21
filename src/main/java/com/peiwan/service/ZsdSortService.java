package com.peiwan.service;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.peiwan.bean.TSort;
import org.apache.ibatis.annotations.Param;

import java.util.List;


/**
 * <p>
 *  服务类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
public interface ZsdSortService extends IService<TSort> {

    /**
    * @description: 分页查询板块数据
    * @author: 张帅东
    */
    IPage<TSort> queryGamePage(@Param("pg") Page<TSort> page, TSort tSort);

    /**
     * @description: 根据板块id删除板块信息
     * @author: 张帅东
     */
    int deleteGameById(Integer id);

    /**
    * @description: 查询板块id最大值+1
    * @author: 张帅东
    */
    int selectGameId();

    /**
    * @description: 校验板块名是否存在
    * @author: 张帅东
    */
    Boolean selectGameName(TSort tSort);

    /**
     * @description: 增加新板块
     * @author: 张帅东
     */
    void addGame(TSort tSort);
    /**
    * @description: 根据板块id批量删除
    * @author: 张帅东
    */
    int deleteGames(List idList);
}
