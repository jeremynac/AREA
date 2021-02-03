import 'package:epicture/pages/ConnectImgur.dart';
import 'package:flutter/material.dart';
import 'package:imgur/imgur.dart' as imgur;
import 'package:flappy_search_bar/flappy_search_bar.dart';
import 'photoCard.dart';

class Post {
  final String title;
  final String description;

  Post(this.title, this.description);
}

class SearchCart extends StatelessWidget {
  Future<List<imgur.GalleryAlbumImage>> search(String search) async {
    List<imgur.GalleryAlbumImage> srch = await clientID.gallery.search(search);
    return srch;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: SearchBar<imgur.GalleryAlbumImage>(
            onSearch: search,
            onItemFound: (imgur.GalleryAlbumImage post, int index) {
              return Column(children: <Widget>[
                if (post.images != null &&
                    (post.images[0].type == "image/png" ||
                        post.images[0].type == "image/jpeg" ||
                        post.images[0].type == "video/mp4"))
                  SimplePhotoViewAlbumGalleryImage(post),
              ]);
            },
          ),
        ),
      ),
    );
  }
}
