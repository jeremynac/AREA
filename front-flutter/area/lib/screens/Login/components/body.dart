import 'package:flutter/material.dart';
import 'package:area/screens/Login/components/background.dart';
import 'package:area/screens/Signup/signup_screen.dart';
import 'package:area/components/already_have_an_account_acheck.dart';
import 'package:area/components/rounded_button.dart';
import 'package:area/components/rounded_input_field.dart';
import 'package:area/components/rounded_password_field.dart';
import 'package:area/api/auth.dart';
import 'package:flutter_svg/svg.dart';

//ignore: must_be_immutable
class Body extends StatelessWidget {
  String email;
  String password;

  Body({
    Key key,
    this.email,
    this.password,
  }) : super(key: key);

  errorLoginAlertDialog(BuildContext context) {
    return showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text("Invalid username or password"),
          content: Icon(
            Icons.block,
            color: Colors.redAccent,
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Background(
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              "LOGIN",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            SizedBox(height: size.height * 0.03),
            SvgPicture.asset(
              "assets/icons/Area.svg",
              height: size.height * 0.35,
            ),
            SizedBox(height: size.height * 0.03),
            RoundedInputField(
              hintText: "Username",
              onChanged: (value) {
                email = value;
              },
            ),
            RoundedPasswordField(
              hintText: "Password",
              onChanged: (value) {
                password = value;
              },
            ),
            RoundedButton(
              text: "LOGIN",
              press: () async {
                bool loggedin = await fetchLogin(email, password);
                if (loggedin)
                  Navigator.of(context).pushNamedAndRemoveUntil(
                      '/app', (Route<dynamic> route) => false);
                else
                  errorLoginAlertDialog(context);
              },
            ),
            SizedBox(height: size.height * 0.03),
            AlreadyHaveAnAccountCheck(
              press: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return SignUpScreen();
                    },
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
