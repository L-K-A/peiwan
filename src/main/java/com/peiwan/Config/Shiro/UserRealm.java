package com.peiwan.Config.Shiro;
import com.peiwan.bean.PPerson;
import com.peiwan.service.AAttentionService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 自定义一个Realm
 * User: 张家明
 *
 * @author LiXuekai on 2019/1/13/12:45
 */
public class UserRealm extends AuthorizingRealm {
    /**
     * 执行授权逻辑
     * @param principalCollection
     * @return
     */

//    @Resource
//    private AAttentionService aAttentionService;

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        System.out.println("执行授权逻辑");
        return null;
    }

    @Autowired
    private AAttentionService aAttentionService;

    private SimpleAuthenticationInfo info = null;

    /**
     * 执行一些认证逻辑
     * @param authenticationToken
     * @return
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        System.out.println("执行认证逻辑");


        //编写shiro判断逻辑 ，判断用户名和密码
        //1判断用户名
        UsernamePasswordToken token = (UsernamePasswordToken) authenticationToken;
        PPerson myppersonname = aAttentionService.myppersonname(token.getUsername());
        if(myppersonname.getPersonNickname()!=null||myppersonname.getPersonPwd()!=null){
            // 获取用户名即可
            String personName = myppersonname.getPersonName();
            String personPwd = myppersonname.getPersonPwd();

            ByteSource salt = ByteSource.Util.bytes(token.getUsername());
            String realmName = this.getName();
            info = new SimpleAuthenticationInfo(personName, personPwd, salt,realmName);
        }
        return info;
    }

}
