import 'package:flutter/material.dart';
//import './nameCard.dart';
import './actionCard.dart';
//import './reactionCard.dart';
//import 'package:area/api/class/area.dart';

class Body extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      child: ListView(
        children: <Widget>[
          Column(
            children: [
              SizedBox(
                height: size.height * 0.01,
              ),
              ActionCard(),
            ],
          ),
        ],
      ),
    );
  }
}
