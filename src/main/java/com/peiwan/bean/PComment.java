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
 * @author bjlz
 * @since 2019-01-02
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class PComment implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户id
     */
    private Integer pid;

    /**
     * 订单id
     */
    private byte[] oid;

    /**
     * 板块id
     */
    private Integer gid;

    /**
     * 评论id
     */
    private Integer cid;

    /**
     * 评价内容
     */
    private String cContext;

    /**
     * 评论时间
     */
    private String cCreatetime;

    /**
     * 评分(好评，中评，差评)
     */
    private Integer cRank;

    /**
     * 主播id
    * @Author : YJH
    * @Date : 2019/1/11  11:38
    * @Parm :
    * @Return :
    */

    private Integer zid;

}
