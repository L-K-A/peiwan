package com.peiwan.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.PComment;
import com.peiwan.bean.PPerson;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @Author: zhangwanli
 * @Despriction:
 * @Date:Created in 12:07 2019/1/4
 * @Modify by:
 */
@Mapper
public interface TeacherInfoMapper extends BaseMapper<PPerson> {

@Select("select * from p_comment")
  List<PComment> selectPageExt(Page<PComment> page, @Param("pComment") PComment pComment);
}
