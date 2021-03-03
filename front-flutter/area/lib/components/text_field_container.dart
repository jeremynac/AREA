import 'package:flutter/material.dart';
import 'package:area/constants.dart';

class TextFieldContainer extends StatelessWidget {
  final Widget child;
  final double sizeModifier;

  const TextFieldContainer({
    Key key,
    this.child,
    this.sizeModifier = 1,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      margin: EdgeInsets.symmetric(vertical: 10),
      padding: EdgeInsets.symmetric(horizontal: 20, vertical: 5),
      width: size.width * 0.8 * sizeModifier,
      decoration: BoxDecoration(
        color: kPrimaryLightColor,
        borderRadius: BorderRadius.circular(29),
      ),
      child: child,
    );
  }
}
