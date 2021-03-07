import 'package:flutter/material.dart';
import 'package:area/constants.dart';
import './components/body.dart';
import 'package:icon_badge/icon_badge.dart';
import 'package:area/api/profile.dart';

final controller1 = TextEditingController();
final controller2 = TextEditingController();

class CreateArea extends StatefulWidget {
  @override
  _CreateArea createState() => _CreateArea();
}

class _CreateArea extends State<CreateArea> {
  notificationsDialog(BuildContext context, Map<String, dynamic> data) {
    return showDialog(
      context: context,
      builder: (context) {
        return SimpleDialog(
          title: Icon(
            Icons.notifications_outlined,
            color: Colors.greenAccent,
          ),
          children: [
            Column(
              children: [
                for (var i in data['notifs'])
                  Padding(
                    padding: EdgeInsets.only(top: 6.0, left: 16.0, right: 16.0, bottom: 6.0),
                    child: Text(
                      '[' + DateTime.fromMillisecondsSinceEpoch(i['date']).toString().split('.')[0] + "] " + i['message'],
                      style: TextStyle(
                        fontFamily: 'Ubuntu',
                        color: Colors.black,
                      ),
                    ),
                  ),
              ],
            ),
          ],
        );
      },
    );
  }

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Create Area',
          style: TextStyle(
            fontFamily: 'Ubuntu',
            color: Colors.black,
          ),
        ),
        actions: [
          FutureBuilder(
            future: getUserNotifications(),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.done) {
                print("Got notifications : " + snapshot.data['notifs'].toString());
                return IconBadge(
                  icon: Icon(
                    Icons.notifications_outlined,
                    color: Colors.black,
                  ),
                  itemCount: snapshot.data['notifs'].length,
                  hideZero: true,
                  onTap: () {
                    notificationsDialog(context, snapshot.data);
                    putClearUserNotifications();
                  },
                );
              } else if (snapshot.hasError) {
                return Center(child: CircularProgressIndicator());
              } else {
                return Center(child: CircularProgressIndicator());
              }
            },
          ),
        ],
        backgroundColor: kPrimaryLightColor,
      ),
      backgroundColor: Colors.white,
      body: Body(),
    );
  }
}
