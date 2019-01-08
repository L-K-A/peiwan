package com.peiwan;

import com.peiwan.bean.PPerson;
import com.peiwan.dao.PersonMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PeiwanApplicationTests {


    @Autowired
    private PersonMapper person;

    @Test
    public void contextLoads() {

        System.out.println("----------------------");
        List<PPerson> personList = person.selectList(null);
        for (PPerson pPerson : personList) {
            System.out.println(pPerson);
        }
    }

}

