import 'package:epicture/pages/ConnectImgur.dart';
import 'package:flutter/material.dart';
import 'package:imgur/imgur.dart' as imgur;

// ignore: must_be_immutable
class SimplePhotoViewProfile extends StatelessWidget {
  int index = 0;
  var imageNet;

  SimplePhotoViewProfile(var input) {
    this.imageNet = input;
    debugPrint("Loaded one Image");
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        Card(
          color: Colors.blueGrey[800],
          elevation: 5,
          margin: EdgeInsets.all(10),
          semanticContainer: true,
          clipBehavior: Clip.antiAliasWithSaveLayer,
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(15.0)),
          borderOnForeground: true,
          child: Column(
            children: <Widget>[
              Padding(padding: EdgeInsets.all(4.0)),
              if (imageNet.title != null)
                Text(
                  imageNet.title,
                  style: TextStyle(color: Colors.white, fontFamily: "Ubuntu"),
                ),
              Padding(padding: EdgeInsets.all(6.0)),
              if (imageNet.type != "video/mp4")
                Image.network(
                  imageNet.link,
                  fit: BoxFit.fill,
                ),
              if (imageNet.type == "video/mp4")
                Image.network(
                  imageNet.gifv.substring(0, imageNet.gifv.length - 1),
                  fit: BoxFit.fill,
                ),
              UpVoteOptionsNoLikes(imageNet)
            ],
          ),
        ),
      ],
    );
  }
}

// ignore: must_be_immutable
class SimplePhotoViewAlbumGalleryImage extends StatelessWidget {
  int index = 0;
  imgur.GalleryAlbumImage imageNet;

  SimplePhotoViewAlbumGalleryImage(var input) {
    this.imageNet = input;
    debugPrint("Loaded one Image");
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        Card(
          color: Colors.blueGrey[800],
          elevation: 5,
          margin: EdgeInsets.all(10),
          semanticContainer: true,
          clipBehavior: Clip.antiAliasWithSaveLayer,
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(15.0)),
          borderOnForeground: true,
          child: Column(
            children: <Widget>[
              Padding(padding: EdgeInsets.all(4.0)),
              Text(
                imageNet.title,
                style: TextStyle(fontFamily: 'Ubuntu', color: Colors.white),
              ),
              Padding(padding: EdgeInsets.all(6.0)),
              if (imageNet.images[0].type != "video/mp4")
                Image.network(
                  imageNet.images[0].link,
                  fit: BoxFit.fill,
                ),
              if (imageNet.images[0].type == "video/mp4")
                Image.network(
                  imageNet.images[0].gifv
                      .substring(0, imageNet.images[0].gifv.length - 1),
                  fit: BoxFit.fill,
                ),
              UpVoteOptionsLikes(imageNet),
            ],
          ),
        ),
      ],
    );
  }
}

// ignore: must_be_immutable
class UpVoteOptionsLikes extends StatelessWidget {
  var imgurImage;
  int views;

  UpVoteOptionsLikes(var input) {
    this.imgurImage = input;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            UpvoteButton(img: imgurImage),
            DownvoteButton(img: imgurImage),
            FavButton(img: imgurImage),
          ],
        ),
      ],
    );
  }
}

// ignore: must_be_immutable
class UpVoteOptionsNoLikes extends StatelessWidget {
  var imgurImage;

  int _views;
  String viewsString;
  // ignore: unused_field
  bool _isfav;

  UpVoteOptionsNoLikes(var input) {
    imgurImage = input;
    _views = imgurImage.views;
    _isfav = imgurImage.favorite;
    debugPrint('Image views:');
    debugPrint(_views.toString());
    viewsString = _views.toString();
    if (_views > 999) {
      viewsString = viewsString.substring(0, viewsString.length - 3);
      viewsString += 'k';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            Row(
              children: [
                IconButton(
                  icon: Icon(
                    Icons.remove_red_eye_outlined,
                    color: Colors.white,
                  ),
                  onPressed: () {
                    debugPrint('Views button');
                  },
                ),
                Text(
                  viewsString,
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
              ],
            ),
            FavButton2(img: imgurImage),
          ],
        ),
      ],
    );
  }
}

class FavButton2 extends StatefulWidget {
  final imgur.Image img;
  FavButton2({Key key, this.img}) : super(key: key);
  @override
  FavButtonState2 createState() => FavButtonState2(this.img);
}

