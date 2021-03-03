class ScriptCreation {
  String name;
  ActionCreation action;
  ReactionCreation reaction;
  bool activated;
  ScriptCreation(this.name, this.action, this.reaction, this.activated);
  Map<String, dynamic> toJson() => {'name': name, 'action': action.toJson(), 'reaction': reaction.toJson()};
}

class ActionCreation {
  String actionId;
  Map<String, dynamic> parameters;
  ActionCreation(this.actionId, this.parameters);
  Map<String, dynamic> toJson() => {'action_id': actionId, 'parameters': parameters};
}

class ReactionCreation {
  String reactionId;
  Map<String, dynamic> parameters;
  ReactionCreation(this.reactionId, this.parameters);
  Map<String, dynamic> toJson() => {'reaction_id': reactionId, 'parameters': parameters};
}

void dsdd() async {
  ActionCreation newaction = ActionCreation("64666416163", {"kjdsjfsdjkf": "dsfsdfsdf"});
  ReactionCreation newreaction = ReactionCreation("64666416163", {"kjdsjfsdjkf": "dsfsdfsdf"});
  ScriptCreation eatnewScript = ScriptCreation("Blabla", newaction, newreaction, true);

  eatnewScript.action.actionId = "4516546";
}
