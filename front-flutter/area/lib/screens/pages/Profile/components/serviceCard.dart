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
              Image.network(
                ((data['service']['img'] != null) ? data['service']['img'] : 'https://cdn.discordapp.com/attachments/798160246794354688/813858802045681664/Area.png'),
                height: 45,
                width: 55,
              ),
              SizedBox(),
              Text(
                (data['connected'] == true ? "Account Linked" : "Not connected"),
                style: TextStyle(
                  fontFamily: 'Ubuntu',
                  color: data['connected'] ? Colors.green : Colors.black,
                ),
              ),
            ],
          ),
          children: [
            if (data['connected'] == false && data['service']['service_url'] != null)
              FlatButton(
                onPressed: () {
                  print(data);
                  Navigator.pushNamed(
                    context,
                    '/web',
                    arguments: (data['service']),
                  );
                },
                child: Image.network(
                  data['service']['loginIcn'],
                ),
              ),
          ],
        ),
      ),
    );
  }
}
