import 'package:flutter/material.dart';
import 'package:area/components/rounded_input_field.dart';

class NameCard extends StatefulWidget {
  final Function(String) nameCallback;
  final Function(bool) activateCallback;
  final String initName;
  final bool initActivated;

  const NameCard({
    Key key,
    this.nameCallback,
    this.activateCallback,
    this.initName,
    this.initActivated,
  }) : super(key: key);

  @override
  _NameCardState createState() => _NameCardState();
}

class _NameCardState extends State<NameCard> {
  String name = "";
  bool isSwitched = false;
  TextEditingController controller;

  void initState() {
    super.initState();
    isSwitched = widget.initActivated;
    controller = new TextEditingController(text: widget.initName);
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return SizedBox(
      width: size.width * 0.9,
      height: size.height * 0.13,
      child: Card(
        color: Colors.white,
        elevation: 0.0,
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
            side: BorderSide(
              color: Colors.white,
              width: 2.0,
            )),
        clipBehavior: Clip.antiAlias,
        child: Row(
          children: [
            RoundedInputField(
              noIcon: true,
              labelText: "Area Name",
              sizeModifier: 0.82,
              controller: controller,
              onChanged: (value) {
                setState(() {
                  name = value;
                });
                widget.nameCallback(name);
              },
            ),
            SizedBox(
              width: size.width * 0.02,
            ),
            Transform.scale(
              scale: 1.2,
              child: Switch(
                value: isSwitched,
                onChanged: (value) async {
                  setState(() {
                    isSwitched = value;
                  });
                  widget.activateCallback(value);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
