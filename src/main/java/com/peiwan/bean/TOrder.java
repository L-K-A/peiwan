package com.peiwan.bean;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
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
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("t_order")
public class TOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户id
     */
    private Integer pid;

    /**
     * 主播id
     */
    private Integer aid;

    /**
     * 订单id
     */
    private String oid;

    /**
     * 服务类型=板块名
     */
    private String gid;

    /**
     * 主播姓名(不用)
     */
    private String personName;

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
     * 订单开始时间(小时)
     */
    private String oStarttime;

    /**
     * 订单开始日期(年月日)
     */
    private String oDatetime;


}
