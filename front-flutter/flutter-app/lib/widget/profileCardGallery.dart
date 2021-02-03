import 'package:epicture/widget/photoCard.dart';
import 'package:flutter/material.dart';
import 'package:imgur/imgur.dart' as imgur;
import '../pages/ConnectImgur.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// This is the stateful widget that the main application instantiates.
class ProfileCardGallery extends StatefulWidget {
  ProfileCardGallery({Key key}) : super(key: key);

  @override
  _ProfileCardGallery createState() => _ProfileCardGallery();
}

/// This is the private State class that goes with ScrollCardGallery.
class _ProfileCardGallery extends State<ProfileCardGallery> {
  Widget build(BuildContext context) {
    return FutureBuilder<List<imgur.Image>>(
      future: clientID.account.getImages(),
      builder:
          (BuildContext context, AsyncSnapshot<List<imgur.Image>> snapshot) {
        switch (snapshot.connectionState) {
          case ConnectionState.none:
          case ConnectionState.waiting:
            return new Text('loading...');
          default:
            if (snapshot.hasError)
              return new Text('Error: ${snapshot.error}');
            else
              return Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  AppBar(
                    backgroundColor: Colors.blueGrey,
                    title: Text(
                      "My Images",
                      style:
                          TextStyle(color: Colors.black, fontFamily: "Ubuntu"),
                    ),
                    actions: [
                      FlatButton(
                        onPressed: () async {
                          SharedPreferences prefs =
                              await SharedPreferences.getInstance();
                          authTokenvar = null;
                          prefs.remove("clientID");
                          Navigator.of(context).pushReplacementNamed('/login');
                        },
                        child: Column(
                          children: [
                            Padding(padding: EdgeInsets.all(4.0)),
                            Icon(Icons.account_circle_sharp),
                            Text('Log out'),
                          ],
                        ),
                      )
                    ],
                  ),
                  new Expanded(
                    child: ListView(
                      scrollDirection: Axis.vertical,
                      addAutomaticKeepAlives: true,
                      children: <Widget>[
                        for (var i in snapshot.data)
                          if (i.type == "image/png" ||
                              i.type == "image/jpeg" ||
                              i.type == "video/mp4")
                            SimplePhotoViewProfile(i),
                      ],
                    ),
                  ),
                ],
              );
        }
      },
    );
  }
}
