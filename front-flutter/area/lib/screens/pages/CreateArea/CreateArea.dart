import 'package:flutter/material.dart';
import 'package:area/constants.dart';
import './components/body.dart';

final controller1 = TextEditingController();
final controller2 = TextEditingController();

class CreateArea extends StatefulWidget {
  @override
  _CreateArea createState() => _CreateArea();
}

class _CreateArea extends State<CreateArea> {
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Create Area',
          style: TextStyle(
            fontFamily: 'Ubuntu',
            color: Colors.black,
          ),
        ),
        backgroundColor: kPrimaryLightColor,
      ),
      backgroundColor: Colors.white,
      body: Body(),
    );
  }
}
