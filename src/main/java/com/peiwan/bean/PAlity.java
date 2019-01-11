package com.peiwan.bean;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
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
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("p_ality")
public class PAlity implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer pid;

    /**
     * 才艺1
     */
    private String alityOne;

    /**
     * 才艺2
     */
    private String alityTwo;

    /**
     * 魅力1
     */
    private String charmOne;

    /**
     * 魅力2
     */
    private String charmTwo;

    /**
     * 魅力3
     */
    private String charmThree;


}
