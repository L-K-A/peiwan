package com.peiwan.bean;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * @author Zhou先生
 * @date 2019/1/10 16:32
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("t_service")
public class GService implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户id
     */
    private Integer pid;

    /**
     * 游戏板块id
     */
    private Integer gid;

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
     * /元/小时
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
