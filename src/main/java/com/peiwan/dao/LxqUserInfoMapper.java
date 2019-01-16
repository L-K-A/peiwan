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
public interface LxqUserInfoMapper extends BaseMapper<TAttention> {
    /*@Select(" select  * from a_attention")*/
    /*List<TAttention> getAAttentionList();*/

    /**
     * 申请表字段 pperson插入
     * lxq
     * @param pPerson
     * @return
     */

    @Insert("insert into t_person(person_nickname,person_sex,person_birthday,person_qq,person_adress,person_content,person_height,person_weight,person_career,person_school) values(#{personNickname},#{personSex},#{personBirthday},#{personQq},#{personAdress},#{personContent},#{personHeight},#{personWeight},#{personCareer},#{personSchool}) ")
    int getPPersonInsert(TPerson pPerson);

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
    @Insert("insert into t_ality(pid,ality_one,ality_two,charm_one,charm_two,charm_three) values (#{pid},#{alityOne},#{alityTwo},#{charmOne},#{charmTwo},#{charmThree})")
    int getInsertAlity(TAlity pAlity);

    /**
     * 游戏表插入
     * @param gService
     * @return
     */
    @Insert("insert into t_service(pid,gid,g_name,g_daqu,g_duanwei,p_gid) values (#{pid},#{gid},#{gName},#{gDaqu},#{gDuanwei},#{pGid})")
    int getInsertGservice(TService gService);

    /**
     * 关注主播查询
     * @auther lxq
     * @return
     */
    @Select("select p.person_nickname,p.person_coverphoto,a.zid from t_person p,(select zid,z_zhubo from t_attention where pid=#{pid}) as a where a.zid=p.pid and a.z_zhubo=p.z_zhubo ")
    List<Map<String,Object>> getSelectAttention(Page mapPage,int pid);

    /**
     * 关注主播数量
     * @author lxq
     *
     */
    @Select("select count(*) from t_attention where pid=1 and z_zhubo=1")
    int getSelectAttentionCount();

    /**
     * 用户订单查询
     * @author lxq
     */
    @Select("SELECT p.pid,p.person_nickname,p.person_coverphoto,p.person_qq,o.* FROM t_person p,(SELECT * FROM t_order WHERE pid=1) o WHERE o.aid=p.pid GROUP BY o.oid")
    List<Map<String,Object>> getSelectOrder();

    /**
     * 取消关注
     * @author lxq
     */
    @Update("update t_attention set z_zhubo=0 where pid=1 and zid=#{zid}")
    int getUpdateAttention(String zid);

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
    @Select("select pid,person_name,person_nickname,person_image,person_qq from t_person where pid=#{pid}")
    List<Map<String,Object>> getUserInfo(int pid);

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
    @Update("update t_person set person_pwd=#{personPwd} where pid=#{pid}")
    int getUpdateUserPwd(String personPwd,int pid);
}

