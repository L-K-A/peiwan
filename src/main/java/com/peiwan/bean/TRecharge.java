package com.peiwan.bean;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * <p>
 * 充值记录表
 * </p>
 *
 * @author 
 * @since 2019-01-16
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("t_recharge")
public class TRecharge implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户id
     */
    private Integer pid;

    /**
     * 用户充值记录id
     */
    private String rid;

    /**
     * 充值时间
     */
    private String rRechargetime;

    /**
     * 充值金额
     */
    private Double rRechargemoney;


}
