package com.peiwan.dao;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.peiwan.bean.TMoney;
import org.apache.ibatis.annotations.Update;

public interface PMoneyMapper extends BaseMapper<TMoney> {
    @Update("update t_money set m_balance=m_balance+#{mBalance},m_changetime=#{mChangetime},m_charge=#{mCharge} where pid=#{pid}")
    public int UpMoney(Double mBalance,String mChangetime,Double mCharge,Integer pid);


}
