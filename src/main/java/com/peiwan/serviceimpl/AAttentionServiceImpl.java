package com.peiwan.serviceimpl;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.peiwan.bean.GSort;
import com.peiwan.dao.AAttentionMapper;
import com.peiwan.service.AAttentionService;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@Service
public class AAttentionServiceImpl extends ServiceImpl<AAttentionMapper, GSort> implements AAttentionService {

    @Resource
    private AAttentionMapper aAttentionMapper;

    /**
    * @description: 分页查询板块数据
    * @author: 张帅东
    */
    @Override
    public IPage<GSort> queryGamePage(@Param("pg") Page<GSort> page, GSort gSort) {
        QueryWrapper<GSort> wrapper = new QueryWrapper<>();
        /**板块名*/
        wrapper.like("g_name",gSort.getGName());
        wrapper.orderByDesc("gid");
        IPage<GSort> gSortPage = aAttentionMapper.selectPage(page,wrapper);
        return gSortPage;
    }

    /**
    * @description: 根据板块名删除板块信息
    * @author: 张帅东
    */
    @Override
    public int deleteGsort(GSort gSort) {
        QueryWrapper<GSort> wrapper = new QueryWrapper<>();
        wrapper.eq("g_name",gSort.getGName());
        return aAttentionMapper.delete(wrapper);
    }

    /**
    * @description: 查询板块id最大值+1
    * @author: 张帅东
    */
    @Override
    public int selectGameId() {
        return aAttentionMapper.selectGameId();
    }

    /**
    * @description: 校验板块名是否存在
    * @author: 张帅东
    */
    @Override
    public Boolean selectGameName(GSort gSort) {
        QueryWrapper<GSort> wrapper = new QueryWrapper<>();
        wrapper.eq("g_name",gSort.getGName());
        GSort gSort1 = aAttentionMapper.selectOne(wrapper);
        boolean result=false;
        if (gSort1!=null){
            result=true;
        }
        return result;
    }

    /**
    * @description: 增加新板块
    * @author: 张帅东
    */
    @Override
    public void addGame(GSort gSort) {
        aAttentionMapper.insert(gSort);
        /**System.out.println("添加："+insert);*/
    }

    public AAttentionMapper getaAttentionMapper() {
        return aAttentionMapper;
    }

    public void setaAttentionMapper(AAttentionMapper aAttentionMapper) {
        this.aAttentionMapper = aAttentionMapper;
    }
}
