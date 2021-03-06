import 'dart:async';
import 'dart:convert';
import 'package:area/api/GlobalNetwork.dart';
import 'package:http/http.dart' as http;

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
  final response = await http.get(urlArea + '/service/all/status', headers: headers);

  Map<String, dynamic> userinfo = jsonDecode(response.body);
  //print(userinfo);
  if (response.statusCode == 200) {
    return userinfo;
  } else {
    userinfo['error'] = true;
    return userinfo;
  }
}

Future<bool> postUpdateUserInfo(String username) async {
  final body = jsonEncode({"username": username});
  print("UPDATE USERNAME: " + body.toString());
  final response = await http.post(urlArea + '/user/update', headers: headers, body: body);

  if (response.statusCode == 200) {
    return true;
  } else {
    return false;
  }
}
