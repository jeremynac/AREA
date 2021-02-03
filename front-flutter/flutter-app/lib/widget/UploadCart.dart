import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../pages/ConnectImgur.dart';

final controller1 = TextEditingController();
final controller2 = TextEditingController();

class UploadPage extends StatefulWidget {
  @override
  _UploadPage createState() => _UploadPage();
}

class _UploadPage extends State<UploadPage> {
  File _image;
  var _path;
  final picker = ImagePicker();

  Future getImage() async {
    final pickedFile = await picker.getImage(source: ImageSource.gallery);

    setState(() {
      if (pickedFile != null) {
        _image = File(pickedFile.path);
        _path = pickedFile.path;
        print('Image selected');
      }
    });
  }

  Future getCameraImage() async {
    final pickedFile = await picker.getImage(source: ImageSource.camera);

    setState(() {
      if (pickedFile != null) {
        _image = File(pickedFile.path);
        _path = pickedFile.path;
        print('Image selected');
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Upload'),
        backgroundColor: Colors.blueGrey,
      ),
      backgroundColor: Colors.grey[850],
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          MyCustomForm(),
          FlatButton(
            onPressed: getImage,
            child: Card(
              color: Colors.blue,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Icon(Icons.add_photo_alternate),
                  Text(
                    'Pick Image',
                    style: TextStyle(
                      fontFamily: 'Ubuntu',
                      color: Colors.black,
                      fontSize: 25,
                    ),
                  ),
                ],
              ),
            ),
          ),
          FlatButton(
            onPressed: getCameraImage,
            child: Card(
              color: Colors.blue,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Icon(Icons.photo_camera),
                  Text(
                    'Take Picture',
                    style: TextStyle(
                      fontFamily: 'Ubuntu',
                      color: Colors.black,
                      fontSize: 25,
                    ),
                  ),
                ],
              ),
            ),
          ),
          Container(
            height: MediaQuery.of(context).size.height * 0.5,
            child: _image == null
                ? Text(
                    '',
                    style: TextStyle(
                      fontFamily: 'Ubuntu',
                      color: Colors.white,
                      fontSize: 25,
                    ),
                  )
                : Container(
                    child: Image.file(_image),
                  ),
          ),
        ],
      ),
      floatingActionButton: (_image != null)
          ? FloatingActionButton(
              onPressed: () {
                clientID.image.uploadImage(
                    imagePath: _path,
                    title: controller1.text,
                    description: controller2.text);
              },
              tooltip: 'Pick Image',
              child: Icon(Icons.file_upload),
            )
          : Text(''),
    );
  }
}

// Create a Form widget.
class MyCustomForm extends StatefulWidget {
  @override
  MyCustomFormState createState() {
    return MyCustomFormState();
  }
}

// Create a corresponding State class.
// This class holds data related to the form.
class MyCustomFormState extends State<MyCustomForm> {
  // Create a global key that uniquely identifies the Form widget
  // and allows validation of the form.
  //
  // Note: This is a GlobalKey<FormState>,
  // not a GlobalKey<MyCustomFormState>.
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    // Build a Form widget using the _formKey created above.
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Card(
            color: Colors.grey,
            child: TextFormField(
              decoration: InputDecoration(
                hintText: 'Title',
                hintStyle: TextStyle(
                  fontFamily: 'Ubuntu',
                  fontSize: 20,
                ),
              ),
              controller: controller1,
              validator: (value) {
                if (value.isEmpty) {
                  return 'No Title';
                }
                return null;
              },
            ),
          ),
          Card(
            color: Colors.grey,
            child: TextFormField(
              decoration: InputDecoration(
                hintText: 'Description',
                hintStyle: TextStyle(
                  fontFamily: 'Ubuntu',
                  fontSize: 20,
                ),
              ),
              controller: controller2,
              validator: (value) {
                if (value.isEmpty) {
                  return 'No Description';
                }
                return null;
              },
            ),
          ),
          Padding(padding: EdgeInsets.all(5.0)),
        ],
      ),
    );
  }
}
