import 'package:area/api/scripts.dart';
import 'package:flutter/material.dart';
import './areaCard.dart';

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
      future: getUserScripts(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          return Container(
            child: ListView(
              children: <Widget>[
                SizedBox(height: size.height * 0.01),
                SingleChildScrollView(
                  child: Column(
                    children: [
                      for (var i in snapshot.data['scripts']) AreaCard(data: i),
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
