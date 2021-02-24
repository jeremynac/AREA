import 'dart:async';
import 'dart:convert';
//import 'dart:io';

import 'package:http/http.dart' as http;

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
  final responseJson = jsonDecode(response.body);

  return Login.fromJson(responseJson);
}

void signup(String username, String password) {
  print("Attempting signup with");
  print(username);
  print(password);
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
