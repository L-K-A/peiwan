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
public class TCommodityZ implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主播id
     */
    private Integer pid;

    /**
     * 收到礼物钱
     */
    private Double cMonrey;

    /**
     * 收到时间
     */
    private String cGettime;

    /**
     * 对应标识
     */
    private Integer cFlate;


}
