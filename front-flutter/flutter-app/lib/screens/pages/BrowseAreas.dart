import 'package:flutter/material.dart';

class BrowseAreas extends StatefulWidget {
  BrowseAreas({Key key}) : super(key: key);

  @override
  _BrowseAreas createState() => _BrowseAreas();
}

class _BrowseAreas extends State<BrowseAreas> {
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Browse Areas', style: TextStyle(fontFamily: 'Ubuntu')),
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
