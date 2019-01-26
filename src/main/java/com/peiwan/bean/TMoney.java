package com.peiwan.bean;

import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 用户钱包表
 * </p>
 *
 * @author 
 * @since 2019-01-16
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class TMoney implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户id
     */
    private Integer pid;

    /**
     * 用户账户id
     */
    /*private Integer mid;*/

    /**
     * 用户充值订单id
     */
    /*private Integer oid;*/

    /**
     * 钱包余额
     */
    private Double mBalance;

    /**
     * 充值时间
     */
    private String mChangetime;

    /**
     * 充值金额
     */
    private Double mCharge;


}
