package com.peiwan.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.peiwan.bean.PComment;
import com.peiwan.bean.PPerson;


/**
 * @Author: zhangwanli
 * @Despriction:
 * @Date:Created in 12:07 2019/1/4
 * @Modify by:
 */
public interface TeacherInfoService {
    /*查询全部导师信息*/
    PPerson getInfo(int pid);

    /*fenye */
    IPage<PComment> selectPageExt(PComment pComment, int page, int pageSize);

}
