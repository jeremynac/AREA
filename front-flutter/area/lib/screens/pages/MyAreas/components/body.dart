import 'package:area/api/scripts.dart';
import 'package:flutter/material.dart';
import './areaCard.dart';

class Body extends StatefulWidget {
  const Body({
    Key key,
  }) : super(key: key);

  @override
  _BodyState createState() => _BodyState();
}

//ignore: must_be_immutable
class _BodyState extends State<Body> {
  Future<List<AreaCard>> widgetList;

  @override
  void initState() {
    super.initState();
    widgetList = updateAndGetAreas();
  }

  void refreshList() {
    setState(() {
      widgetList = updateAndGetAreas();
    });
  }

  callback(String id) async {
    await getScriptDelete(id);
    refreshList();
  }

  Future<List<AreaCard>> updateAndGetAreas() async {
    Map<String, dynamic> data = await getUserScripts();
    List<AreaCard> temp = List<AreaCard>();

    for (var i in data['scripts'])
      temp.add(new AreaCard(
        data: i,
        callback: callback,
      ));
    return temp;
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return FutureBuilder(
      future: widgetList,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          return Container(
            child: ListView(
              children: <Widget>[
                SizedBox(height: size.height * 0.01),
                SingleChildScrollView(
                  child: Column(
                    children: [
                      for (AreaCard i in snapshot.data) i,
                    ],
                  ),
                ),
              ],
            ),
          );
        } else if (snapshot.hasError) {
          throw snapshot.error;
        } else {
          return Center(child: CircularProgressIndicator());
        }
      },
    );
  }
}
