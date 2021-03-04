import 'package:area/api/class/area.dart';
import 'package:flutter/material.dart';
import 'package:area/constants.dart';
import './dynamicForm.dart';
import 'package:area/api/scripts.dart';

class ActionCard extends StatefulWidget {
  final Function(ActionCreation) actionCallback;
  final String initActionId;
  final Map<String, dynamic> initParameters;
  final int initDropdownvalue;

  const ActionCard({
    Key key,
    this.actionCallback,
    this.initActionId,
    this.initParameters,
    this.initDropdownvalue = 0,
  }) : super(key: key);

  @override
  _ActionCardState createState() => _ActionCardState(initDropdownvalue, initActionId);
}

class _ActionCardState extends State<ActionCard> {
  int dropdownValue;
  String selectedId;
  _ActionCardState(this.dropdownValue, this.selectedId);
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
          return Card(
            color: kLightGreyColor,
            elevation: 0.0,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10.0),
              side: BorderSide(
                color: kPrimaryColor,
                width: 2.0,
              ),
            ),
            clipBehavior: Clip.antiAlias,
            child: Padding(
              padding: EdgeInsets.only(top: 6.0, left: 6.0, right: 6.0, bottom: 6.0),
              child: Column(
                children: [
                  Text(
                    "Edit Action",
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
                  DynamicForm(
                    data: snapshot.data['actions'][dropdownValue]['parameters'],
                    callback: callback,
                    initArguments: widget.initParameters,
                    withArgs: (selectedId == widget.initActionId),
                  ),
                ],
              ),
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
