package com.peiwan.service;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.peiwan.bean.GSort;
import org.apache.ibatis.annotations.Param;


/**
 * <p>
 *  服务类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
public interface AAttentionService extends IService<GSort> {

    /**
    * @description: 分页查询板块数据
    * @author: 张帅东
    */
    IPage<GSort> queryGamePage(@Param("pg") Page<GSort> page, GSort gSort);

    /**
    * @description: 根据板块名删除板块信息
    * @author: 张帅东
    */
    int deleteGsort(GSort gSort);

    /**
    * @description: 查询板块id最大值+1
    * @author: 张帅东
    */
    int selectGameId();

    /**
    * @description: 校验板块名是否存在
    * @author: 张帅东
    */
    Boolean selectGameName(GSort gSort);

    /**
     * @description: 增加新板块
     * @author: 张帅东
     */
    void addGame(GSort gSort);
}
