package com.peiwan.serviceimpl;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.peiwan.bean.TComment;
import com.peiwan.dao.ZsdCommentMapper;
import com.peiwan.service.ZsdCommentService;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@Service
public class ZsdCommentServiceImpl extends ServiceImpl<ZsdCommentMapper, TComment> implements ZsdCommentService {
    @Resource
    private ZsdCommentMapper zsdCommentMapper;

    /**
    * @description: 分页查询评论数据
    * @author: 张帅东
    */
    @Override
    public IPage<TComment> queryCommentPage(Page<TComment> page, TComment tComment, String minTime, String maxTime) {
        /**默认最小时间（时间都转换成了int）*/
        int min=0;
        /**最大默认值（也就是可以到3019-01-11年注册的人都能查出来）*/
        int max=30190111;
        /**如果前台传过来的有值的话就用前台传的值*/
        if (minTime!=null&&minTime!=""){
            min=Integer.parseInt(minTime);
        }
        if (maxTime!=null&&maxTime!=""){
            max=Integer.parseInt(maxTime);
        }
        QueryWrapper<TComment> wrapper = new QueryWrapper<>();
        List<TComment> tComments = zsdCommentMapper.selectComment();
        /**System.out.println("查询的时间不为空的数据: "+tComments);*/
        List list = new ArrayList();
        for (TComment tComment1:tComments){
            /**System.out.println("时间: "+tComment1.getCCreatetime());*/
            int time = Integer.parseInt(tComment1.getCCreatetime());
            if (min<=time&&time<max){
                /**查询符合某一时间段的评论*/
                String cCreatetime = tComment1.getCCreatetime();
                list.add(cCreatetime);
            }
        }
        if(list.size()==0){
            wrapper.eq("c_createtime","0");
        }
        wrapper.in("c_createtime",list);
        /**评分*/
        wrapper.like("c_rank",tComment.getCRank());
        wrapper.orderByDesc("cid");
        IPage<TComment> tCommentPage = zsdCommentMapper.selectPage(page,wrapper);
        return tCommentPage;
    }

    /**
    * @description: 根据评分删除评论信息
    * @author: 张帅东
    */
    @Override
    public int deleteComment(TComment tComment) {
        QueryWrapper<TComment> wrapper = new QueryWrapper<>();
        wrapper.eq("c_rank",tComment.getCRank());
        return zsdCommentMapper.delete(wrapper);
    }

    public ZsdCommentMapper getZsdCommentMapper() {
        return zsdCommentMapper;
    }

    public void setZsdCommentMapper(ZsdCommentMapper zsdCommentMapper) {
        this.zsdCommentMapper = zsdCommentMapper;
    }
}
