package com.peiwan.dao;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.TPerson;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author Zhou先生
 * @since 2019-01-02
 */
@Mapper
public interface ZYFMapper extends BaseMapper<TPerson> {

    //查询主播列表
    @Select("select p.pid,p.person_nickname,p.person_image,s.g_name,s.g_price from t_person p,t_service s where p.pid=s.pid")
    List<Map<String,Object>> selectPersonPage(int curPage);

    //导航栏根据昵称和Id模糊查询
    List<Map<String,Object>> selectPersonByNameAndId(TPerson person);

    //热度榜查询主播订单数：先按照订单数排序，再查询主播详细信息
    List<Map<String,Object>> selectOrderList(int curPage);


}
