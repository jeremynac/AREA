import 'package:flutter/material.dart';
import 'package:area/constants.dart';
import './Webview.dart';
import 'package:area/api/GlobalNetwork.dart';

class ServiceCard extends StatelessWidget {
  final Map<String, dynamic> data;

  const ServiceCard({
    Key key,
    this.data,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      color: kPrimaryLightColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15.0),
        side: BorderSide(
          color: Colors.white,
          width: 2.0,
        ),
      ),
      clipBehavior: Clip.antiAlias,
      borderOnForeground: true,
      child: Padding(
        padding: EdgeInsets.only(top: 0, left: 6.0, right: 6.0, bottom: 6.0),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Image.network(
                  ((data['img'] != null)
                      ? data['img']
                      : 'https://cdn.discordapp.com/attachments/798160246794354688/813858802045681664/Area.png'),
                  height: 45,
                  width: 55,
                ),
                SizedBox(),
                Text(
                  ("Connect with: " + data['name']),
                  style: TextStyle(
                    fontFamily: 'Ubuntu',
                    color: Colors.black,
                  ),
                ),
              ],
            ),
            FlatButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return WebViewLogin(
                          baseUrl: urlArea + data['service_url'] + "/0");
                    },
                  ),
                );
              },
              child: Image.network(
                data['loginIcn'],
                width: 250,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
