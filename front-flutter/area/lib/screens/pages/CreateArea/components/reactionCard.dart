import 'package:area/api/class/area.dart';
import 'package:flutter/material.dart';
import 'package:area/constants.dart';
import './dynamicForm.dart';
import 'package:area/api/scripts.dart';

class ReactionCard extends StatefulWidget {
  final Function(ReactionCreation) reactionCallback;
  final Function() failCallback;

  const ReactionCard({
    Key key,
    this.reactionCallback,
    this.failCallback,
  }) : super(key: key);

  @override
  _ReactionCardState createState() => _ReactionCardState();
}

class _ReactionCardState extends State<ReactionCard> {
  int dropdownValue = 0;
  String selectedId = "602ba5c897914b000773055f";
  List<dynamic> argumentList = [
    {"type": "String", "name": "author"}
  ];
  ReactionCreation reactionClass = ReactionCreation("0", {});

  callback(Map<String, dynamic> data) {
    reactionClass.parameters = data;
    reactionClass.reactionId = selectedId;
    widget.reactionCallback(reactionClass);
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: getReactionAvailable(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          if (snapshot.data['reactions'].length == 0) {
            widget.failCallback();
            return Column(
              children: [
                Icon(
                  Icons.dangerous,
                  color: Colors.red[700],
                ),
                Text(
                  "Not Reactions available - Please connect to at least one service",
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
                padding: EdgeInsets.only(
                    top: 6.0, left: 6.0, right: 6.0, bottom: 6.0),
                child: Column(
                  children: [
                    Text(
                      "Add Reaction",
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
                          selectedId =
                              snapshot.data['reactions'][newValue]['_id'];
                          argumentList = snapshot.data['reactions'][newValue]
                              ['parameters'];
                          print(argumentList);
                        });
                      },
                      items: [
                        for (var i = 0;
                            i < snapshot.data['reactions'].length;
                            i++)
                          DropdownMenuItem<int>(
                            value: i,
                            child: Text(snapshot.data['reactions'][i]['name']),
                          ),
                      ],
                    ),
                    DynamicForm(
                      data: snapshot.data['reactions'][dropdownValue]
                          ['parameters'],
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
