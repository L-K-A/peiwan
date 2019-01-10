package com.peiwan.component;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @description: 拦截器   实现登陆拦截
 * @program: peiwan
 * @author: 张家明
 * @create: 2019-01-10 09:39
 **/

public class LoginHandlerInterceptor implements HandlerInterceptor {
    long start = System.currentTimeMillis();
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        preHandle是请求执行前执行的
        start = System.currentTimeMillis();
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
//        ostHandler是请求结束执行的  但只有preHandle方法返回true的时候才会执行
        System.out.println("Interceptor cost="+(System.currentTimeMillis()-start));
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
//        afterCompletion是视图渲染完成后才执行，同样需要preHandle返回true
    }
}
