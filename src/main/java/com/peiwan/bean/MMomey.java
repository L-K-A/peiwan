package com.peiwan.bean;

import java.io.Serializable;
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
public class MMomey implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户id
     */
    private Integer pid;

    /**
     * 账户id
     */
    private Integer mid;

    /**
     * 订单id
     */
    private Integer oid;

    /**
     * 余额
     */
    private Double mBalance;

    /**
     * 充值时间
     */
    private String mChangetime;


}
