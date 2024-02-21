import 'dart:async';
import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import 'Login.dart';
import 'package:lottie/lottie.dart';
import 'Constants/Colors.dart';
import 'Constants/Strings.dart';
import 'package:google_fonts/google_fonts.dart';
import 'Constants/Path.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Timer(
        const Duration(seconds: 3, milliseconds: 215, microseconds: 5),
        () => Navigator.pushReplacement(
            context, MaterialPageRoute(builder: (context) => const Login())));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: ColorPalette.backgroundcolor,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Center(
              child: Lottie.asset(
                Path.LogoAnime, // Replace with the path to your Lottie JSON file
                fit: BoxFit.cover,
                width: 400, // Adjust the width and height as needed
                height: 400,
              ),
            ),
            Center(
              child: AnimatedTextKit(animatedTexts: [
                TyperAnimatedText(
                  TextString.title,
                  textStyle: GoogleFonts.montserrat(
                      fontSize: 64,
                      fontWeight: FontWeight.w700,
                      color: ColorPalette.SH_Grey100),
                  speed: const Duration(milliseconds: 210),
                  curve: Curves.easeIn,
                )
              ]),
            )
          ],
        ),
      ),
    );
  }
}
