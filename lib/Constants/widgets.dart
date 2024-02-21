import 'package:flutter/material.dart';
import 'package:test1/Constants/Colors.dart';
class WidgetsModels{
 static Container Container_widget(double? varwidth,double? varheight,Alignment? varalignment,EdgeInsets? varmargin,BoxDecoration? vardecoration,Widget w){
  return Container(
                width: varwidth ,
                height: varheight,
                alignment: varalignment ,     //A conatiner that have a widget child
                margin: varmargin,
                decoration: vardecoration,
                child:w,
                  );
                   }

static TextStyle customtextstyle(Color varcolor,double varsize,FontWeight varfontweight,String varfontfamily){
  return  TextStyle(
                color:varcolor,
                fontSize:varsize,         //textstyle of a textwidget
                fontWeight:varfontweight,
                fontFamily: varfontfamily,
                   );
                    }  

static TextFormField customTFF(TextEditingController varcontroller,TextStyle varstyle,AutovalidateMode varavm,var fctsave,TextInputType varkt,var vali,InputDecoration vardecoration){
  return TextFormField(
                
                controller:varcontroller,
                style: varstyle, 
                autovalidateMode: varavm,
                onSaved:fctsave ,        //TextFormField  
                keyboardType:varkt ,
                validator: vali,
                decoration:vardecoration,
                  );
                   } 

static InputDecoration customdecoration1(BorderSide enablebs,BorderRadius enablebr,BorderSide bs,BorderRadius br,Widget varprefix){
  return InputDecoration(
    prefix:varprefix,
    enabledBorder:OutlineInputBorder(
        borderSide: enablebs,  //enableborderside
        borderRadius: enablebr,  //enableborderradius
           ),   
                                        //Decoration of textformfieldborders
    border:OutlineInputBorder(          
        borderSide: bs,                //borderside
        borderRadius: br,              //borderradius
           ),
                  );
                   }                                      

static Container Or_bar(){
  return Container(
                height: 25,
                child: Row(children: [
                    Expanded(
                      child: Container(
                          height: 1,
                          decoration: BoxDecoration(color: Color(0xFF05131B),border:Border.all(width: 1),),
                          ),),
                    Center(
                      child: Container(
                        alignment: Alignment.center,
                        width:30 ,
                        height: 25,
                        child: Text('Or',style: TextStyle(color: Color(0xFF05131B),fontSize:20,fontWeight:FontWeight.w400,fontFamily: 'Montserrat'),),
                         ),),
                    Expanded(
                      child: Container(
                        height: 1,
                        decoration: BoxDecoration(color:  Color(0xFF05131B),border:Border.all(width: 1),),
                         ),),   
                  ],),
                     );
}

static Column customTTF_title(String vartitle,TextEditingController varcontroller,var varonsave,TextInputType varkeybordtype,TextEditingController vali,Widget varprefix){
  return Column(children: [
    Container_widget(
      null, null, Alignment.centerLeft, EdgeInsets.all(5),null,
      Text(vartitle,style: customtextstyle(ColorPalette.SH_Grey900, 17, FontWeight.w400, 'Roboto'),)
      ),
    Container_widget(
      null, 80, null, null,null,
       customTFF(
              varcontroller,
              customtextstyle(Colors.black, 18, FontWeight.w200, 'Montserrat'),
               AutovalidateMode.onUserInteraction,
               varonsave, varkeybordtype, vali,
                customdecoration1(BorderSide(color: Colors.black), BorderRadius.circular(10), BorderSide(color: ColorPalette.Primary_Color_Light), BorderRadius.circular(10),varprefix)))  

  ],);
}
}