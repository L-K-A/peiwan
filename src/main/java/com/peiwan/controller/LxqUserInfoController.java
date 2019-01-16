package com.peiwan.controller;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.TAlity;
import com.peiwan.bean.TPerson;
import com.peiwan.bean.TService;
import com.peiwan.dao.LxqUserInfoMapper;
import com.peiwan.service.LxqUserInfoService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
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
public class LxqUserInfoController {

    @Resource
    private LxqUserInfoMapper lxqUserInfoMapper;

    @Resource
    private LxqUserInfoService lxqUserInfoService;

    private TPerson pPerson;

    private TAlity pAlity;

    private TService gService;
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
        //List list = lxqUserInfoMapper.getAAttentionList();
        /*List list = lxqUserInfoService.queryAAttentionList();
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
        Page<Map<String, Object>> mappage = mapPage.setRecords(lxqUserInfoMapper.getSelectAttention(mapPage, pid));
        int a= lxqUserInfoMapper.getSelectAttentionCount();
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
          a += lxqUserInfoMapper.getUpdateAttention(ua[i]);
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
       List list= lxqUserInfoMapper.getSelectOrder();
        Map map=new HashMap();
        map.put("result",list);
        return map;
    }
    /**
     *当前用户信息查看
     * @author lxq
     */
    @ResponseBody
    @RequestMapping("/getuserinfo")
    public Map userInfo(int pid){
        List list= lxqUserInfoMapper.getUserInfo(pid);
        Map map=new HashMap();
        map.put("results",list);
        return map;
    }


    /**
     * 用户头像img修改
     * @author lxq
     * @return
     */
    @RequestMapping("/personimg")
    @ResponseBody
    public Map personImg(@RequestParam("userimage")String userimage,int pid,TPerson pPerson) {
        Map map=new HashMap();
        String filePath = "C:\\Users\\Administrator\\Desktop\\peiwan\\src\\main\\resources\\static\\imgupload\\" + new Random().nextInt(1000000)+ ".png";
        if (userimage != null) {
            BASE64Decoder decoder = new BASE64Decoder();
            byte[] b;
            try {
                    b = decoder.decodeBuffer(userimage.split(",")[1]);
                for (int i = 0; i < b.length; ++i) {
                    if (b[i] < 0) {// 调整异常数据
                        b[i] += 256;
                    }
                }
                // 生成jpeg图片
                OutputStream out = new FileOutputStream(filePath);
                out.write(b);
                out.flush();
                out.close();
                pPerson.setPid(pid);
                pPerson.setPersonImage(filePath.substring(74));
                int a= lxqUserInfoMapper.getUpdateUserImage(pPerson,pid);
                System.out.println(a);
                List list= lxqUserInfoMapper.getUserInfo(pid);
                map.put("resuls",list);

            }catch (Exception e) {
                e.printStackTrace();
            }
        }
        return map;
    }

    /**
     * 用户简单信息修改
     * @param pPerson
     * @return
     */
    @RequestMapping("/updateuserinfo")
    public String updateUserInfo(TPerson pPerson){
        System.out.println(pPerson);
        pPerson.setPid(4);
        lxqUserInfoMapper.getUpdateUserInfo(pPerson);
        return "redirect:ocenter";
    }
    /**
     * 用户密码检查
     * @author lxq
     */
    @RequestMapping("/checkoutPersonPwd")
    @ResponseBody
    public Map checkUserPwd(String personPwd,int  pid){
        Map map=new HashMap();
       List list= lxqUserInfoMapper.getSelectUserPwd(personPwd,pid);
       if(list.size()>0){
           map.put("result",1);
       }else {
           map.put("result",0);
       }
       return map;
    }
    @ResponseBody
    @RequestMapping("/updatepersonpwd")
    public Map updateUserPwd(String personPwd,int pid){
        Map map=new HashMap();
       int a= lxqUserInfoMapper.getUpdateUserPwd(personPwd,pid);
        map.put("result",a);
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
    public Map sek(String gname,String tag, String organ, MultipartFile himage, TPerson pPerson, TAlity pAlity, TService gService) throws Exception {
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
        /*插入操作*/
        //lxqUserInfoMapper.getPPersonInsert(pPerson);
        //lxqUserInfoMapper.getInsertAlity(pAlity);
        //lxqUserInfoMapper.getInsertGservice(gService);
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
        List list = lxqUserInfoMapper.getCheckoutPersonNickname(personNickname);
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

    public LxqUserInfoMapper getLxqUserInfoMapper() {
        return lxqUserInfoMapper;
    }

    public void setLxqUserInfoMapper(LxqUserInfoMapper lxqUserInfoMapper) {
        this.lxqUserInfoMapper = lxqUserInfoMapper;
    }

    public LxqUserInfoService getLxqUserInfoService() {
        return lxqUserInfoService;
    }

    public void setLxqUserInfoService(LxqUserInfoService lxqUserInfoService) {
        this.lxqUserInfoService = lxqUserInfoService;
    }

    public TPerson getpPerson() {
        return pPerson;
    }

    public void setpPerson(TPerson pPerson) {
        this.pPerson = pPerson;
    }

    public TAlity getpAlity() {
        return pAlity;
    }

    public void setpAlity(TAlity pAlity) {
        this.pAlity = pAlity;
    }

    public TService getgService() {
        return gService;
    }

    public void setgService(TService gService) {
        this.gService = gService;
    }

    public HttpServletRequest getRequest() {
        return request;
    }

    public void setRequest(HttpServletRequest request) {
        this.request = request;
    }
}
