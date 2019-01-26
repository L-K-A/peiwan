package com.peiwan.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.TPerson;
import com.peiwan.service.IYjhAnchorService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName AnchorManagerController
 * @Author YJH
 * @Date 2019/1/21 15:15
 */

@RestController
public class YjhAncController {

    @Resource
    private IYjhAnchorService anchorService;

    @RequestMapping("/anc")
    public ModelAndView toUser() {
        return new ModelAndView("anchor-list.html");
    }

    @RequestMapping("/ancList")
    public Map queryAncList(int pageCurrent, int pageSize, TPerson pPerson){
        Page<TPerson> page = new Page<>(pageCurrent,pageSize);
        IPage<TPerson> iPage = anchorService.page(page,pPerson);
        /*得到主播数据*/
        List<TPerson> pPersonList = iPage.getRecords();
        Map map = new HashMap();
        map.put("page",pPersonList);
        /*用户总条数*/
        map.put("pageNum",iPage.getTotal());
        /*用户总页数*/
        map.put("totalPage",iPage.getPages());
        return map;
    }

    public IYjhAnchorService getAnchorService() {
        return anchorService;
    }

    public void setAnchorService(IYjhAnchorService anchorService) {
        this.anchorService = anchorService;
    }
}
