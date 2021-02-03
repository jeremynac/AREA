import 'package:epicture/widget/photoCard.dart';
import 'package:flutter/material.dart';
import 'package:imgur/imgur.dart' as imgur;
import '../pages/ConnectImgur.dart';

/// This is the stateful widget that the main application instantiates.
class LikesCardGallery extends StatefulWidget {
  LikesCardGallery({Key key}) : super(key: key);

  @override
  _LikesCardGallery createState() => _LikesCardGallery();
}

/// This is the private State class that goes with ScrollCardGallery.
class _LikesCardGallery extends State<LikesCardGallery> {
  Widget build(BuildContext context) {
    return FutureBuilder<List<imgur.GalleryAlbumImage>>(
      future: clientID.account.getFavoriteGalleries(),
      builder: (BuildContext context,
          AsyncSnapshot<List<imgur.GalleryAlbumImage>> snapshot) {
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
                    title: Text("Favorites",
                        style: TextStyle(fontFamily: 'Ubuntu')),
                    backgroundColor: Colors.blueGrey,
                  ),
                  new Expanded(
                    child: ListView(
                      scrollDirection: Axis.vertical,
                      addAutomaticKeepAlives: true,
                      children: <Widget>[
                        for (var i in snapshot.data)
                          if (i.images != null &&
                              (i.images[0].type == "image/png" ||
                                  i.images[0].type == "image/jpeg" ||
                                  i.images[0].type == "video/mp4"))
                            SimplePhotoViewAlbumGalleryImage(i)
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
