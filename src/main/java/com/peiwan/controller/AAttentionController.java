package com.peiwan.controller;




import com.peiwan.bean.PPerson;
import com.peiwan.dao.AAttentionMapper;
import com.peiwan.service.AAttentionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;

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

    @Autowired
    private AAttentionMapper aAttentionMapper;

    @Resource
    private AAttentionService aAttentionService;

    @RequestMapping("/userinfo")
    public String getlist(){
        List list= aAttentionMapper.getAAttentionList();
        System.out.println(list);
        return "userinfo";
    }

    @RequestMapping("/sele")
    public  String sek(){
        System.out.println(aAttentionMapper.selectById(1));
        return "sele";
    }
    @RequestMapping("/indexw")
    public String fir() {
        return "ocenter";
    }

    @RequestMapping("/secur")
    public String security() {
        return "secur";
    }

    @RequestMapping("/data")
    public String logi() {
        return "data";
    }
    @RequestMapping("/playinfo")
    public String plays(){
        return "playinfo";
    }

    public AAttentionMapper getaAttentionMapper() {
        return aAttentionMapper;
    }

    public void setaAttentionMapper(AAttentionMapper aAttentionMapper) {
        this.aAttentionMapper = aAttentionMapper;
    }

    public AAttentionService getaAttentionService() {
        return aAttentionService;
    }

    public void setaAttentionService(AAttentionService aAttentionService) {
        this.aAttentionService = aAttentionService;
    }
}
