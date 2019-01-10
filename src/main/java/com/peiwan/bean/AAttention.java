package com.peiwan.bean;

import java.io.Serializable;

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
@TableName("a_attention")
public class AAttention implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户id
     */

    private Integer pid;

    /**
     * 关注列表id
     */
    @TableId(value = "pid")
    private Integer aid;

    /**
     *
     */
    private Integer zid;
    /**
     * 主播标识
     */
    private Integer zZhubo;


}
