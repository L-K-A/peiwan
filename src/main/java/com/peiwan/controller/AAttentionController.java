package com.peiwan.controller;




import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author bjlz
 * @since 2019-01-02
 */
@Controller
public class AAttentionController {


    @RequestMapping("/indexw")
    public String fir(){
        return "ocenter";
    }

    @RequestMapping("/secur")
    public  String security(){
        return  "secur";
    }
    @RequestMapping("/data")
    public  String logi(){
        return "data";

    @RequestMapping("/hello")
    public String hello(){
        return "zuboInfo";

    }
}
