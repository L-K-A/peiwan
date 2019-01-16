package com.peiwan.serviceimpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.PComment;
import com.peiwan.dao.PCommentMapper;
import com.peiwan.service.PCommentService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
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
public class PCommentServiceImpl extends ServiceImpl<PCommentMapper, PComment> implements PCommentService {
    @Resource
    private PCommentMapper pCommentMapper;

    /**
    * @description: 分页查询评论数据
    * @author: 张帅东
    */
    @Override
    public IPage<PComment> queryCommentPage(Page<PComment> page, PComment pComment,String minTime, String maxTime) {
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
        QueryWrapper<PComment> wrapper = new QueryWrapper<>();
        List<PComment> pComments = pCommentMapper.selectComment();
        /**System.out.println("查询的时间不为空的数据: "+pComments);*/
        List list = new ArrayList();
        for (PComment pComment1:pComments){
            /**System.out.println("时间: "+pComment1.getCCreatetime());*/
            int time = Integer.parseInt(pComment1.getCCreatetime());
            if (min<=time&&time<max){
                /**查询符合某一时间段的评论*/
                String cCreatetime = pComment1.getCCreatetime();
                list.add(cCreatetime);
            }
        }
        wrapper.in("c_createtime",list);
        /**评分*/
        wrapper.like("c_rank",pComment.getCRank());
        wrapper.orderByDesc("cid");
        IPage<PComment> pCommentPage = pCommentMapper.selectPage(page,wrapper);
        return pCommentPage;
    }

    /**
    * @description: 根据评分删除评论信息
    * @author: 张帅东
    */
    @Override
    public int deleteComment(PComment pComment) {
        QueryWrapper<PComment> wrapper = new QueryWrapper<>();
        wrapper.eq("c_rank",pComment.getCRank());
        return pCommentMapper.delete(wrapper);
    }

    public PCommentMapper getpCommentMapper() {
        return pCommentMapper;
    }

    public void setpCommentMapper(PCommentMapper pCommentMapper) {
        this.pCommentMapper = pCommentMapper;
    }
}
