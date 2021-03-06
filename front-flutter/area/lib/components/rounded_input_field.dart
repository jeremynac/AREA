import 'package:flutter/material.dart';
import 'package:area/components/text_field_container.dart';
import 'package:area/constants.dart';

class RoundedInputField extends StatelessWidget {
  final String hintText;
  final IconData icon;
  final bool noIcon;
  final String labelText;
  final double sizeModifier;
  final ValueChanged<String> onChanged;
  final TextEditingController controller;

  const RoundedInputField({
    Key key,
    this.hintText,
    this.labelText,
    this.sizeModifier = 1,
    this.controller,
    this.icon = Icons.person,
    this.noIcon = false,
    this.onChanged,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFieldContainer(
      sizeModifier: sizeModifier,
      child: TextField(
        onChanged: onChanged,
        cursorColor: kPrimaryColor,
        controller: controller,
        decoration: InputDecoration(
          icon: noIcon
              ? null
              : Icon(
                  icon,
                  color: kPrimaryColor,
                ),
          hintText: hintText,
          labelText: labelText,
          border: InputBorder.none,
        ),
      ),
    );
  }
}
