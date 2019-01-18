package com.peiwan.bean;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * <p>
 *
 * </p>
 *
 * @author
 * @since 2019-01-16
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("t_order_z")
public class TOrderZ implements Serializable {


    private static final long serialVersionUID = 1L;

    /**
     * 主播id
     */
    private Integer pid;

    /**
     * 订单id
     */
    @TableId(value = "oid", type = IdType.AUTO)
    private String oid;

    /**
     * 用户姓名
     */
    private String personName;

    /**
     * 服务id
     */
    private Integer gid;

    /**
     * 服务类型=板块名
     */
    private String oService;

    /**
     * 约定时长
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

    /**
     * <<<<<<< HEAD:src/main/java/com/peiwan/bean/TOrderZ.java
     * 订单开始时间
     * =======
     * 订单对应标识
     * >>>>>>> de378c9f2bcaf53aed3c0a6707957b7fd921cdbf:src/main/java/com/peiwan/bean/OOrderZ.java
     */
    private String oStarttime;

    /**
     * <<<<<<< HEAD:src/main/java/com/peiwan/bean/TOrderZ.java
     * 订单开始日期
     * =======
     * 订单对应标识
     * >>>>>>> de378c9f2bcaf53aed3c0a6707957b7fd921cdbf:src/main/java/com/peiwan/bean/OOrderZ.java
     */
    private String oDatetime;


}
