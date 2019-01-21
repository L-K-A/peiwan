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
 * @author 
 * @since 2019-01-16
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "t_sort")
public class TSort implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 板块id
     */
    @TableId(value = "gid")
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


}
