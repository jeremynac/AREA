import 'package:flutter/material.dart';
import 'package:area/components/rounded_input_field.dart';

class DynamicForm extends StatefulWidget {
  final Function(Map<String, dynamic>) callback;

  const DynamicForm({
    Key key,
    this.data,
    this.callback,
  });

  final List<dynamic> data;

  @override
  _DynamicFormState createState() => _DynamicFormState();
}

class _DynamicFormState extends State<DynamicForm> {
  Map<String, dynamic> parameters = {};
  //final TextEditingController test = new TextEditingController();
  Map<String, TextEditingController> textEditControllers = {};

  void initState() {
    super.initState();
    for (var i = 0; i < widget.data.length; i++) parameters[widget.data[i]['name']] = ((widget.data[i]['type'] == "String") ? "" : false);
    for (var i = 0; i < widget.data.length; i++) if (widget.data[i]['type'] == "String") textEditControllers[widget.data[i]['name']] = new TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Column(
      children: [
        for (var i = 0; i < widget.data.length; i++)
          // TO FIX space after Boolean
          if (widget.data[i]['type'] == "String")
            RoundedInputField(
              noIcon: true,
              labelText: widget.data[i]['name'],
              sizeModifier: 0.8,
              controller: textEditControllers[widget.data[i]['name']],
              onChanged: (value) {
                setState(() {
                  parameters[widget.data[i]['name']] = value;
                });
                widget.callback(parameters);
              },
            )
          else
            SizedBox(
              width: size.width * 0.6,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(widget.data[i]['name']),
                  Switch(
                    value: parameters[widget.data[i]['name']],
                    onChanged: (bool newValue) {
                      setState(() {
                        parameters[widget.data[i]['name']] = newValue;
                      });
                      widget.callback(parameters);
                    },
                  )
                ],
              ),
            ),
      ],
    );
  }
}
