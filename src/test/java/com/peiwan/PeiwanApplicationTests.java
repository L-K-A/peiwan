package com.peiwan;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PeiwanApplicationTests {


    @Test
    public void contextLoads() {
        long a=10L;
        System.out.println(a==10);
    }

}

