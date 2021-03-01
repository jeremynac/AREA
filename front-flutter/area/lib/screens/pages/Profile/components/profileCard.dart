import 'package:flutter/material.dart';
import 'package:area/api/profile.dart';
import 'package:area/constants.dart';

class ProfileCard extends StatefulWidget {
  @override
  _ProfileCardState createState() => _ProfileCardState();
}

class _ProfileCardState extends State<ProfileCard> {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: getUserInfo(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          Size size = MediaQuery.of(context).size;
          return Card(
            color: kPrimaryLightColor,
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15.0),
                side: BorderSide(
                  color: kPrimaryColor,
                  width: 2.0,
                )),
            clipBehavior: Clip.antiAlias,
            borderOnForeground: true,
            child: Padding(
              padding:
                  EdgeInsets.only(top: 0, left: 6.0, right: 6.0, bottom: 6.0),
              child: Row(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "Firstname :  " + snapshot.data['firstname'],
                        style: TextStyle(
                          fontFamily: 'Ubuntu',
                          color: Colors.black,
                        ),
                      ),
                      Text(
                        "Lastname  : " + snapshot.data['lastname'],
                        style: TextStyle(
                          fontFamily: 'Ubuntu',
                          color: Colors.black,
                        ),
                      ),
                      Text(
                        "Username  : " + snapshot.data['username'],
                        style: TextStyle(
                          fontFamily: 'Ubuntu',
                          color: Colors.black,
                        ),
                      ),
                      Text(
                        "Email           : " + snapshot.data['email'],
                        style: TextStyle(
                          fontFamily: 'Ubuntu',
                          color: Colors.black,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          );
        } else if (snapshot.hasError) {
          throw snapshot.error;
        } else {
          return Center(child: CircularProgressIndicator());
        }
      },
    );
  }
}
