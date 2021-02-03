import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'package:flutter_web_auth/flutter_web_auth.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:imgur/imgur.dart' as imgur;

String authTokenvar = '';
bool isAuthentified = false;
imgur.Imgur clientID;

class ConnectApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<ConnectApp> {
  // ignore: unused_field
  String _status = '';
  String _clientID = '6acf662630ca71d';
  final _callbackUrlScheme = 'com.example.epicture://success';

  @override
  void initState() {
    super.initState();
  }

  void authenticate() async {
    final url = Uri.https('api.imgur.com', '/oauth2/authorize', {
      'response_type': 'token',
      'client_id': _clientID,
      'redirect_uri': _callbackUrlScheme,
    });
    SharedPreferences prefs = await SharedPreferences.getInstance();
    try {
      final result = await FlutterWebAuth.authenticate(
          url: url.toString(), callbackUrlScheme: 'com.example.epicture');
      setState(() {
        var resul2 = result.replaceAll('#', '?');
        var uri = Uri.parse(resul2);
        authTokenvar = uri.queryParameters['access_token'];
        if ((uri.queryParameters['access_token'].isNotEmpty)) {
          isAuthentified = true;
          clientID = imgur.Imgur(imgur.Authentication.fromToken(authTokenvar));
          prefs.setString("clientID", authTokenvar);
          Navigator.of(context).pushReplacementNamed('/home');
        }
      });
    } on PlatformException catch (e) {
      setState(() {
        _status = 'Got error: $e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      type: MaterialType.transparency,
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            AppBar(
              title: Text("Login Page"),
              backgroundColor: Colors.blueGrey,
            ),
            Icon(
              Icons.browser_not_supported,
              size: 60,
              color: Colors.white,
            ),
            Text(
              'You are not logged in :',
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w100,
                fontSize: 35,
              ),
            ),
            const SizedBox(height: 80),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Card(
                  color: Colors.teal[400],
                  child: TextButton(
                    child: Text(
                      'Log In',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 25,
                        fontWeight: FontWeight.w200,
                      ),
                    ),
                    onPressed: () {
                      this.authenticate();
                    },
                  ),
                ),
              ],
            ),
            Padding(padding: EdgeInsets.all(16.0)),
            Text(
              'By logging in you accept the Terms & conditions of imgur found at https://imgur.com/tos',
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w100,
                fontSize: 15,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
