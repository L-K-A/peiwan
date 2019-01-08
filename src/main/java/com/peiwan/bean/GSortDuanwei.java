package com.peiwan.bean;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * @Author: 秦世昌
 * @Despriction:
 * @Date:Created in 20:11 2019/1/4
 * @Modify by:
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class GSortDuanwei implements Serializable {

    private static final long serialVersionUID = 1L;


    /*
    * 游戏id
    * */
    private Integer gid;


    /*
    * 游戏id对应的段位
    * */
    private String gDw;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getGid() {
        return gid;
    }

    public void setGid(Integer gid) {
        this.gid = gid;
    }

    public String getgDw() {
        return gDw;
    }

    public void setgDw(String gDw) {
        this.gDw = gDw;
    }
}
