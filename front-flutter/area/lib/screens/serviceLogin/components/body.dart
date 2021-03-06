import 'package:flutter/material.dart';
import 'package:area/api/auth.dart';
import './serviceCard.dart';

class Body extends StatefulWidget {
  @override
  _BodyState createState() => _BodyState();
}

class _BodyState extends State<Body> {
  @override
  Widget build(BuildContext context) {
    //Size size = MediaQuery.of(context).size;
    return FutureBuilder(
      future: getLoginServices(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done &&
            snapshot.data != null &&
            snapshot.data['error'] != true) {
          return Container(
            child: ListView(
              children: <Widget>[
                for (var i in snapshot.data['services']) ServiceCard(data: i),
              ],
            ),
          );
        } else if (snapshot.hasError) {
          throw snapshot.error;
        } else {
          print(snapshot.data.toString());
          return Center(child: CircularProgressIndicator());
        }
      },
    );
  }
}
