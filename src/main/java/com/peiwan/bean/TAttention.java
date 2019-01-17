package com.peiwan.bean;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
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
public class TAttention implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 关注列表id
     */
    @TableId(value = "aid", type = IdType.AUTO)
    private Integer aid;

    /**
     * 用户id
     */
    private Integer pid;

    /**
     * 主播id
     */
    private Integer zid;

    /**
     * 主播标识
     */
    private Integer zZhubo;


}
