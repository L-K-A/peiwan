package com.peiwan.controller;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.Utils.baseCoverString;
import com.peiwan.bean.AAttention;
import com.peiwan.bean.GService;
import com.peiwan.bean.PAlity;
import com.peiwan.bean.PPerson;
import com.peiwan.dao.AAttentionMapper;
import com.peiwan.service.AAttentionService;
import io.micrometer.core.ipc.http.HttpSender;
import jdk.management.resource.internal.inst.SocketOutputStreamRMHooks;
import jdk.nashorn.internal.ir.RuntimeNode;
import org.omg.CORBA.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.trace.http.HttpTrace;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

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
    @Resource
    private HttpServletRequest request;
    /**
     * 测试
     *
     * @return
     * @auther lxq
     */
    @RequestMapping("/userinfo")
    public String getlist() {
        //List list = aAttentionMapper.getAAttentionList();
        /*List list = aAttentionService.queryAAttentionList();
        System.out.println(list);*/
        return "";
    }

    /**
     * 我的关注
     *
     * @return
     * @auther lxq
     */
    @RequestMapping("/atten")
    public  String getAttention(){
        return "attention";
    }

    @RequestMapping("/attentio")
    @ResponseBody
    public Map userAttention(int current, int size,int pid) {
//        Page page=new Page(pageCurrent,pageSize);
        Page<Map<String,Object>> mapPage = new Page(current,size);
        Page<Map<String, Object>> mappage = mapPage.setRecords(aAttentionMapper.getSelectAttention(mapPage, pid));
        int a=aAttentionMapper.getSelectAttentionCount();
        Map map=new HashMap();
        map.put("result",mappage);
        map.put("count",a);
        return map;
    }
    /**
     * 取消关注
     * @author lxq
      */
    @RequestMapping("/cencelAttention")
    @ResponseBody
    public  Map userAttentionCancer(String zid){
        //字符串拆分并循环删除操作
        String[] ua=zid.split(",");
        int a=0;
        for(int i=0;i<ua.length;i++){
          a += aAttentionMapper.getUpdateAttention(ua[i]);
        }
        Map map=new HashMap();
        map.put("result",a);
        return map;
    }
    /**
     * 订单记录查询
     * @author lxq
     */
    @RequestMapping("/userorder")
    @ResponseBody
    public Map userOrder(){
       List list= aAttentionMapper.getSelectOrder();
        Map map=new HashMap();
        map.put("result",list);
        return map;
    }

    /**
     * 消费记录
     * @auther lxq
     * @return
     */
    @RequestMapping("/trecord")
    public String userTrecord() {
        return "trecord";
    }


    /**
     * 申请表单
     *
     * @param tag
     * @param organ
     * @param himage
     * @param pPerson
     * @param pAlity
     * @param gService
     * @return
     * @throws Exception
     * @AUther lxq
     */
    @PostMapping("/playinfosubmit")
    @ResponseBody
    public Map sek(String gname,String tag, String organ, MultipartFile himage, PPerson pPerson, PAlity pAlity, GService gService) throws Exception {
        //System.out.println(himage.getOriginalFilename());
        int pid = 4;
        /*String filePath = "F:\\upload\\" + himage.getOriginalFilename();*/
        String filePath = "C:\\Users\\Administrator\\Desktop\\peiwan\\src\\main\\resources\\static\\imgupload\\" + new Random().nextInt(100)+ himage.getOriginalFilename();
        //String filePath = request.getSession().getServletContext().getRealPath("imgupload") +File.separator +himage.getOriginalFilename();

        BufferedOutputStream outputStream = new BufferedOutputStream(new FileOutputStream(filePath));
        outputStream.write(himage.getBytes());
        outputStream.flush();
        outputStream.close();
        pPerson.setPid(pid);
        pPerson.setPersonCoverphoto(filePath);
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
        //gService.setGName(gname);
        //System.out.println(pPerson);
        /*base64转码*/
        //System.out.println("转码:"+new baseCoverString().baseCoverStr(pPerson.getPersonCoverphoto()));
        /*插入操作*/
        //aAttentionMapper.getPPersonInsert(pPerson);
        //aAttentionMapper.getInsertAlity(pAlity);
        //aAttentionMapper.getInsertGservice(gService);
        Map map = new HashMap();
        map.put("succ", 1);
        return map;
    }

    /**
     * 用户名检查
     *
     * @auther lxq
     */
    @RequestMapping("/checkoutPersonNick")
    @ResponseBody
    public Map checkNickname(String personNickname) {
        List list = aAttentionMapper.getCheckoutPersonNickname(personNickname);
        if (list.size() > 0) {
            Map map = new HashMap();
            map.put("result", 1);
            return map;
        } else {
            Map map = new HashMap();
            map.put("result", 2);
            return map;
        }
    }

    /**
     * 用户中心
     *
     * @return
     * @auther lxq
     */
    @RequestMapping("/indexw")
    public String fir() {
        return "ocenter";
    }

    /**
     * 安全
     *
     * @return
     */
    @RequestMapping("/secur")
    public String security() {
        return "secur";
    }

    /**
     * 资料
     *
     * @return
     * @auther lxq
     */
    @RequestMapping("/data")
    public String logi() {
        return "data";
    }

    /**
     * 主播申请
     *
     * @return
     * @auther lxq
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
