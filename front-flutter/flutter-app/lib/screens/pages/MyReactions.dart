import 'package:flutter/material.dart';

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
        title: Text('My Reactions', style: TextStyle(fontFamily: 'Ubuntu')),
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
