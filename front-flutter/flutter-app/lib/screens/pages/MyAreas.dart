import 'package:flutter/material.dart';

class MyAreas extends StatefulWidget {
  MyAreas({Key key}) : super(key: key);

  @override
  _MyAreas createState() => _MyAreas();
}

class _MyAreas extends State<MyAreas> {
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My Areas', style: TextStyle(fontFamily: 'Ubuntu')),
        backgroundColor: Colors.blueGrey,
      ),
      backgroundColor: Colors.grey[850],
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[],
      ),
    );
  }
}
