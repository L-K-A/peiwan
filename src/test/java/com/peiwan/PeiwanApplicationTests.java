package com.peiwan;

import com.peiwan.controller.XyPersonController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.xml.crypto.Data;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PeiwanApplicationTests {


    @Test
    public void contextLoads() {
        String a="1,2,3";
        String[] split = a.split(",");
        List<Integer> list=new ArrayList<>();
        for (String string : split) {
            System.out.println(string);
            list.add(Integer.parseInt(string));
        }
        System.out.println(list);
    }

}

