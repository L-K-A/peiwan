package com.peiwan.controller;


import com.peiwan.Utils.baseCoverString;
import com.peiwan.bean.PPerson;
import com.peiwan.dao.AAttentionMapper;
import com.peiwan.service.AAttentionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import javax.annotation.Resource;
import java.io.File;
import java.util.List;

/**
 * <p>
 *
 * </p>
 *
 * @author lxq
 * @since 2019-01-02
 */
@Controller
public class AAttentionController {

    @Resource
    private AAttentionMapper aAttentionMapper;

    @Resource
    private AAttentionService aAttentionService;

    private PPerson pPerson;

    /*测试*/
    @RequestMapping("/userinfo")
    public String getlist() {
        //List list = aAttentionMapper.getAAttentionList();
        List list = aAttentionService.queryAAttentionList();
        System.out.println(list);
        return "sele";
    }

    /*申请表单测试*/

    @PostMapping("/playinfosubmit")
    public String sek(MultipartFile himage, PPerson pPerson) {
        //System.out.println(pPerson);
        System.out.println(himage.getOriginalFilename());
        System.out.println(himage.getContentType());
        System.out.println(himage.getSize());
        //System.out.println("转码:"+new baseCoverString().baseCoverStr(pPerson.getPersonCoverphoto()));
        //int a=aAttentionMapper.getPPersonInsert(pPerson);
        //System.out.println(a);
        /*System.out.println("-----start------"+himage+"------end-------");
        System.out.println(himageFileName);
        System.out.println(himageContentType);*/
        return "sele";
    }

    /*用户中心*/
    @RequestMapping("/indexw")
    public String fir() {
        return "ocenter";
    }

    /*安全*/
    @RequestMapping("/secur")
    public String security() {
        return "secur";
    }

    /*资料*/
    @RequestMapping("/data")
    public String logi() {
        return "data";
    }

    /*主播申请*/
    @RequestMapping("/playinfo")
    public String plays() {
        return "playinfo";
    }

    public PPerson getpPerson() {
        return pPerson;
    }

    public void setpPerson(PPerson pPerson) {
        this.pPerson = pPerson;
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
