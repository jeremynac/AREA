import 'package:area/constants.dart';
import 'package:flutter/material.dart';
import './nameCard.dart';
import './actionCard.dart';
import './reactionCard.dart';
import 'package:area/api/class/area.dart';
import 'package:area/api/scripts.dart';

class Body extends StatefulWidget {
  final String id;

  const Body({
    Key key,
    this.id,
  }) : super(key: key);

  @override
  _BodyState createState() => _BodyState();
}

class _BodyState extends State<Body> {
  ScriptEditing scriptClass = ScriptEditing("", ActionCreation("0", {}), ReactionCreation("0", {}), false, "");
  bool unlocked1 = false;
  bool unlocked2 = false;

  void initScriptClass(Map<String, dynamic> data) async {
    if (data['script']['name'] == null) {
      errorLoadDialog(context);
    } else {
      scriptClass.name = data['script']['name'];
      scriptClass.activated = data['script']['activated'];
      scriptClass.identifier = widget.id;
      scriptClass.action = ActionCreation(data['script']['action'], data['script']['action_parameters']);
      scriptClass.reaction = ReactionCreation(data['script']['reaction'], data['script']['reaction_parameters']);
    }
  }

  Future<int> computeInitialValue(Map<String, dynamic> data) async {
    Map<String, dynamic> map = await getActionAvailable();
    int result = 0;

    for (int i = 0; i < map['actions'].length; i++) {
      if (map['actions'][i]['_id'] == data['script']['action']) {
        result = i;
      }
    }
    return result;
  }

  Future<int> computeInitialValue2(Map<String, dynamic> data) async {
    Map<String, dynamic> map = await getReactionAvailable();
    int result = 0;

    for (int i = 0; i < map['reactions'].length; i++) {
      if (map['reactions'][i]['_id'] == data['script']['reaction']) {
        result = i;
      }
    }
    return result;
  }

  errorSendAlertDialog(BuildContext context) {
    return showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text("There was an error"),
          content: Icon(
            Icons.block,
            color: Colors.redAccent,
          ),
        );
      },
    );
  }

  errorLoadDialog(BuildContext context) {
    return showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text("There was an error"),
          content: Icon(
            Icons.block,
            color: Colors.redAccent,
          ),
        );
      },
    );
  }

  actionCallback(ActionCreation data) {
    if (unlocked1) {
      scriptClass.action = data;
    } else {
      unlocked1 = true;
    }
  }

  reactionCallback(ReactionCreation data) {
    if (unlocked2) {
      scriptClass.reaction = data;
    } else {
      unlocked2 = true;
    }
  }

  nameCallback(String data) {
    scriptClass.name = data;
  }

  activateCallback(bool data) {
    scriptClass.activated = data;
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return FutureBuilder(
      future: getScriptById(widget.id),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done && snapshot.data != null) {
          initScriptClass(snapshot.data);
          return Container(
            child: ListView(
              children: <Widget>[
                Column(
                  children: [
                    SizedBox(
                      height: size.height * 0.01,
                    ),
                    NameCard(
                      nameCallback: nameCallback,
                      activateCallback: activateCallback,
                      initName: snapshot.data['script']['name'],
                      initActivated: snapshot.data['script']['activated'],
                    ),
                    SizedBox(
                      width: size.width * 0.9,
                      child: FutureBuilder(
                        future: computeInitialValue(snapshot.data),
                        builder: (context, snapshot2) {
                          if (snapshot2.connectionState == ConnectionState.done) {
                            return ActionCard(
                              initDropdownvalue: snapshot2.data,
                              actionCallback: actionCallback,
                              initActionId: snapshot.data['script']['action'],
                              initParameters: snapshot.data['script']['action_parameters'],
                            );
                          } else if (snapshot.hasError) {
                            throw snapshot.error;
                          } else {
                            return Center(child: CircularProgressIndicator());
                          }
                        },
                      ),
                    ),
                    SizedBox(
                      height: size.height * 0.01,
                    ),
                    SizedBox(
                      width: size.width * 0.9,
                      child: FutureBuilder(
                        future: computeInitialValue2(snapshot.data),
                        builder: (context, snapshot3) {
                          if (snapshot3.connectionState == ConnectionState.done) {
                            return ReactionCard(
                              initDropdownvalue: snapshot3.data,
                              reactionCallback: reactionCallback,
                              initReactionId: snapshot.data['script']['reaction'],
                              initParameters: snapshot.data['script']['reaction_parameters'],
                            );
                          } else if (snapshot.hasError) {
                            throw snapshot.error;
                          } else {
                            return Center(child: CircularProgressIndicator());
                          }
                        },
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.symmetric(vertical: 10),
                      width: size.width * 0.8,
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(29),
                        child: FlatButton(
                          padding: EdgeInsets.symmetric(vertical: 20, horizontal: 40),
                          color: kPrimaryLightColor,
                          shape: RoundedRectangleBorder(side: BorderSide(color: kPrimaryColor, width: 2, style: BorderStyle.solid), borderRadius: BorderRadius.circular(50)),
                          onPressed: () async {
                            bool success = await putScriptUpdate(scriptClass);
                            if (!success)
                              errorSendAlertDialog(context);
                            else
                              Navigator.of(context).pushNamedAndRemoveUntil('/app', (Route<dynamic> route) => false);
                          },
                          child: Text(
                            "Edit",
                            style: TextStyle(color: Colors.black),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          );
        } else if (snapshot.hasError) {
          throw snapshot.error;
        } else {
          return Center(child: CircularProgressIndicator());
        }
      },
    );
  }
}
