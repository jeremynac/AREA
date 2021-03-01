import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:area/api/GlobalNetwork.dart';
import 'package:http/http.dart' as http;
import 'package:webview_flutter/webview_flutter.dart';

Map<String, dynamic> exampleServiceAllStatus = {
  "services": [
    {
      "service": {
        "_id": "5fff3620c37c77753705f766",
        "name": "facebook",
        "type": "facebook",
        "service_url": "/auth/fb-login/601951238d07f000145f2e99"
      },
      "connected": true
    },
    {
      "service": {
        "_id": "602bc4fd7233e600087eb9e0",
        "name": "discord",
        "type": "discord",
        "service_url": "/auth/di-login/601951238d07f000145f2e99",
        "img":
            "https://cdn.icon-icons.com/icons2/2108/PNG/512/discord_icon_130958.png"
      },
      "connected": false
    },
    {
      "service": {
        "_id": "603b9c16f4930e000987dfaa",
        "name": "trello",
        "type": "trello",
        "service_url": "/auth/trello-login/601951238d07f000145f2e99"
      },
      "connected": false
    },
    {
      "service": {
        "_id": "601034a8779c01000abdc6b7",
        "name": "google",
        "type": "google",
        "service_url": "/auth/go-login/601951238d07f000145f2e99",
        "img":
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png",
        "loginIcn":
            "https://cdn.discordapp.com/attachments/798160246794354688/816004458340286514/btn_google_signin_dark_focus_web.png"
      },
      "connected": false
    },
    {
      "service": {
        "_id": "6037afafdcacf70009005f1b",
        "name": "github",
        "type": "github",
        "service_url": "/auth/gh-login/601951238d07f000145f2e99"
      },
      "connected": true
    },
    {
      "service": {
        "_id": "60377bbaa7a1e900072798d6",
        "name": "twitch",
        "type": "twitch",
        "service_url": "/auth/twitch-login/601951238d07f000145f2e99"
      },
      "connected": true
    }
  ]
};

Future<Map<String, dynamic>> getUserInfo() async {
  //final response = await http.get(url_area + '/user/info', headers: headers);
  Map<String, dynamic> test = {
    "email": "test@test.fr",
    "firstname": "Bob",
    "lastname": "Godeau",
    "username": "Kevindu95"
  };

  //Map<String, dynamic> userinfo = jsonDecode(response.body);
  //Map<String, dynamic> userinfo = jsonDecode(test);
  //if (response.statusCode == 200) {
  return test;
  //} else {
  //userinfo['error'] = true;
  //return userinfo;
  //}
}

Future<Map<String, dynamic>> getServiceAllStatus() async {
  //final response = await http.get(url_area + '/service/all/status', headers: headers);
  return exampleServiceAllStatus;

  //Map<String, dynamic> userinfo = jsonDecode(response.body);
  // Map<String, dynamic> userinfo = jsonDecode(exampleServiceAllStatus);
  // if (response.statusCode == 200) {
  //   return userinfo;
  // } else {
  //   userinfo['error'] = true;
  //   return userinfo;
  // }
}
