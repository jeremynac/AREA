import 'package:flutter/material.dart';
import 'package:area/screens/Welcome/components/body.dart';
import 'package:area/api/auth.dart';

class WelcomeScreen extends StatelessWidget {
  void checkForAuth(context) async {
    if (await isAuth() == true)
      Navigator.of(context)
          .pushNamedAndRemoveUntil('/app', (Route<dynamic> route) => false);
  }

  WelcomeScreen({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    checkForAuth(context);
    return Scaffold(
      body: Body(),
    );
  }
}
