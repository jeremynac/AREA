import 'package:area/constants.dart';
import 'package:flutter/material.dart';
import './components/body.dart';

class ServiceLoginScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Login in with Social',
          style: TextStyle(
            fontFamily: 'Ubuntu',
            color: Colors.white,
          ),
        ),
        backgroundColor: kPrimaryColor,
      ),
      body: Body(),
    );
  }
}
