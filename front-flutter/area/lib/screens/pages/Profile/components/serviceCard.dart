import 'package:flutter/material.dart';
import 'package:area/constants.dart';
/* import 'package:webview_flutter/webview_flutter.dart';
import '../CustomWebView.dart'; */

class ServiceCard extends StatelessWidget {
  final String text;
  final Map<String, dynamic> data;
  final Function press;
  final Color color, textColor;

  const ServiceCard({
    Key key,
    this.text,
    this.press,
    this.data,
    this.color = kPrimaryColor,
    this.textColor = Colors.white,
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
                  data['connected'] ? "Account Linked" : "Not connected",
                  style: TextStyle(
                    fontFamily: 'Ubuntu',
                    color: data['connected'] ? Colors.green : Colors.black,
                  ),
                ),
              ],
            ),
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  if (data['service']['type'] == "google")
                    FlatButton(
                      onPressed: () {
                        Navigator.pushNamed(
                          context,
                          '/web',
                          arguments: "/auth/go-login/601951238d07f000145f2e99",
                        );
                        //Navigator.of(context).pushNamed('/web');
                      },
                      child: Image.network(
                        "https://cdn.discordapp.com/attachments/798160246794354688/816004458340286514/btn_google_signin_dark_focus_web.png",
                      ),
                    ),
                  if (data['connected'] == false && data['service']['loginIcn'] != null)
                    FlatButton(
                      onPressed: () {
                        Navigator.pushNamed(
                          context,
                          '/web',
                          arguments: (data['service']['service_url']),
                        );
                        //Navigator.of(context).pushNamed('/web');
                      },
                      child: Image.network(
                        data['service']['loginIcn'],
                      ),
                    ),
                ],
              ),
            ],
          ),
        ));
  }
}
