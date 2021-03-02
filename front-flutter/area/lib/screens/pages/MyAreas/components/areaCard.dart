import 'package:flutter/material.dart';
import 'package:area/constants.dart';
import 'package:area/api/scripts.dart';

class AreaCard extends StatefulWidget {
  const AreaCard({
    Key key,
    this.data,
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
                  bool test = await updateScriptActivation(
                      widget.data['_id'], isSwitched);
                  if (!test) {
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
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                for (var i in widget.data['action_parameters'].keys)
                  Text(
                    i + " : " + widget.data['action_parameters'][i],
                    style: TextStyle(
                      fontFamily: 'Ubuntu',
                      color: Colors.black,
                    ),
                  ),
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
