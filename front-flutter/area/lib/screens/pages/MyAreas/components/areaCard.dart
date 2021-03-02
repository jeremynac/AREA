import 'package:flutter/material.dart';
import 'package:area/constants.dart';
/* import 'package:webview_flutter/webview_flutter.dart';
import '../CustomWebView.dart'; */

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
          color: kPrimaryColor,
          width: 2.0,
        ),
      ),
      clipBehavior: Clip.antiAlias,
      borderOnForeground: true,
      child: Padding(
        padding: EdgeInsets.only(top: 0, left: 6.0, right: 6.0, bottom: 6.0),
        child: ExpansionTile(
          title: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text("Name here"),
            ],
          ),
          children: [
            Text("Arguments:"),
          ],
        ),
      ),
    );
  }
}
