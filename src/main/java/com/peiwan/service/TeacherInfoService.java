package com.peiwan.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.peiwan.bean.PComment;
import com.peiwan.bean.PPerson;
import java.util.Map;


/**
 * @Author: zhangwanli
 * @Despriction:
 * @Date:Created in 12:07 2019/1/4
 * @Modify by:
 */
public interface TeacherInfoService {
    /*查询全部导师信息*/
    PPerson getInfo(int pid);

    /*分页 */
    IPage<Map<String, Object>> selectPageExt(PComment pComment, int page, int pageSize);

    /*增加关注*/
    Integer insertAttention(Integer pid,Integer zid);
    /*查询导师当前评分*/
    double selectAvg(Integer zid);
}
