package com.peiwan.dao;

import com.peiwan.bean.AAttention;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.PPerson;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@Mapper
public interface AAttentionMapper extends BaseMapper<AAttention> {
    /*@Select(" select  * from a_attention")*/
    List<AAttention> getAAttentionList();

    @Insert("insert into p_person(person_nickname,person_sex,person_birthday,person_qq,person_adress,person_content,person_height,person_weight,person_career,person_school) values(#{personNickname},#{personSex},#{personBirthday},#{personQq},#{personAdress},#{personContent},#{personHeight},#{personWeight},#{personCareer},#{personSchool}) ")
    int getPPersonInsert(PPerson pPerson);
}
