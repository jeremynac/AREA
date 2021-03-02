import 'dart:async';
import 'dart:convert';
import 'package:area/api/GlobalNetwork.dart';
import 'package:http/http.dart' as http;

Map<String, dynamic> test = {
  "scripts": [
    {
      "activated": true,
      "last_activation": 1614701129,
      "_id": "603e6249e5b86200125eb7d1",
      "name": "Facebook mention",
      "action": "6034ed97f6a933000952dcf4",
      "reaction": "6034ca21e7864400074e00c1",
      "action_parameters": {"important": "false", "word": "test"},
      "reaction_parameters": {"to": "jeremynac@hotmail.fr"},
      "__v": 0
    },
    {
      "activated": false,
      "last_activation": 1614701129,
      "_id": "603e6249e5b86200125eb7d1",
      "name": "Email big wow",
      "action": "6034ed97f6a933000952dcf4",
      "reaction": "6034ca21e7864400074e00c1",
      "action_parameters": {"important": "false", "word": "test"},
      "reaction_parameters": {"to": "jeremynac@hotmail.fr"},
      "__v": 0
    },
    {
      "activated": true,
      "last_activation": 1614701129,
      "_id": "603e6249e5b86200125eb7d1",
      "name": "Google mention",
      "action": "6034ed97f6a933000952dcf4",
      "reaction": "6034ca21e7864400074e00c1",
      "action_parameters": {"important": "false", "word": "test"},
      "reaction_parameters": {"to": "jeremynac@hotmail.fr"},
      "__v": 0
    }
  ]
};

Future<Map<String, dynamic>> getUserScripts() async {
  final response = await http.get(urlArea + '/user/scripts', headers: headers);

  Map<String, dynamic> areas = jsonDecode(response.body);
  if (response.statusCode == 200) {
    return areas;
  } else {
    areas['error'] = true;
    return areas;
  }
}

Future<bool> updateScriptActivation(String scriptID, bool activated) async {
  String activatedString = "";
  if (activated == true) {
    activatedString = "true";
  } else {
    activatedString = "false";
  }
  final response = await http.get(
      urlArea +
          '/script/activate?id=' +
          scriptID +
          "&activated=" +
          activatedString,
      headers: headers);
  Map<String, dynamic> areas = jsonDecode(response.body);
  if (response.statusCode == 200) {
    return true;
  } else {
    areas['error'] = true;
    return false;
  }
}

Future<bool> postScriptCreate(Map<String, dynamic> body) async {
  final response =
      await http.post(urlArea + '/script/create', headers: headers, body: body);

  if (response.statusCode == 200) {
    return true;
  } else {
    return false;
  }
}

class ScriptCreation {
  String name;
  ActionCreation action;
  ReactionCreation reaction;
  ScriptCreation(this.name, this.action, this.reaction);
  Map<String, dynamic> toJson() =>
      {'name': name, 'action': action.toJson(), 'reaction': reaction.toJson()};
}

class ActionCreation {
  String actionId;
  Map<String, dynamic> parameters;
  ActionCreation(this.actionId, this.parameters);
  Map<String, dynamic> toJson() =>
      {'action_id': actionId, 'parameters': parameters};
}

class ReactionCreation {
  String reactionId;
  Map<String, dynamic> parameters;
  ReactionCreation(this.reactionId, this.parameters);
  Map<String, dynamic> toJson() =>
      {'action_id': reactionId, 'parameters': parameters};
}
