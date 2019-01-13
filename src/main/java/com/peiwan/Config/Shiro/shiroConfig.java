package com.peiwan.Config.Shiro;

import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * shiro的配置类
 * User: 张家明
 *
 * @author LiXuekai on 2019/1/13/12:24
 */
@Configuration
public class shiroConfig {
    /**
     * 创建ShiroFilterFactoryBeean
     */
    @Bean
    public ShiroFilterFactoryBean getShiroFilterFactoryBean(@Qualifier("securityManager")DefaultWebSecurityManager securityManager){
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        //1.设置安全管理器
        shiroFilterFactoryBean.setSecurityManager(securityManager);
        //添加Shiro内置过滤器
        /**
         * Shiro内置过滤器，可以是实现权限相关的拦截器
         *    常用的过滤器：
         *    anon: 无需认证（登录） 可以访问
         *    authc:必须认证才可以访问
         *    user:如果使用rememberMe的功能可以直接访问
         *    perms:该资源必须得到资源权限才可以访问
         *    role:该资源必须得到角色权限才可以访问
         */
        Map<String,String> filterMap = new LinkedHashMap<String,String>();

         /* 需要放行的页面*/
        //测试的
        filterMap.put("/testThymeleaf","anon");
        filterMap.put("/tocheshi","anon");
        //主页面
        filterMap.put("/","anon");
        filterMap.put("/toIndex","anon");
        //注册页面
        filterMap.put("/toRegister","anon");


       /* filterMap.put("/add","authc");
        filterMap.put("/update","authc");*/
       //可以简介化直接要根下的都要进行登录
        filterMap.put("/*","authc");




//        authc:必须认证（登录）才可以访问  这里拦截成功  但是
//        如果不设置默认会自动寻找Web工程根目录下的"/loginJC.jsp"页面
//        下面进行设设置
        shiroFilterFactoryBean.setLoginUrl("/toLogin");



        shiroFilterFactoryBean.setFilterChainDefinitionMap(filterMap);


        return shiroFilterFactoryBean;
    }


    /**
     * 创建DefaultWebSecusrityManager
     */
    @Bean(name = "securityManager")
    public DefaultWebSecurityManager getDefaultWebSecurityManager(@Qualifier("userRealm")UserRealm userRealm){
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        securityManager.setRealm(userRealm);
        return securityManager;
    }


    /**
     * 创建Realm
     */
    @Bean(name = "userRealm")
    public UserRealm getRealm(){
        return new UserRealm();
    }

}
