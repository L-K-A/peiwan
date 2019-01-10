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

    /**
     * 关注主播查询
     * @auther lxq
     * @return
     */
    @Select("select p.person_nickname,p.person_coverphoto,a.zid from p_person p,(select zid,z_zhubo from a_attention where pid=1) as a where a.zid=p.pid and a.z_zhubo=p.z_zhubo")
    List<Map<String,Object>> getSelectAttention();

    /**
     * 关注主播数量
     * @author lxq
     *
     */
    @Select("select count(*) from a_attention where pid=1 and z_zhubo=1")
    int getSelectAttentionCount();

    /**
     * 用户订单查询
     * @author lxq
     */
    @Select("SELECT p.pid,p.person_nickname,p.person_coverphoto,p.person_qq,o.* FROM p_person p,(SELECT * FROM o_order WHERE pid=5) o WHERE o.aid=p.pid GROUP BY p.pid")
    List<Map<String,Object>> getSelectOrder();
}

