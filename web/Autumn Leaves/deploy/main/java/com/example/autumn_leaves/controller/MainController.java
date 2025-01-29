package com.example.autumn_leaves.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;

@Controller
public class MainController {

    @GetMapping("/")
    public String main(){
        return "index";
    }

    @GetMapping("/user")
    public String router(@RequestParam(required = false, defaultValue = "guest") String id){
        return "user/" + id;
    }

    @GetMapping("/error_page")
    public String pageError(@RequestParam("status") String status, Model model){
        model.addAttribute("status", status);
        return "error";
    }
}
