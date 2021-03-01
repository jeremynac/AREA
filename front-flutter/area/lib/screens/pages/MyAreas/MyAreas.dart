import 'package:flutter/material.dart';
import 'package:area/constants.dart';

class MyAreas extends StatefulWidget {
  MyAreas({Key key}) : super(key: key);

  @override
  _MyAreas createState() => _MyAreas();
}

class _MyAreas extends State<MyAreas> {
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'My Areas',
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
