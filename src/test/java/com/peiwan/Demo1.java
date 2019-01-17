package com.peiwan;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.peiwan.bean.MMomey;
import com.peiwan.bean.OOrder;
import com.peiwan.bean.PPerson;
import com.peiwan.dao.IAccountMapper;
import com.peiwan.dao.IIndentMapper;
import com.peiwan.dao.IPersonMapper;
import com.peiwan.service.IPersonService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @ClassName Demo1
 * @Author YJH
 * @Date 2019/1/9 11:52
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class Demo1 {

    @Resource
    private IPersonMapper iPersonMapper;

    @Resource
    private IPersonService personService;

    @Resource
    private IAccountMapper accountMapper;


    @Resource
    private IIndentMapper indentMapper;
    /**
     * 查询测试
     *
     * @Author : YJH
     * @Date : 2019/1/9  12:13
     * @Parm :
     * @Return :
     */

    @Test
    public void setselect() {
        System.out.println("---selectAll method test------");
        List<PPerson> personList = iPersonMapper.selectList(null);
        Assert.assertEquals(2, personList.size());
        personList.forEach(System.out::println);
    }

    /**
     * 插入测试
     *
     * @Author : YJH
     * @Date : 2019/1/9  12:16
     * @Parm :
     * @Return :
     */

    @Test
    public void insertLoads() {
        PPerson pPerson = new PPerson();
        pPerson.setPersonName("紫金阁");
        pPerson.setPersonAge(17);
        pPerson.setPersonAdress("郑州市 二七区");
        Integer insert = iPersonMapper.insert(pPerson);
        System.out.println("return insert value=" + insert);
    }

    /**根据ID更新
     * @Author : YJH
     * @Date : 2019/1/9  14:39
     * @Parm :
     * @Return :
     */

    @Test
    public void updateByIdLoads() {
        PPerson pPerson = new PPerson();
        pPerson.setPersonAge(19);
        pPerson.setPersonAdress("郑州市 金水区");
        pPerson.setPersonNickname("宋徽宗");
        pPerson.setPid(16);
        Integer integer = iPersonMapper.updateById(pPerson);
        System.out.println("return insert value:" + integer);
    }

    /**根据id批量删除
    * @Author : YJH
    * @Date : 2019/1/9  14:44
    * @Parm :
    * @Return :
    */

    @Test
    public void deleteLoads(){
        List<Long> list=new ArrayList<>();
        list.add(16L);
        list.add(25L);
        list.add(26L);
        Integer integer=iPersonMapper.deleteBatchIds(list);
        System.out.println("return deleteBatchIds value:"+integer);
    }
    /**
     * 分页测试
     *
     * @Author : YJH
     * @Date : 2019/1/9  14:32
     * @Parm :
     * @Return :
     */
   @Test
    public void selectPageLoads() {
       Page<PPerson> page=new Page<>(1,5);
       IPage<PPerson> iPage = iPersonMapper.selectPage(page, null);
       System.out.println("return selectPageLoads value:"+iPage);

   }

/*   @Test
   public void selectById(){
       List<OOrder> orders = indentMapper.selectBatchId(1);
       System.out.println(orders);
   }  */

   @Test
   public void selByid(){
       Page<MMomey> page =new Page<>(1,5);
       QueryWrapper<MMomey> wrapper = new QueryWrapper<>();
       wrapper.eq("pid",1);
       IPage<Map<String, Object>> mapIPage = accountMapper.selectMapsPage(page, wrapper);
       System.out.println(mapIPage);

   }

}
