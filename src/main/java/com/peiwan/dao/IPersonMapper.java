package com.peiwan.dao;

import com.peiwan.bean.AAttention;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.PPerson;
import com.sun.tools.javac.util.List;
import javafx.scene.control.Pagination;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.data.domain.Page;

import java.util.Map;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@Mapper
public interface IPersonMapper extends BaseMapper<PPerson> {

}
