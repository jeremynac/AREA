import 'package:flutter/material.dart';
import 'package:area/constants.dart';

class BrowseAreas extends StatefulWidget {
  BrowseAreas({Key key}) : super(key: key);

  @override
  _BrowseAreas createState() => _BrowseAreas();
}

class _BrowseAreas extends State<BrowseAreas> {
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Browse Areas',
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
