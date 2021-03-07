import 'package:flutter/material.dart';
import 'package:area/constants.dart';
import 'package:area/api/scripts.dart';

class AreaCard extends StatefulWidget {
  final Function(String) callback;

  const AreaCard({
    Key key,
    this.data,
    this.callback,
  });

  final Map<String, dynamic> data;

  @override
  _AreaCardState createState() => _AreaCardState(this.data['activated']);
}

class _AreaCardState extends State<AreaCard> {
  errorUpdateAlertDialog(BuildContext context) {
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

  bool isSwitched = false;
  _AreaCardState(this.isSwitched);
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    //print("DISPLAY AREA PARAMS" + widget.data.toString());
    return Card(
      color: kPrimaryLightColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15.0),
        side: BorderSide(
          color: kPrimaryColor,
          width: 2.0,
        ),
      ),
      clipBehavior: Clip.antiAlias,
      borderOnForeground: true,
      child: Padding(
        padding: EdgeInsets.only(top: 0, left: 6.0, right: 6.0, bottom: 6.0),
        child: ExpansionTile(
          title: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Flexible(
                child: Container(
                  padding: new EdgeInsets.only(right: 10.0),
                  child: Text(
                    widget.data['name'],
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontFamily: 'Ubuntu',
                      color: Colors.black,
                    ),
                  ),
                ),
              ),
              Switch(
                value: isSwitched,
                onChanged: (value) async {
                  setState(() {
                    isSwitched = value;
                  });
                  bool success = await updateScriptActivation(widget.data['_id'], isSwitched);
                  if (!success) {
                    isSwitched = !isSwitched;
                    errorUpdateAlertDialog(context);
                  }
                },
                activeTrackColor: Colors.lightGreenAccent,
                activeColor: Colors.green,
              ),
            ],
          ),
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Divider(
                      color: Colors.black,
                      height: 20,
                      thickness: 3,
                      indent: 5,
                      endIndent: 0,
                    ),
                    Text(
                      "Action parameters",
                      style: TextStyle(
                        fontFamily: 'Ubuntu',
                        color: Colors.black,
                        fontSize: 17,
                      ),
                    ),
                    if (widget.data['action_parameters'] != null)
                      for (var i in widget.data['action_parameters'].keys)
                        Text(
                          "- " + i + " : " + (widget.data['action_parameters'][i] is String ? widget.data['action_parameters'][i] : widget.data['action_parameters'][i].toString()),
                          style: TextStyle(
                            fontFamily: 'Ubuntu',
                            color: Colors.black,
                          ),
                        ),
                    SizedBox(
                      height: size.height * 0.01,
                    ),
                    Text(
                      "Reaction parameters",
                      style: TextStyle(
                        fontFamily: 'Ubuntu',
                        color: Colors.black,
                        fontSize: 17,
                      ),
                    ),
                    if (widget.data['reaction_parameters'] != null)
                      for (var i in widget.data['reaction_parameters'].keys)
                        Text(
                          "- " + i + " : " + (widget.data['reaction_parameters'][i] is String ? widget.data['reaction_parameters'][i] : widget.data['reaction_parameters'][i].toString()),
                          style: TextStyle(
                            fontFamily: 'Ubuntu',
                            color: Colors.black,
                          ),
                        ),
                  ],
                ),
                Row(
                  children: [
                    IconButton(
                      icon: Icon(Icons.edit),
                      color: Colors.black,
                      onPressed: () {
                        Navigator.pushNamed(
                          context,
                          '/edit',
                          arguments: (widget.data['_id']),
                        );
                      },
                    ),
                    IconButton(
                      icon: Icon(Icons.delete),
                      color: Colors.red[700],
                      onPressed: () {
                        widget.callback(widget.data['_id']);
                      },
                    ),
                  ],
                )
              ],
            ),
          ],
        ),
      ),
    );
  }
}

/*
{
    "script": {
        "activated": false,
        "last_activation": 1614701129,
        "_id": "603e6249e5b86200125eb7d1",
        "name": "facebook menthionned",
        "action": "6034ed97f6a933000952dcf4",
        "reaction": "6034ca21e7864400074e00c1",
        "action_parameters": {
            "important": "false",
            "word": "test"
        },
        "reaction_parameters": {
            "to": "jeremynac@hotmail.fr"
        },
        "__v": 0
    }
}
*/
