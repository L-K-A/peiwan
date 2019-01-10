package com.peiwan.bean;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;

import java.beans.PropertyVetoException;
import java.io.Serializable;
import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 *
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class PPerson implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @TableId(value = "pid", type = IdType.AUTO)
    private Integer pid;

    /**
     * 昵称
     */
    private String personNickname;

    /**
     * 用户名
     */
    private String personName;

    /**
     * 密码
     */
    private String personPwd;

    /**
     * 密码加密
     */
    private String personPwdencry;
    /**
     * 电话
     */
    private String personTel;

    /**
     * 性别
     */
    private String personSex;

    /**
     * 出生日期
     */
    private String personBirthday;

    /**
     * qq
     */
    private Integer personQq;

    /**
     * 微信
     */
    private String personWexin;

    /**
     * 头像
     */
    private String personImage;

    /**
     * 住址
     */
    private String personAdress;

    /**
     * 签名
     */
    private String personContent;

    /**
     * 身高
     */
    private String personHeight;

    /**
     * 体重
     */
    private String personWeight;

    /**
     * 职业
     */
    private String personCareer;

    /**
     * 学校
     */
    private String personSchool;

    /**
     * 兴趣
     */
    private String personInterest;

    /**
     * 封面
     */
    private String personCoverphoto;

    /**
     * 服务描述
     */
    private String personServicedescription;

    /**
     * 创建时间
     */
    private String personCreatetime;

    /**
     * 标识(0用户1主播2)
     */
    private Integer personFlate;

    /**
     * 状态标识
     */
    private Integer personStatus;

    /**
     * 登录时间
     */
    private String personLogintime;

    /**
     * 成为主播同时修改
     */
    private Integer zZhubo;

private List<AAttention> aAttentions;
}