class FavButtonState2 extends State<StatefulWidget> {
  Color _iconColor = Colors.white;
  bool _isfav = false;
  imgur.Image img;
  FavButtonState2(imgur.Image input) {
    this.img = input;
    this._isfav = input.favorite;
    if (_isfav) _iconColor = Colors.yellow;
  }
  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: Icon(Icons.star, color: _iconColor),
      onPressed: () {
        _isfav = !_isfav;
        if (_isfav)
          setState(() {
            _iconColor = Colors.yellow;
            clientID.image.favorite(
              img.id,
            );
          });
        if (!_isfav)
          setState(() {
            _iconColor = Colors.white;
            clientID.image.favorite(
              img.id,
            );
          });
      },
    );
  }
}

class FavButton extends StatefulWidget {
  final imgur.GalleryAlbumImage img;
  FavButton({Key key, this.img}) : super(key: key);
  @override
  FavButtonState createState() => FavButtonState(this.img);
}

class FavButtonState extends State<StatefulWidget> {
  Color _iconColor = Colors.white;
  bool _isfav = false;
  imgur.GalleryAlbumImage img;
  FavButtonState(imgur.GalleryAlbumImage input) {
    this.img = input;
    this._isfav = input.favorite;
    if (_isfav) _iconColor = Colors.yellow;
  }
  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: Icon(Icons.star, color: _iconColor),
      onPressed: () {
        _isfav = !_isfav;
        if (_isfav)
          setState(() {
            _iconColor = Colors.yellow;
            clientID.album.favorite(
              img.id,
            );
          });
        if (!_isfav)
          setState(() {
            _iconColor = Colors.white;
            clientID.album.favorite(
              img.id,
            );
          });
      },
    );
  }
}

class UpvoteButton extends StatefulWidget {
  final imgur.GalleryAlbumImage img;
  UpvoteButton({Key key, this.img}) : super(key: key);
  @override
  UpvoteButtonState createState() => UpvoteButtonState(this.img);
}

class UpvoteButtonState extends State<StatefulWidget> {
  Color _iconColor = Colors.white;
  bool _isupvoted = false;
  int plusone = 0;
  imgur.GalleryAlbumImage img;

  UpvoteButtonState(imgur.GalleryAlbumImage input) {
    this.img = input;
    this._isupvoted = (img.vote == imgur.VoteType.up);
    if (_isupvoted) {
      _iconColor = Colors.lightGreen;
      plusone = 1;
    }
  }

  String stringyfy(int input) {
    String result = input.toString();
    if (input > 999) {
      result = result.substring(0, result.length - 3);
      result += 'k';
    }
    return result;
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        IconButton(
          icon: Icon(Icons.arrow_upward_rounded, color: _iconColor),
          onPressed: () {
            _isupvoted = !_isupvoted;
            if (_isupvoted)
              setState(() {
                _iconColor = Colors.lightGreen;
                plusone += 1;
                clientID.album.vote(img.id, imgur.VoteType.up);
              });
            if (!_isupvoted)
              setState(() {
                _iconColor = Colors.white;
                plusone -= 1;
                clientID.album.vote(img.id, imgur.VoteType.veto);
              });
          },
        ),
        Text(
          stringyfy(img.ups + plusone),
          style: TextStyle(color: _iconColor),
        ),
      ],
    );
  }
}

class DownvoteButton extends StatefulWidget {
  final imgur.GalleryAlbumImage img;
  DownvoteButton({Key key, this.img}) : super(key: key);
  @override
  DownvoteButtonState createState() => DownvoteButtonState(this.img);
}

class DownvoteButtonState extends State<StatefulWidget> {
  Color _iconColor = Colors.white;
  bool _isdownvoted = false;
  int plusone = 0;
  imgur.GalleryAlbumImage img;

  DownvoteButtonState(imgur.GalleryAlbumImage input) {
    this.img = input;
    this._isdownvoted = (img.vote == imgur.VoteType.down);
    if (_isdownvoted) {
      _iconColor = Colors.red;
      plusone = -1;
    }
  }

  String stringyfy(int input) {
    String result = input.toString();
    if (input > 999) {
      result = result.substring(0, result.length - 3);
      result += 'k';
    }
    return result;
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        IconButton(
          icon: Icon(Icons.arrow_downward_rounded, color: _iconColor),
          onPressed: () {
            _isdownvoted = !_isdownvoted;
            if (_isdownvoted)
              setState(() {
                _iconColor = Colors.red;
                plusone -= 1;
                clientID.album.vote(img.id, imgur.VoteType.down);
              });
            if (!_isdownvoted)
              setState(() {
                _iconColor = Colors.white;
                plusone += 1;
                clientID.album.vote(img.id, imgur.VoteType.veto);
              });
          },
        ),
        Text(
          stringyfy(img.downs + plusone),
          style: TextStyle(color: _iconColor),
        ),
      ],
    );
  }
}
