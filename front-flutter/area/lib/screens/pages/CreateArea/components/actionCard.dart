import 'package:flutter/material.dart';
import 'package:area/constants.dart';
import 'package:area/api/profile.dart';

class ActionCard extends StatefulWidget {
  @override
  _ActionCardState createState() => _ActionCardState();
}

class _ActionCardState extends State<ActionCard> {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return FutureBuilder(
      future: getUserInfo(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          return SizedBox(
            width: size.width * 0.9,
            height: size.height * 0.3,
            child: Card(
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
                padding: EdgeInsets.only(top: 0, left: 6.0, right: 6.0, bottom: 6.0),
                child: Column(
                  children: [
                    Text("actionCard"),
                  ],
                ),
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
