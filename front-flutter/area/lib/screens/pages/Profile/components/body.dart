import 'package:area/api/auth.dart';
import 'package:area/api/profile.dart';
import 'package:area/screens/pages/Profile/components/serviceCard.dart';
import 'package:flutter/material.dart';
import './profileCard.dart';

class Body extends StatefulWidget {
  @override
  _BodyState createState() => _BodyState();
}

//ignore: must_be_immutable
class _BodyState extends State<Body> {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: getServiceAllStatus(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          return Padding(
            padding: EdgeInsets.only(top: 0, left: 6.0, right: 6.0, bottom: 6.0),
            child: ListView(
              children: <Widget>[
                Column(
                  children: [
                    ProfileCard(),
                    for (var i in snapshot.data['services']) ServiceCard(data: i),
                  ],
                ),
              ],
            ),
          );
        } else if (snapshot.hasError) {
          disconnect();
          Navigator.of(context).pushNamedAndRemoveUntil('/home', (Route<dynamic> route) => false);
          throw snapshot.error;
        } else {
          return Center(child: CircularProgressIndicator());
        }
      },
    );
  }
}
