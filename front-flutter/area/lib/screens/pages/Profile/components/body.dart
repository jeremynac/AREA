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
    Size size = MediaQuery.of(context).size;
    return FutureBuilder(
      future: getServiceAllStatus(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          return Container(
            child: ListView(
              children: <Widget>[
                SizedBox(height: size.height * 0.01),
                SingleChildScrollView(
                  child: Column(
                    children: [
                      ProfileCard(),
                      for (var i in snapshot.data['services'])
                        ServiceCard(data: i),
                    ],
                  ),
                ),
              ],
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
