import 'package:area/constants.dart';

import 'screens/Welcome/welcome_screen.dart';
import 'package:flutter/material.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AreaMobile',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: kPrimaryColor,
        scaffoldBackgroundColor: Colors.white,
      ),
      home: WelcomeScreen(),
    );
  }
}

void main() async {
  // Set default home.
  WidgetsFlutterBinding.ensureInitialized();
  Widget _defaultHome;
  _defaultHome = new WelcomeScreen();

  // Run app!
  runApp(new MaterialApp(
    title: 'App',
    home: _defaultHome,
    debugShowCheckedModeBanner: false,
    routes: <String, WidgetBuilder>{
      // Set routes for using the Navigator.
      '/home': (BuildContext context) => new WelcomeScreen()
    },
  ));
}
