import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: Color(0xff044366),
      body: Center(
        child: Text(
          "Kitaby ",
          style: TextStyle(
              fontFamily: "Montserrat",
              fontSize: 64,
              fontWeight: FontWeight.bold,
              color: Colors.white),
        ),
      ),
    );
  }
}
