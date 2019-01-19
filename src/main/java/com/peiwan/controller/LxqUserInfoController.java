package com.peiwan.controller;


import com.alibaba.druid.pool.DruidDataSource;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.TAlity;
import com.peiwan.bean.TPerson;
import com.peiwan.bean.TService;
import com.peiwan.dao.LxqUserInfoMapper;
import com.peiwan.service.LxqUserInfoService;
import com.qiniu.util.Auth;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;
import java.io.*;
import java.util.*;

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

    // ******的内容需要查看七牛云账号的相关信息
    private static final String accessKey = "SpGkq03Mt4xfkzMS2s0pXW_mD_SYdracaRFt4y7g";    //访问秘钥
    private static final String secretKey = "Hkrc7hZ5pRxgPY1lIBF8lV1h_6ua_o9oaMyDD6LG";    //授权秘钥
    private static final String bucket = "l-k-a";       //存储空间名称
    private static final String domain = "pleuof34m.bkt.clouddn.com";       //外链域名

    /**
     * 七牛云上传生成凭证
     *
     * @throws Exception
     */
    @RequestMapping("/QiniuUpToken")
    @ResponseBody
    public Map<String, Object> QiniuUpToken(@RequestParam String suffix,int pid,TPerson pPerson) throws Exception{
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            //验证七牛云身份是否通过
            Auth auth = Auth.create(accessKey, secretKey);
            //生成凭证
            String upToken = auth.uploadToken(bucket);
            result.put("token", upToken);
            //存入外链默认域名，用于拼接完整的资源外链路径
            result.put("domain", domain);

            // 是否可以上传的图片格式
            /*boolean flag = false;
            String[] imgTypes = new String[]{"jpg","jpeg","bmp","gif","png"};
            for(String fileSuffix : imgTypes) {
                if(suffix.substring(suffix.lastIndexOf(".") + 1).equalsIgnoreCase(fileSuffix)) {
                    flag = true;
                    break;
                }
            }
            if(!flag) {
                throw new Exception("图片：" + suffix + " 上传格式不对！");
            }*/

            //生成实际路径名
            String randomFileName = UUID.randomUUID().toString() + suffix;
            /*result.put("imgUrl","pleuof34m.bkt.clouddn.com/"+ randomFileName+"?imageView2/2/w/400/h/400/q/100");*/
            pPerson.setPersonImage(randomFileName);
            int a= lxqUserInfoMapper.getUpdateUserImage(pPerson,pid);
            System.out.println(a);
            List list= lxqUserInfoMapper.getUserInfo(pid);
            result.put("resuls",list);
            result.put("imgUrl", randomFileName);
            result.put("success", 1);

        } catch (Exception e) {
            result.put("message", "获取凭证失败，"+e.getMessage());
            result.put("success", 0);
        } finally {
            return result;
        }
    }

    /**
     * 测试
     *
     * @return
     * @auther lxq
     */
    @RequestMapping("/ceshi")
    public String getlist() {
        //List list = lxqUserInfoMapper.getAAttentionList();
        /*List list = lxqUserInfoService.queryAAttentionList();
        System.out.println(list);*/
        return "qiniu";
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
    public Map userOrder(int pid ){
        System.out.println(pid);
       List list= lxqUserInfoMapper.getSelectOrder(pid);
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
        return "redirect:data";
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
        Map map = new HashMap();
        System.out.println(pPerson);
        /*String filePath = "F:\\upload\\" + himage.getOriginalFilename();*/
        String filePath = "C:\\Users\\Administrator\\Desktop\\peiwan\\src\\main\\resources\\static\\imgupload\\" + new Random().nextInt(100)+ himage.getOriginalFilename();
        //String filePath = request.getSession().getServletContext().getRealPath("imgupload") +File.separator +himage.getOriginalFilename();

        BufferedOutputStream outputStream = new BufferedOutputStream(new FileOutputStream(filePath));
        outputStream.write(himage.getBytes());
        outputStream.flush();
        outputStream.close();
        pPerson.setPersonCoverphoto(filePath);
        /*才艺标签*/
        //System.out.println("标签:"+tag);
        /*才艺表赋值*/
        pAlity.setPid(pPerson.getPid());
        pAlity.setAlityOne(tag.substring(0,1));
        pAlity.setAlityTwo(tag.substring(2,3));
        /*魅力部位*/
        pAlity.setCharmOne(organ.substring(0,1));
        pAlity.setCharmTwo(organ.substring(2,3));
        pAlity.setCharmThree(organ.substring(4,5));
        //System.out.println(pAlity);
        /*游戏版块*/
        //System.out.println("游戏"+gService);
        gService.setPid(pPerson.getPid());
        gService.setGName(gname);
        /*插入操作*/
        /*lxqUserInfoMapper.getPPersonInsert(pPerson);
        lxqUserInfoMapper.getInsertAlity(pAlity);
        lxqUserInfoMapper.getInsertGservice(gService);*/
            try{
                lxqUserInfoService.queryUpdateUserInfo(pPerson);
                /*this.transaction.commit()*/
                lxqUserInfoService.queryUpdateUserAlity(pAlity);
                lxqUserInfoService.queryUpdateUserService(gService);
                map.put("succ", 1);
            }catch (Exception e){
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            }
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
