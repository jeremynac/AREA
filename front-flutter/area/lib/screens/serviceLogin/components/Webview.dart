import 'package:area/constants.dart';
import 'package:flutter/material.dart';
import 'package:webview_cookie_manager/webview_cookie_manager.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:area/api/auth.dart';

class WebViewLogin extends StatefulWidget {
  final String baseUrl;
  const WebViewLogin({
    Key key,
    this.baseUrl,
  }) : super(key: key);
  @override
  _MyAppState createState() => _MyAppState(baseUrl);
}

class _MyAppState extends State<WebViewLogin> {
  final cookieManager = WebviewCookieManager();
  final String baseUrl;
  final String cookieValue = 'some-cookie-value';
  final String domain = 'youtube.com';
  final String cookieName = 'connect.sid';

  _MyAppState(this.baseUrl);

  @override
  void initState() {
    super.initState();
    cookieManager.clearCookies();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: kPrimaryColor,
        title: const Text('Login with Social'),
      ),
      body: WebView(
        userAgent: "Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
        initialUrl: baseUrl,
        javascriptMode: JavascriptMode.unrestricted,
        onWebViewCreated: (controller) async {},
        onPageFinished: (_) async {
          final gotCookies = await cookieManager.getCookies("https://area.gen-host.fr");
          SharedPreferences prefs = await SharedPreferences.getInstance();
          for (var item in gotCookies) {
            prefs.setString('cookie', item.toString().split(';')[0]);
            print("test00");
            print(prefs.getString('cookie'));
            print("test01");
            bool isAuthbis = await isAuth();
            if (gotCookies != null && isAuthbis)
              Navigator.of(context).pushNamedAndRemoveUntil('/app', (Route<dynamic> route) => false);
            else {
              print("FAILED");
            }
          }
        },
      ),
    );
  }
}
