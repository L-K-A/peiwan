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
 * @author 
 * @since 2019-01-16
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class TAlity implements Serializable {

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
