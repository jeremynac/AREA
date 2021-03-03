import 'package:area/constants.dart';
import 'package:flutter/material.dart';
import './nameCard.dart';
import './actionCard.dart';
import './reactionCard.dart';
import 'package:area/api/class/area.dart';
import 'package:area/api/scripts.dart';

class Body extends StatefulWidget {
  const Body({
    Key key,
  }) : super(key: key);

  @override
  _BodyState createState() => _BodyState();
}

class _BodyState extends State<Body> {
  ScriptCreation scriptClass = ScriptCreation("", ActionCreation("0", {}), ReactionCreation("0", {}), false);

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

  actionCallback(ActionCreation data) {
    scriptClass.action = data;
  }

  reactionCallback(ReactionCreation data) {
    scriptClass.reaction = data;
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
              ),
              SizedBox(
                width: size.width * 0.9,
                child: ActionCard(
                  actionCallback: actionCallback,
                ),
              ),
              SizedBox(
                height: size.height * 0.01,
              ),
              SizedBox(
                width: size.width * 0.9,
                child: ReactionCard(
                  reactionCallback: reactionCallback,
                ),
              ),
              Container(
                margin: EdgeInsets.symmetric(vertical: 10),
                width: size.width * 0.8,
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(29),
                  child: FlatButton(
                    padding: EdgeInsets.symmetric(vertical: 20, horizontal: 40),
                    color: kSecondayColor,
                    shape: RoundedRectangleBorder(side: BorderSide(color: kPrimaryColor, width: 2, style: BorderStyle.solid), borderRadius: BorderRadius.circular(50)),
                    onPressed: () async {
                      bool success = await postScriptCreate(scriptClass);
                      if (!success) errorSendAlertDialog(context);
                      print(scriptClass.toJson());
                    },
                    child: Text(
                      "Submit",
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
  }
}
