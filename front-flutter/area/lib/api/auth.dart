import 'dart:async';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:area/api/GlobalNetwork.dart';

import 'package:http/http.dart' as http;

Future<bool> isAuth() async {
  final prefs = await SharedPreferences.getInstance();
  final cookie = prefs.getString('cookie');
  final userIdStorage = prefs.getString('user_id');
  headers['Content-Type'] = 'application/json; charset=UTF-8';
  headers['cookie'] = cookie;
  userID = userIdStorage;

  final response = await http.get(urlArea + '/auth/isauth', headers: headers);

  Map<String, dynamic> isConnected = jsonDecode(response.body);
  if (response.statusCode == 200 && isConnected['connected'] == true) {
    headers['cookie'] = cookie;
    return true;
  } else {
    return false;
  }
}

void disconnect() async {
  final prefs = await SharedPreferences.getInstance();
  prefs.remove('cookie');
  headers.remove('cookie');
  prefs.remove('userID');
  userID = "";
}

Future<bool> fetchLogin(String username, String password) async {
  headers['Content-Type'] = 'application/json; charset=UTF-8';

  final response = await http.post(
    urlArea + '/auth/login',
    headers: headers,
    body: jsonEncode(<String, String>{
      'username': username,
      'password': password,
    }),
  );
  if (response.statusCode == 200) {
    updateCookie(response);
    return true;
  } else {
    return false;
  }
}

Future<bool> fetchSignup(String username, String password) async {
  headers['Content-Type'] = 'application/json; charset=UTF-8';

  final response = await http.post(
    urlArea + '/auth/register',
    headers: headers,
    body: jsonEncode(<String, String>{
      'username': username,
      'password': password,
    }),
  );
  if (response.statusCode == 200) {
    updateCookie(response);
    return true;
  } else {
    return false;
  }
}

void updateCookie(http.Response response) async {
  String rawCookie = response.headers['set-cookie'];
  if (rawCookie != null) {
    int index = rawCookie.indexOf(';');
    headers['cookie'] = (index == -1) ? rawCookie : rawCookie.substring(0, index);
    final prefs = await SharedPreferences.getInstance();
    prefs.setString('cookie', (index == -1) ? rawCookie : rawCookie.substring(0, index));

    Map<String, dynamic> areas = jsonDecode(response.body);
    userID = areas['userID'];
    prefs.setString('user_id', userID);
  }
}
