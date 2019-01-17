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
 * @author bjlz
 * @since 2019-01-02
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "m_money")
public class MMomey implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户id
     */
    private Integer pid;

    /**
     * 账户id
     */
    @TableId(value = "mid",type = IdType.AUTO)
    private Integer mid;

    /**
     * 订单id
     */
    private Integer oid;

    /**
     * 余额
     */
    private Double mBalance;

    /**
     * 充值时间
     */
    private String mChangetime;

    /**
     * 充值金额
    * @Author : YJH
    * @Date : 2019/1/11  11:45
    * @Parm :
    * @Return :
    */

    private Integer mCharge;


}
