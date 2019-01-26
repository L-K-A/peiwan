package com.peiwan.controller;

import com.alipay.api.response.AlipayTradePrecreateResponse;
import com.alipay.demo.trade.model.result.AlipayF2FPrecreateResult;
import com.peiwan.AliPayUtil.AliPayMain;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class AliPayController {
    AliPayMain payMain = new AliPayMain();

    @RequestMapping("/toHome")
    public String toHome() {
        return "chongzhi";
    }

    @RequestMapping("/getQRCodeImg")
    @ResponseBody
    public Map<String, Object> getAliPayQRCodeImge(String expoName, String money) {

        AlipayF2FPrecreateResult result = payMain.test_trade_precreate(expoName,money);

        Map<String, Object> map = null;
        switch (result.getTradeStatus()) {
            case SUCCESS:
                System.out.println("支付宝预下单成功: )");

                AlipayTradePrecreateResponse response = result.getResponse();

                String tradeNo = response.getOutTradeNo();
                String qrCodeStr = response.getQrCode();

                map = new HashMap<>();
                map.put("tradeNo", tradeNo);
                map.put("qrCodeStr", qrCodeStr);
                map.put("payMain", qrCodeStr);
                break;

            case FAILED:
                System.out.println("支付宝预下单失败!!!");
                break;

            case UNKNOWN:
                System.out.println("系统异常，预下单状态未知!!!");
                break;

            default:
                System.out.println("不支持的交易状态，交易返回异常!!!");
                break;
        }

        return map;
    }



    @RequestMapping("/queryTradePayStatus")
    @ResponseBody
    public boolean queryTradePayStatus(String tradeNo) {

        System.out.println("==============:" + payMain.hashCode());
        boolean b = payMain.test_trade_query(tradeNo);

        return b;
    }

}
