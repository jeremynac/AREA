import 'package:flutter/material.dart';
import 'package:area/components/text_field_container.dart';
import 'package:area/constants.dart';

class RoundedPasswordField extends StatefulWidget {
  final ValueChanged<String> onChanged;
  final TextEditingController controller;
  final String hintText;

  const RoundedPasswordField({
    Key key,
    this.hintText,
    this.controller,
    this.onChanged,
  }) : super(key: key);

  @override
  _RoundedPasswordFieldState createState() => _RoundedPasswordFieldState();
}

class _RoundedPasswordFieldState extends State<RoundedPasswordField> {
  bool _obscureText = true;

  void toggle() {
    setState(() {
      _obscureText = !_obscureText;
    });
  }

  @override
  Widget build(BuildContext context) {
    return TextFieldContainer(
      child: TextField(
        obscureText: _obscureText,
        onChanged: widget.onChanged,
        cursorColor: kPrimaryColor,
        decoration: InputDecoration(
          hintText: widget.hintText,
          icon: Icon(
            Icons.lock,
            color: kPrimaryColor,
          ),
          suffixIcon: FlatButton(
            onPressed: () {
              toggle();
            },
            child: _obscureText
                ? Icon(
                    Icons.visibility_off,
                    color: kPrimaryColor,
                  )
                : Icon(
                    Icons.visibility,
                    color: kPrimaryColor,
                  ),
          ),
          border: InputBorder.none,
        ),
      ),
    );
  }
}
