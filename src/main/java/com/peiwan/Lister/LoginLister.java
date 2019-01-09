package com.peiwan.Lister;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.util.HashSet;
import java.util.Set;

/**
 * @Author: zhangwanli
 * @Despriction:   对主播是否在线进行的验证
 * @Date:Created in 19:39 2019/1/9
 * @Modify by:
 */
public class LoginLister implements HttpSessionListener, ServletContextListener {
    private ServletContext application = null;

    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("context destory");
    }
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("context init");
        application = sce.getServletContext();
        Set<String> onlineUserSet = new HashSet<String>();
        application.setAttribute("onlineUserSet", onlineUserSet);
    }
    public void sessionCreated(HttpSessionEvent se) {
        System.out.println("session create");
    }

    public void sessionDestroyed(HttpSessionEvent se) {
        HttpSession session = se.getSession();
        Set<String> onlineUserSet = (Set<String>)application.getAttribute("onlineUserSet");
        String username = (String)session.getAttribute("username");
        onlineUserSet.remove(username);
        application.setAttribute("onlineUserSet", onlineUserSet);
        onlineUserSet = (Set<String>)application.getAttribute("onlineUserSet");
        System.out.println(onlineUserSet.toString());
        System.out.println(username + "超时退出");
        System.out.println("session destory");
    }


    /*登录时  添加代码
    HttpServletRequest request = ServletActionContext.getRequest();
    HttpSession session = request.getSession();
    session.setMaxInactiveInterval(60);
    ServletContext application = session.getServletContext();
    Set<String> onlineUserSet = new HashSet<String>();
    session.setAttribute("username", name);
    onlineUserSet = (Set)application.getAttribute("onlineUserSet");
    onlineUserSet.add(name);
    application.setAttribute("onlineUserList", onlineUserSet);
    onlineUserSet = (Set)application.getAttribute("onlineUserSet");*/
}
