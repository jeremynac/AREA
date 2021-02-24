import 'dart:async';
import 'dart:convert';
//import 'dart:io';

import 'package:http/http.dart' as http;

Map<String, String> headers = {};

Future<Login> fetchLogin(String username, String password) async {
  print("Attempting login with");
  print(username);
  print(password);
  final response = await http.post(
    'https://area.gen-host.fr/auth/login',
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{
      'username': username,
      'password': username,
    }),
  );
  updateCookie(response);
  final responseJson = jsonDecode(response.body);

  return Login.fromJson(responseJson);
}

void updateCookie(http.Response response) {
  String rawCookie = response.headers['set-cookie'];
  if (rawCookie != null) {
    int index = rawCookie.indexOf(';');
    headers['cookie'] =
        (index == -1) ? rawCookie : rawCookie.substring(0, index);
  }
}

void signup(String username, String password) {
  print("Attempting signup with");
  print(username);
  print(password);
  fetchLogin(username, password);
}

class Login {
  final int userId;
  final int id;
  final String title;

  Login({this.userId, this.id, this.title});

  factory Login.fromJson(Map<String, dynamic> json) {
    print(json);
    return Login(
      userId: json['userId'],
      id: json['id'],
      title: json['title'],
    );
  }
}
