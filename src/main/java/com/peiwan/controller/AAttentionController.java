package com.peiwan.controller;


import com.peiwan.Utils.baseCoverString;
import com.peiwan.bean.GService;
import com.peiwan.bean.PAlity;
import com.peiwan.bean.PPerson;
import com.peiwan.dao.AAttentionMapper;
import com.peiwan.service.AAttentionService;
import jdk.management.resource.internal.inst.SocketOutputStreamRMHooks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    private PAlity pAlity;

    private GService gService;
    /**
     * 测试
     * @return
     */
    @RequestMapping("/userinfo")
    public String getlist() {
        //List list = aAttentionMapper.getAAttentionList();
        List list = aAttentionService.queryAAttentionList();
        System.out.println(list);
        return "test";
    }



    /**
     * 申请表单
     * @AUther lxq
     * @param tag
     * @param organ
     * @param himage
     * @param pPerson
     * @param pAlity
     * @param gService
     * @return
     * @throws Exception
     */
    @PostMapping("/playinfosubmit")
    @ResponseBody
    public Map sek(String tag, String organ,MultipartFile himage, PPerson pPerson, PAlity pAlity, GService gService) throws Exception {
        //System.out.println(himage.getOriginalFilename());
        int pid =4;

        String filePath ="F:\\upload\\"+himage.getOriginalFilename();
        BufferedOutputStream outputStream=new BufferedOutputStream(new FileOutputStream(filePath));
        outputStream.write(himage.getBytes());
        outputStream.flush();
        outputStream.close();
        pPerson.setPersonCoverphoto(filePath);
        pPerson.setPid(pid);
        /*才艺标签*/
        //System.out.println("标签:"+tag);
        /*才艺表赋值*/
        //pAlity.setPid(pid);
        //pAlity.setAlityOne(tag.substring(0,1));
        //pAlity.setAlityTwo(tag.substring(2,3));
        /*魅力部位*/
        //pAlity.setCharmOne(organ.substring(0,1));
        //pAlity.setCharmTwo(organ.substring(2,3));
        //pAlity.setCharmThree(organ.substring(4,5));
        //System.out.println(pAlity);
        /*游戏版块*/
        //System.out.println("游戏"+gService);
        //gService.setPid(pid);
        //gService.setGName("lol");
        //System.out.println(pPerson);
        /*base64转码*/
        //System.out.println("转码:"+new baseCoverString().baseCoverStr(pPerson.getPersonCoverphoto()));
        /*插入操作*/
        //aAttentionMapper.getPPersonInsert(pPerson);
        //aAttentionMapper.getInsertAlity(pAlity);
        //aAttentionMapper.getInsertGservice(gService);
        Map map=new HashMap();
        map.put("succ",1);
        return  map;
    }
    /**
     * 用户名检查
     */
    @RequestMapping("/checkoutPersonNick")
    @ResponseBody
    public Map checkNickname(String personNickname){
        List list= aAttentionMapper.getCheckoutPersonNickname(personNickname);
        if(list.size()>0){
            Map map=new HashMap();
            map.put("result",1);
            return  map;
        }else {
            Map map=new HashMap();
            map.put("result",2);
            return map;
        }
    }
    /**
     * 用户中心
     * @return
     */
    @RequestMapping("/indexw")
    public String fir() {
        return "ocenter";
    }
    /**
     * 安全
     * @return
     */
    @RequestMapping("/secur")
    public String security() {
        return "secur";
    }
    /**
     * 资料
     * @return
     */
    @RequestMapping("/data")
    public String logi() {
        return "data";
    }
    /**
     * 主播申请
     * @return
     */
    @RequestMapping("/playinfo")
    public String plays() {
        return "playinfo";
    }


    /*get set*/

    public PPerson getpPerson() {
        return pPerson;
    }

    public void setpPerson(PPerson pPerson) {
        this.pPerson = pPerson;
    }

    public PAlity getpAlity() {
        return pAlity;
    }

    public void setpAlity(PAlity pAlity) {
        this.pAlity = pAlity;
    }

    public GService getgService() {
        return gService;
    }

    public void setgService(GService gService) {
        this.gService = gService;
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
