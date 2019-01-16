package com.peiwan.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.peiwan.bean.PComment;
import com.peiwan.bean.PPerson;

import java.text.ParseException;
import java.util.List;
import java.util.Map;


/**
 * @Author: zhangwanli
 * @Despriction:
 * @Date:Created in 12:07 2019/1/4
 * @Modify by:
 */
public interface TeacherInfoService {
    /*查询全部导师信息*/
    PPerson getInfo(int pid) throws ParseException;

    /*分页 */
    IPage<Map<String, Object>> selectPageExt(PComment pComment, int page, int pageSize ,Integer zid,Integer gid);

    /*增加关注*/
    Integer insertAttention(Integer pid, Integer zid);

    /*查询导师当前评分*/
    Integer selectAvg(Integer zid );

    /*获取主播的多个服务类型*/
    List<Map<String,Object>> selectZhuboService(Integer zid);

    /*依据 zid  gid   获取主播的  服务 的 段位 价格*/
    Map<String,Object> selectZhudp(Integer zid ,Integer pageNum);

}
