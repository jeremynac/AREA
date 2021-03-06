import 'package:area/constants.dart';
import './components/body.dart';
import 'package:flutter/material.dart';

class EditArea extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final String id = ModalRoute.of(context).settings.arguments;
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Edit Area',
          style: TextStyle(
            fontFamily: 'Ubuntu',
            color: Colors.white,
          ),
        ),
        backgroundColor: kPrimaryColor,
      ),
      body: Body(
        id: id,
      ),
    );
  }
}
