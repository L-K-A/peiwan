package com.peiwan.bean;

import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 消费表
 * </p>
 *
 * @author 
 * @since 2019-01-16
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class TConsume implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户id
     */
    private Integer pid;

    /**
     * 订单id
     */
    private Integer oid;

    /**
     * 消费id
     */
    private Integer xid;

    /**
     * 消费金额
     */
    private Double xMoney;

    /**
     * 消费时间
     */
    private String xConsumetime;


}
