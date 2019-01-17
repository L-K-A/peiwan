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
 * 
 * </p>
 *
 * @author 
 * @since 2019-01-16
<<<<<<< HEAD:src/main/java/com/peiwan/bean/TService.java
=======
 * @date 2019/1/10 16:32
>>>>>>> 5cadebb7e07cd613289802de774e68e93c34234a:src/main/java/com/peiwan/bean/TService.java
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
<<<<<<< HEAD:src/main/java/com/peiwan/bean/TService.java
=======
@TableName("t_service")
>>>>>>> 5cadebb7e07cd613289802de774e68e93c34234a:src/main/java/com/peiwan/bean/TService.java
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
<<<<<<< HEAD:src/main/java/com/peiwan/bean/TService.java
     * 元/小时
=======
     * /元/小时
>>>>>>> 5cadebb7e07cd613289802de774e68e93c34234a:src/main/java/com/peiwan/bean/TService.java
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
