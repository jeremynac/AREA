import 'dart:async';
import 'dart:convert';
import 'package:area/api/GlobalNetwork.dart';
import 'package:http/http.dart' as http;

Map<String, dynamic> example = {
  "actions": [
    {
      "parameters": [
        {"value": "author", "type": "String"},
        {"value": "test", "type": "bool"}
      ],
      "_id": "601033c4779c01000abdc6b5",
      "name": "gmail: email received",
      "type": "gmail-mail-received",
      "description": "You received an email on your gmail account",
      "service": "601034a8779c01000abdc6b7"
    },
    {
      "parameters": [
        {"important": "Boolean", "word": "String"}
      ],
      "_id": "6034ed97f6a933000952dcf4",
      "name": "gmail: email received that match",
      "type": "gmail-mail-received-match",
      "description": "You received an email on your gmail account that matches words",
      "service": "601034a8779c01000abdc6b7"
    }
  ]
};

Future<Map<String, dynamic>> getActionAvailable() async {
  final response = await http.get(urlArea + '/action/available', headers: headers);

  Map<String, dynamic> userinfo = jsonDecode(response.body);
  if (response.statusCode == 200) {
    return userinfo;
  } else {
    userinfo['error'] = true;
    return userinfo;
  }
}
