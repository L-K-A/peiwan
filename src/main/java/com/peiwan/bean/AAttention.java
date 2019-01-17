package com.peiwan.bean;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;

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
@TableName(value = "a_attention")
public class AAttention implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户id
     * @Author : YJH
     * @Date : 2019/1/7  9:59
     * @Parm :
     * @Return :
     */

    @TableId(value = "pid",type = IdType.AUTO)
    private Integer pid;

    /**
     * 关注列表id
     * @Author : YJH
     * @Date : 2019/1/7  10:08
     * @Parm :
     * @Return :
     */

    private Integer aid;

    /**
     * 主播标识
     */
    private Integer zZhubo;

    /**
     * 主播id
    * @Author : YJH
    * @Date : 2019/1/11  11:34
    * @Parm :
    * @Return :
    */
    private Integer gid;
}
