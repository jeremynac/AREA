import 'dart:async';
import 'dart:convert';
//import 'package:flutter/material.dart';
import 'package:area/api/GlobalNetwork.dart';
import 'package:http/http.dart' as http;

// Map<String, dynamic> exampleServiceAllStatus = {
//   "services": [
//     {
//       "service": {
//         "_id": "5fff3620c37c77753705f766",
//         "name": "facebook",
//         "type": "facebook",
//         "service_url": "/auth/fb-login/601951238d07f000145f2e99",
//         "img": "https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png",
//       },
//       "connected": true
//     },
//     {
//       "service": {"_id": "602bc4fd7233e600087eb9e0", "name": "discord", "type": "discord", "service_url": "/auth/di-login/601951238d07f000145f2e99", "img": "https://cdn.icon-icons.com/icons2/2108/PNG/512/discord_icon_130958.png"},
//       "connected": false
//     },
//     {
//       "service": {
//         "_id": "603b9c16f4930e000987dfaa",
//         "name": "trello",
//         "type": "trello",
//         "service_url": "/auth/trello-login/601951238d07f000145f2e99",
//         "img": "https://cdn.iconscout.com/icon/free/png-256/trello-226534.png",
//       },
//       "connected": false
//     },
//     {
//       "service": {
//         "_id": "601034a8779c01000abdc6b7",
//         "name": "google",
//         "type": "google",
//         "service_url": "/auth/go-login/601951238d07f000145f2e99",
//         "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png",
//         "loginIcn": "https://cdn.discordapp.com/attachments/798160246794354688/816004458340286514/btn_google_signin_dark_focus_web.png"
//       },
//       "connected": false
//     },
//     {
//       "service": {
//         "_id": "6037afafdcacf70009005f1b",
//         "name": "github",
//         "type": "github",
//         "service_url": "/auth/gh-login/601951238d07f000145f2e99",
//         "img": "https://icons-for-free.com/iconfiles/png/512/part+1+github-1320568339880199515.png",
//       },
//       "connected": true
//     },
//     {
//       "service": {
//         "_id": "60377bbaa7a1e900072798d6",
//         "name": "twitch",
//         "type": "twitch",
//         "service_url": "/auth/twitch-login/601951238d07f000145f2e99",
//         "img": "https://cdn0.iconfinder.com/data/icons/social-network-7/50/16-512.png",
//       },
//       "connected": true
//     }
//   ]
// };

Future<Map<String, dynamic>> getUserInfo() async {
  final response = await http.get(urlArea + '/user/info', headers: headers);

  Map<String, dynamic> userinfo = jsonDecode(response.body);
  if (response.statusCode == 200) {
    return userinfo;
  } else {
    userinfo['error'] = true;
    return userinfo;
  }
}

Future<Map<String, dynamic>> getServiceAllStatus() async {
  final response =
      await http.get(urlArea + '/service/all/status', headers: headers);

  Map<String, dynamic> userinfo = jsonDecode(response.body);
  //print(userinfo);
  if (response.statusCode == 200) {
    return userinfo;
  } else {
    userinfo['error'] = true;
    return userinfo;
  }
}

/*
Future<Map<String, dynamic>> getMyAreas() async {
  final response = await http.get(urlArea + '/user/scripts', headers: headers);

  Map<String, dynamic> areas = jsonDecode(response.body);
  if (response.statusCode == 200) {
    return areas;
  } else {
    areas['error'] = true;
    return areas;
  }
} */

//
