package com.peiwan.Config.Shiro;

import com.peiwan.bean.PPerson;
import com.peiwan.service.AAttentionService;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;

import javax.annotation.Resource;

/**
 * @description: Realm  张家名创建   身份校验和角色设置     权限管理
 * @program: peiwan
 * @author: 张家明
 * @create: 2019-01-10 20:17
 **/

public class MyShiroRealm extends AuthorizingRealm {

    @Resource
    private AAttentionService aAttentionService;

    /**
     * Retrieves the AuthorizationInfo for the given principals from the underlying data store.  When returning
     * an instance from this method, you might want to consider using an instance of
     * {@link SimpleAuthorizationInfo SimpleAuthorizationInfo}, as it is suitable in most cases.
     *
     * @param principals the primary identifying principals of the AuthorizationInfo that should be retrieved.
     * @return the AuthorizationInfo associated with this principals.
     * @see SimpleAuthorizationInfo
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        System.out.println("开始权限配置");

        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        PPerson pPerson = (PPerson) principals.getPrimaryPrincipal();



        return null;
    }

    /**
     * Retrieves authentication data from an implementation-specific datasource (RDBMS, LDAP, etc) for the given
     * authentication token.
     * <p/>
     * For most datasources, this means just 'pulling' authentication data for an associated subject/user and nothing
     * more and letting Shiro do the rest.  But in some systems, this method could actually perform EIS specific
     * log-in logic in addition to just retrieving data - it is up to the Realm implementation.
     * <p/>
     * A {@code null} return value means that no account could be associated with the specified token.
     *
     * @param token the authentication token containing the user's principal and credentials.
     * @return an {@link AuthenticationInfo} object containing account data resulting from the
     * authentication ONLY if the lookup is successful (i.e. account exists and is valid, etc.)
     * @throws AuthenticationException if there is an error acquiring data or performing
     *                                 realm-specific authentication logic for the specified <tt>token</tt>
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        System.out.println("开始身份验证");
        //获取用户名，默认和login.html中的username对应。
        String personName = (String) token.getPrincipal();
        PPerson byperson = aAttentionService.findBypersonName(personName);
        if (byperson==null){
            //没有返回登录用户名对应的SimpleAuthenticationInfo对象时,
            // 就会在AAttentionController中抛出UnknownAccountException异常
            return null;
        }
        //验证通过返回一个封装了用户信息的AuthenticationInfo实例即可。
        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
                byperson,//用户信息
                byperson.getPersonName(),//数据库里的名字
                byperson.getPersonPwd()//密码
        );
//
        authenticationInfo.setCredentialsSalt(ByteSource.Util.bytes(byperson.getCredentialspersonPwdencry()));
        return authenticationInfo;
    }
}
