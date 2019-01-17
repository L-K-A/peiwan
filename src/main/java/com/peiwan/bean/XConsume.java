package com.peiwan.bean;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
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
@TableName(value = "x_consume")
public class XConsume implements Serializable {

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
    @TableId(value = "xid",type = IdType.AUTO)
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
