import 'package:flutter/material.dart';
import 'Constants/Path.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromRGBO(4, 67, 102, 1),
      body: Center(
        child: Column(
          children: [
            Image.asset(Path.LogoImg),
            const Text(
              "Kitaby ",
              style: TextStyle(
                  fontFamily: "Montserrat",
                  fontSize: 64,
                  fontWeight: FontWeight.bold,
                  color: Colors.white),
            ),
          ],
        ),
      ),
    );
  }
}
