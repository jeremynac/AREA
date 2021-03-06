import 'package:area/constants.dart';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:area/api/GlobalNetwork.dart';

class CustomWebView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final Map<String, dynamic> url = ModalRoute.of(context).settings.arguments;
    const String user_agent = 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Mobile Safari/537.36';
    final String finalUrl = urlArea + url['service_url'] + "/" + userID;
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Connecting Service',
          style: TextStyle(
            fontFamily: 'Ubuntu',
            color: Colors.white,
          ),
        ),
        backgroundColor: kPrimaryColor,
      ),
      body: WebView(
        userAgent: user_agent,
        initialUrl: finalUrl,
        javascriptMode: JavascriptMode.unrestricted,
      ),
    );
  }
}
