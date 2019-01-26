package com.peiwan.dao;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.TAlity;
import com.peiwan.bean.TAttention;
import com.peiwan.bean.TPerson;
import com.peiwan.bean.TService;
import com.sun.org.apache.xml.internal.resolver.helpers.PublicId;
import org.apache.ibatis.annotations.*;

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
public interface LxqUserInfoMapper extends BaseMapper<TAttention>{
    /*@Select(" select  * from a_attention")*/
    List<TAttention> getAAttentionList();

    /**
     * 申请表字段 pperson插入
     * lxq
     * @param pPerson
     * @return
     */

    @Update("update t_person set " +
            "person_nickname=#{personNickname},person_sex=#{personSex}," +
            "person_birthday=#{personBirthday},person_qq=#{personQq}," +
            "person_adress=#{personAdress},person_content=#{personContent}," +
            "person_height=#{personHeight},person_weight=#{personWeight}," +
            "person_career=#{personCareer},person_school=#{personSchool}," +
            "person_servicedescription=#{personServicedescription}," +
            "person_interest=#{personInterest},person_coverphoto=#{personCoverphoto},person_status =1  where pid=#{pid}")
    int getUpdatePPerson(TPerson pPerson);

    /**
     * 判断昵称是否存在
     * lxq
     * @param personNickname
     * @return
     */

    @Select("select * from t_person where person_nickname=#{personNickname}")
    List<TPerson> getCheckoutPersonNickname(String personNickname);

    /**
     * 才艺表插入
     * @param pAlity
     * @return
     */
    /*@Update("update t_ality set pid=#{pid},ality_one=#{alityOne},ality_two=#{alityTwo}," +
            "charm_one=#{charmOne},charm_two=#{charmTwo},charm_three=#{charmThree} where pid=#{pid}")*/
    @Insert("insert into t_ality(pid,ality_one,ality_two,charm_one,charm_two,charm_three) values (#{pid},#{alityOne},#{alityTwo},#{charmOne},#{charmTwo},#{charmThree})")
    int getUpdateAlity(TAlity pAlity);

    /**
     * 游戏表插入
     * @param gService
     * @return
     */
    /*@Update("update t_service(pid=#{pid},gid=#{gid},g_name=#{gName},g_daqu=#{gDaqu},g_duanwei=#{gDuanwei},p_gid=#{pGid}) ")*/
    @Insert("insert into t_service(pid,gid,g_name,g_daqu,g_duanwei,g_price,g_servicedescription,p_gid) values (#{pid},#{gid},#{gName},#{gDaqu},#{gDuanwei},#{pGid}) ")
    int getUpdateGservice(TService gService);

    /**
     * 关注主播查询
     * @auther lxq
     * @return
     */
    @Select("select p.person_nickname,p.person_image,a.zid from t_person p,(select zid,z_zhubo from t_attention where pid=#{pid}) as a where a.zid=p.pid and a.z_zhubo=p.z_zhubo ")
    List<Map<String,Object>> getSelectAttention(Page mapPage,int pid);

    /**
     * 关注主播数量
     * @author lxq
     *
     */
    @Select("select count(*) from t_attention where pid=#{pid} and z_zhubo=1")
    int getSelectAttentionCount(int pid);

    /**
     * 用户订单查询
     * @author lxq
     */
    @Select("SELECT p.pid,p.person_nickname,p.person_image,p.person_qq,o.* FROM t_person p,(SELECT * FROM t_order WHERE pid=#{pid}) o WHERE o.aid=p.pid GROUP BY o.oid")
    List<Map<String,Object>> getSelectOrder(int pid);
    /**
     * 主播订单查询
     * @author lxq
     */
    @Select("SELECT p.pid,p.person_nickname,p.person_image,p.person_qq,o.* FROM t_person p,(SELECT * FROM t_order WHERE aid=#{pid}) o WHERE o.pid=p.pid GROUP BY o.oid")
    List<Map<String,Object>> getSelectzhuOrder(int pid);
    /**
     * 订单取消
     */
    @Update("update t_order set o_flate=2,o_reacallreason=#{reacallreason} where pid=#{pid} and oid=#{oid}")
    int getUpdateReacallUserOrder(int pid,int oid,String reacallreason);
    /**
     * 取消关注
     * @author lxq
     */
    @Update("update t_attention set z_zhubo=0 where pid=#{pid} and zid=#{zid}")
    int getUpdateAttention(String zid,int pid);

    /**
     * 修改头像
     * @author lxq
     */
    @Update("update t_person set person_image=#{pPerson.personImage} where pid=#{pid}")
    int getUpdateUserImage(TPerson pPerson, int pid);

    /**
     * 信息查询
     * @author lxq
     */
    @Select("select p.pid,p.person_name,p.person_nickname,p.person_image,p.person_qq,p.person_flate,m.m_balance from t_person p,(SELECT pid,m_balance FROM t_money WHERE pid=#{pid}) AS m WHERE m.pid=p.pid")
    List<Map<String,Object>> getUserInfo(int pid);
    /**
     * 主播详细信息
     * @author lxq
     */
    @Select("select * from t_person where pid=#{pid}")
    List<Map<String,Object>> getUserzl(int pid);

    /**
     * 用户信息修改
     * @author lxq
     */
    @Update("update t_person set person_nickname=#{personNickname},person_qq=#{personQq} where pid=#{pid}")
    int getUpdateUserInfo(TPerson pPerson);
    /**
     * 用户密码检查
     */
    @Select("select pid from t_person where pid=#{pid} and person_pwd=#{personPwd}")
    List<Map<String,Object>> getSelectUserPwd(String personPwd,int pid);
    /**
     * 用户密码修改
     * @author lxq
     */
    @Update("update t_person set person_pwd=#{personPwd},person_pwdencry=#{personPwd} where pid=#{pid}")
    int getUpdateUserPwd(String personPwd,int pid);
    /**
     *订单余额消费
     * @author lxq
     **/
    @Update("UPDATE t_money m, t_order o SET o.o_flate=1,m.m_balance=#{m_balance},o.o_reacallreason='null' WHERE m.pid=#{pid} AND o.oid=#{oid}")
    int getUpdateUserMoney(double m_balance,int pid,String oid);

    /**
     * 消费查询
     * @author lxq
     */
    @Select("select * from t_recharge where pid=#{pid}")
    List<Map<String,Object>> getSelectRecharge(int pid);
}

