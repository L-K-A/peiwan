package com.peiwan.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.TPerson;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.data.repository.CrudRepository;

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
public interface ZjmLoginMapper extends BaseMapper<TPerson> , CrudRepository<TPerson,Long> {

//    测试根据用户名进行查询全部信息

    @Select("select * from t_person where person_nickname=#{personNickname} and person_pwd=#{personPwd}")
    TPerson nameTPerson(TPerson TPerson);

//    测试是否能链接数据库  查询用户表的所有字段
    @Select("select * from t_person")
    List<TPerson> addTPerson(int id);

//    根据用户名查询id 密码
    @Select("select * from t_person where person_nickname=#{personNickname}")
    TPerson myTPersonname(String personNickname);

//    根据用户名查询是否存在
    @Select("select count(*) from t_person where person_nickname=#{personNickname}")
    Integer iTPersonname(String personNickname);


//   根据密码查看是否存在
    @Select("select count(*) from t_person where person_nickname=#{personNickname} and person_pwd=#{personPwd}")
    Integer iTPersonpwd(String personNickname,String personPwd);

//  给用户表里插入一条数据
    @Insert("INSERT INTO t_person(person_nickname,person_pwd,person_pwdencry,person_tel,person_createtime) VALUES(#{personNickname},#{personPwd},#{personPwdencry},#{personTel},#{personCreatetime})")
    Integer registerData(TPerson TPerson);


}
