package com.peiwan.bean;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * <p>
 * 选择服务表
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
@TableName("t_service")
public class TService implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户id
     */
    private Integer pid;

    /**
     * 板块id
     */
    private Integer gid;

    /**
     * 板块名
     */
    private String gName;

    /**
     * 游戏大区
     */
    private String gDaqu;

    /**
     * 游戏段位
     */
    private String gDuanwei;

    /**
     * 玩家游戏id
     */
    private String pGid;

    /**
     * 元/小时
     */
    private Double gPrice;

    /**
     * 服务介绍
     */
    private String gServicedescription;

    /**
     * 服务类别
     */
    private Integer gFlate;


}
