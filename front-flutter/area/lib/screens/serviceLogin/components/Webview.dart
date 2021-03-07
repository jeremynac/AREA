// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// ignore_for_file: public_member_api_docs

import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:webview_cookie_manager/webview_cookie_manager.dart';
import 'package:webview_flutter/webview_flutter.dart';

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
  final String _url = 'https://youtube.com';
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
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Plugin example app'),
          actions: [
            IconButton(
              icon: Icon(Icons.ac_unit),
              onPressed: () async {
                // TEST CODE
                await cookieManager.getCookies(null);
              },
            )
          ],
        ),
        body: WebView(
          userAgent:
              "Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30",
          initialUrl: baseUrl,
          javascriptMode: JavascriptMode.unrestricted,
          onWebViewCreated: (controller) async {
          },
          onPageFinished: (_) async {
            final gotCookies = await cookieManager.getCookies("https://area.gen-host.fr");
            print("COOKIE");
            for (var item in gotCookies) {
              print(item);
            }
            print("ENDCOOKIE");
          },
        ),
      ),
    );
  }
}