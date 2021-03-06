import 'package:area/constants.dart';
import 'package:flutter/material.dart';
import 'package:area/api/profile.dart';
import 'package:area/components/rounded_input_field.dart';

class ProfileCard extends StatefulWidget {
  @override
  _ProfileCardState createState() => _ProfileCardState();
}

class _ProfileCardState extends State<ProfileCard> {
  String username;
  bool hasChanged = false;

  errorEditDialog(BuildContext context) {
    return showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text("There was an error"),
          content: Icon(
            Icons.block,
            color: Colors.redAccent,
          ),
        );
      },
    );
  }

  successEditDialog(BuildContext context) {
    return showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text("Username updated"),
          content: Icon(
            Icons.check,
            color: Colors.greenAccent,
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return FutureBuilder(
      future: getUserInfo(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          username = snapshot.data['username'];
          return Card(
            color: Colors.white,
            elevation: 0.0,
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15.0),
                side: BorderSide(
                  color: Colors.white,
                  width: 2.0,
                )),
            clipBehavior: Clip.antiAlias,
            child: Padding(
              padding: EdgeInsets.only(top: 0, left: 6.0, right: 6.0, bottom: 6.0),
              child: Column(
                children: [
                  RoundedInputField(
                    noIcon: true,
                    labelText: "Username",
                    sizeModifier: 1.1,
                    controller: TextEditingController(text: snapshot.data['username'] != null ? snapshot.data['username'] : "unknown"),
                    onChanged: (value) {
                      username = value;
                    },
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Transform.scale(
                        scale: 0.8,
                        child: Container(
                          margin: EdgeInsets.symmetric(vertical: 10),
                          width: size.width * 0.3,
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(29),
                            child: FlatButton(
                              padding: EdgeInsets.symmetric(vertical: 20, horizontal: 40),
                              color: kPrimaryLightColor,
                              shape: RoundedRectangleBorder(side: BorderSide(color: kPrimaryColor, width: 2, style: BorderStyle.solid), borderRadius: BorderRadius.circular(50)),
                              onPressed: () async {
                                bool success = await postUpdateUserInfo(username);
                                if (!success)
                                  errorEditDialog(context);
                                else
                                  successEditDialog(context);
                              },
                              child: Text(
                                "Edit",
                                style: TextStyle(color: Colors.black),
                              ),
                            ),
                          ),
                        ),
                      ),
                      SizedBox(
                        width: size.width * 0.01,
                      )
                    ],
                  ),
                  Divider(
                    color: kSecondayColor,
                    height: 20,
                    thickness: 3,
                    indent: 5,
                    endIndent: 0,
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
