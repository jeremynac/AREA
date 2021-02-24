import 'package:flutter/material.dart';
import 'package:area/constants.dart';

final controller1 = TextEditingController();
final controller2 = TextEditingController();

class MyReactions extends StatefulWidget {
  @override
  _MyReactions createState() => _MyReactions();
}

class _MyReactions extends State<MyReactions> {
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'My Reactions',
          style: TextStyle(
            fontFamily: 'Ubuntu',
            color: Colors.black,
          ),
        ),
        backgroundColor: kPrimaryLightColor,
      ),
      backgroundColor: Colors.white,
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[],
      ),
    );
  }
}
