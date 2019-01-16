package com.peiwan.bean;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import java.io.Serializable;
import java.util.List;

/**
 * @program: peiwan
 * @description:
 * @author: 张帅东
 * @create: 2019-01-07 18:47
 **/
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class Result implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 业务代码
     */
    private int code;
    /**
     * 业务消息
     */
    private String message;
    /**
     * 业务数据
     */
    private List<Object> data;
}
