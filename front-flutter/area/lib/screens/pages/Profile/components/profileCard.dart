import 'package:area/constants.dart';
import 'package:flutter/material.dart';
import 'package:area/api/profile.dart';
import 'package:area/components/rounded_input_field.dart';

class ProfileCard extends StatefulWidget {
  @override
  _ProfileCardState createState() => _ProfileCardState();
}

class _ProfileCardState extends State<ProfileCard> {
  @override
  Widget build(BuildContext context) {
    //bool hasChanged = false;
    Size size = MediaQuery.of(context).size;
    return FutureBuilder(
      future: getUserInfo(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
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
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      RoundedInputField(
                        noIcon: true,
                        labelText: "Firstname",
                        sizeModifier: 0.55,
                        controller: TextEditingController(text: snapshot.data['firstname'] != null ? snapshot.data['firstname'] : "unknown"),
                        onChanged: (value) {
                          snapshot.data['firstname'] = value;
                          //hasChanged = true;
                        },
                      ),
                      SizedBox(width: size.width * 0.03),
                      RoundedInputField(
                        noIcon: true,
                        labelText: "Lastname",
                        sizeModifier: 0.55,
                        controller: TextEditingController(text: snapshot.data['lastname'] != null ? snapshot.data['lastname'] : "unknown"),
                        onChanged: (value) {
                          snapshot.data['lastname'] = value;
                          //hasChanged = true;
                        },
                      ),
                    ],
                  ),
                  RoundedInputField(
                    noIcon: true,
                    labelText: "Email",
                    sizeModifier: 1.1,
                    controller: TextEditingController(text: snapshot.data['email'] != null ? snapshot.data['email'] : "unknown"),
                    onChanged: (value) {
                      snapshot.data['email'] = value;
                      //hasChanged = true;
                    },
                  ),
                  RoundedInputField(
                    noIcon: true,
                    labelText: "Username",
                    sizeModifier: 1.1,
                    controller: TextEditingController(text: snapshot.data['username'] != null ? snapshot.data['username'] : "unknown"),
                    onChanged: (value) {
                      snapshot.data['username'] = value;
                      //hasChanged = true;
                    },
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
