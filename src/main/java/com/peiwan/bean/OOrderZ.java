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
@TableName(value = "o_order_z")
public class OOrderZ implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主播id
     */
    private Integer pid;

    /**
     * 订单id
     */
    @TableId(value = "oid",type = IdType.AUTO)
    private String oid;

    /**
     * 用户姓名
     */
    private String personName;

    /**
     * 板块id
     */
    private int gid;

    /**
     * 约定时间
     */
    private String oXiadanshijian;

    /**
     * 订单留言
     */
    private String oContent;

    /**
     * 订单金额
     */
    private Double oMoney;

    /**
     * 订单创建时间
     */
    private String oCreatetime;

    /**
     * 订单对应标识
     */
    private Integer oFlate;


}
