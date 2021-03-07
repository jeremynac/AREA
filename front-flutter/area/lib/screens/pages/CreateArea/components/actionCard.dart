import 'package:area/api/class/area.dart';
import 'package:flutter/material.dart';
import 'package:area/constants.dart';
import './dynamicForm.dart';
import 'package:area/api/scripts.dart';

class ActionCard extends StatefulWidget {
  final Function(ActionCreation) actionCallback;
  final Function() failCallback;

  const ActionCard({
    Key key,
    this.actionCallback,
    this.failCallback,
  }) : super(key: key);

  @override
  _ActionCardState createState() => _ActionCardState();
}

class _ActionCardState extends State<ActionCard> {
  int dropdownValue = 0;
  String selectedId = "601033c4779c01000abdc6b5";
  List<dynamic> argumentList = [
    {"type": "String", "name": "author"}
  ];
  ActionCreation actionClass = ActionCreation("0", {});

  callback(Map<String, dynamic> data) {
    actionClass.parameters = data;
    actionClass.actionId = selectedId;
    widget.actionCallback(actionClass);
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: getActionAvailable(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          print("Got actions -> " + snapshot.data.toString());
          if (snapshot.data['actions'].length == 0) {
            widget.failCallback();
            return Column(
              children: [
                Icon(
                  Icons.dangerous,
                  color: Colors.red[700],
                ),
                Text(
                  "Not Actions available - Please connect to at least one service",
                  textAlign: TextAlign.center,
                ),
              ],
            );
          } else {
            return Card(
              color: kLightGreyColor,
              elevation: 0.0,
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0),
                  side: BorderSide(
                    color: kPrimaryColor,
                    width: 2.0,
                  )),
              clipBehavior: Clip.antiAlias,
              child: Padding(
                padding: EdgeInsets.only(top: 6.0, left: 6.0, right: 6.0, bottom: 6.0),
                child: Column(
                  children: [
                    Text(
                      "Add Action",
                      style: TextStyle(
                        fontFamily: 'Ubuntu',
                        color: Colors.black,
                        fontSize: 22,
                      ),
                    ),
                    Divider(
                      color: Colors.black,
                    ),
                    DropdownButton<int>(
                      value: dropdownValue,
                      icon: Icon(Icons.arrow_drop_down),
                      iconSize: 24,
                      elevation: 16,
                      style: TextStyle(
                        color: Colors.black,
                      ),
                      underline: Container(
                        height: 2,
                        color: kPrimaryColor,
                      ),
                      onChanged: (int newValue) {
                        setState(() {
                          dropdownValue = newValue;
                          selectedId = snapshot.data['actions'][newValue]['_id'];
                          argumentList = snapshot.data['actions'][newValue]['parameters'];
                        });
                      },
                      items: [
                        for (var i = 0; i < snapshot.data['actions'].length; i++)
                          DropdownMenuItem<int>(
                            value: i,
                            child: Text(snapshot.data['actions'][i]['name']),
                          ),
                      ],
                    ),
                    Text(
                      snapshot.data['actions'][dropdownValue]['description'],
                      style: TextStyle(
                        fontFamily: 'Ubuntu',
                        color: Colors.black,
                      ),
                    ),
                    DynamicForm(
                      data: snapshot.data['actions'][dropdownValue]['parameters'],
                      callback: callback,
                    ),
                  ],
                ),
              ),
            );
          }
        } else if (snapshot.hasError) {
          throw snapshot.error;
        } else {
          return Center(child: CircularProgressIndicator());
        }
      },
    );
  }
}
