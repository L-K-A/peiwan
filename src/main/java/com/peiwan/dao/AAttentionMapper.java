package com.peiwan.dao;

import com.peiwan.bean.AAttention;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.GService;
import com.peiwan.bean.PAlity;
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

    /**
     * 申请表字段 pperson插入
     * lxq
     * @param pPerson
     * @return
     */

    @Insert("insert into p_person(person_nickname,person_sex,person_birthday,person_qq,person_adress,person_content,person_height,person_weight,person_career,person_school) values(#{personNickname},#{personSex},#{personBirthday},#{personQq},#{personAdress},#{personContent},#{personHeight},#{personWeight},#{personCareer},#{personSchool}) ")
    int getPPersonInsert(PPerson pPerson);

    /**
     * 判断昵称是否存在
     * lxq
     * @param personNickname
     * @return
     */

    @Select("select * from p_person where person_nickname=#{personNickname}")
    List<PPerson> getCheckoutPersonNickname(String personNickname);

    /**
     * 才艺表插入
     * @param pAlity
     * @return
     */
    @Insert("insert into p_ality(pid,ality_one,ality_two,charm_one,charm_two,charm_three) values (#{pid},#{alityOne},#{alityTwo},#{charmOne},#{charmTwo},#{charmThree})")
    int getInsertAlity(PAlity pAlity);

    /**
     * 游戏表插入
     * @param gService
     * @return
     */
    @Insert("insert into g_service(pid,gid,g_name,g_daqu,g_duanwei,p_gid) values (#{pid},#{gid},#{gName},#{gDaqu},#{gDuanwei},#{pGid})")
    int getInsertGservice(GService gService);
}
