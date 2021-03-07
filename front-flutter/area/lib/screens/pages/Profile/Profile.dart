import 'package:flutter/material.dart';
import 'package:area/constants.dart';
import 'package:area/api/auth.dart';
import './components/body.dart';
import 'package:icon_badge/icon_badge.dart';
import 'package:area/api/profile.dart';

class MyProfile extends StatefulWidget {
  MyProfile({Key key}) : super(key: key);

  @override
  _MyProfile createState() => _MyProfile();
}

class _MyProfile extends State<MyProfile> {
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
          'My Profile',
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
                disconnect();
                Navigator.of(context).pushNamedAndRemoveUntil('/home', (Route<dynamic> route) => false);
                throw snapshot.error;
              } else {
                return Center(child: CircularProgressIndicator());
              }
            },
          ),
          Builder(
            builder: (BuildContext context) {
              return IconButton(
                icon: const Icon(
                  Icons.logout,
                  color: Colors.redAccent,
                ),
                onPressed: () async {
                  disconnect();
                  Navigator.of(context).pushNamedAndRemoveUntil('/home', (Route<dynamic> route) => false);
                },
              );
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
