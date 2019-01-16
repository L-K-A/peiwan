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
public class YSort implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 娱乐板块id
     */
    private Integer yid;

    /**
     * 娱乐版块名称
     */
    private String yName;


}
