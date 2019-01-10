package com.peiwan.bean;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.TableId;
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
public class GService implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户id
     */
    private Integer pid;

    /**
     * 游戏板块id
     */
    @TableId("gid")
    private Integer gid;

    /**
     * 服务价格
     */
    private double gPrice;
    /**
     * 游戏名
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
     * 玩家游戏对应服务的介绍
     */
    private String gContent;

}
