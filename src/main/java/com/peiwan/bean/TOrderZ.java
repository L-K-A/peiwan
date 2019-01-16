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
 * @author 
 * @since 2019-01-16
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class TOrderZ implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主播id
     */
    private Integer pid;

    /**
     * 订单id
     */
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
     * 订单开始时间
     */
    private String oStarttime;

    /**
     * 订单开始日期
     */
    private String oDatetime;


}
