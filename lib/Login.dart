import 'package:flutter/material.dart';
import 'package:Kitaby/Constants/Colors.dart';
import 'Constants/Path.dart';
import 'Constants/validator.dart';
import 'Constants/widgets.dart';

class Login extends StatefulWidget {
  const Login({super.key});
  @override
  State<Login> createState() => loginstate();
}

class loginstate extends State<Login> {
  static bool state = false;
  static bool state2 = false;
  static GlobalKey<FormState> login = GlobalKey();
  String? Email;
  String? password;
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
/*
  @override
void initState() {
  super.initState();
  _emailController.addListener(() {
    final isEmailValid = _isEmailValid(_emailController.value.text);
    if(isEmailValid != state) {
      setState(() {
        state = isEmailValid;
      });}});

  _passwordController.addListener(() {
    final ispasswordValid = _ispasswordValid(_passwordController.value.text);
    if(ispasswordValid != state2) {
      setState(() {
        state2 = ispasswordValid;
      });}});    
      }

@override
void dispose() {
  _emailController.dispose();
  _passwordController.dispose();
  super.dispose();
}
*/

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: ColorPalette.backgroundcolor, body: Container());
  }
}
