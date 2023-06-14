PennController.ResetPrefix(null);
PennController.AddHost("https://amor.cms.hu-berlin.de/~idlsfbnd/openguise/");

PennController.Sequence("Info",
                        "Consent",
                        "Code",
                        "Anleitung",
                        "Probedurchlauf",
                        "Counter",
                        "Item",
                        "Meta1","Meta2", "send","Final");
PennController.DebugOff();
var progressBarText = "Fortschritt";

PennController.SetCounter("Counter","inc",1)

//WILLKOMMENSSEITE & INFOBLATT
PennController("Info", 
        newImage("HU","HU Logo.png")  
            .size(289,65)
         ,
        newImage("UNam","UNam Logo.png")
            .size(230,60)
        ,
         newImage("SFB","SFB Logo.png")
            .size(280,86)
        ,
         newCanvas("Logosnebeneinander",1138,100) //bildet den Header mit Logos
            .add(100,0, getImage("HU"))
            .add(450,0, getImage("UNam"))
            .add(750,0, getImage("SFB"))
            .center()
            .print()
        ,
        newHtml("willkommen", "information.html") //htmls müssen unter resources gepeichert werden
            .center()
            .settings.css("font-size", "large")
            .print()
,
newButton("Weiter_Alter","Ich bin über 18 Jahre.")
    .center()
    .print()
    .wait()
     
    )
//New Consent 
//Mit Boxen zum Anklicken und Dateien zum herunterladen; angelehnt an C04

PennController("Consent",
     newImage("HU","HU Logo.png")
        .size(289,65)
    ,
    newImage("UNam","UNam Logo.png")
         .size(230,60)
    ,
    newImage("SFB","SFB Logo.png")
        .size(280,86)
    ,
    newCanvas("Logosnebeneinander",1138,100)
        .add(100,0, getImage("HU"))
        .add(450,0, getImage("UNam"))
        .add(750,0, getImage("SFB"))
        .center()
        .print()
    ,
    newHtml("Consent", "consent.html")
        .center()
        .settings.css("font-size", "large")
        .print()
    ,
    newButton("Weiter","Weiter")
         .print()
         .log()
         .wait(
             getHtml("Consent").test.complete() //testet ob alle Boxen im Htmldokument angeklickt wurden
            .failure(getHtml("Consent").warn()) //gibt einen warntext aus falls nicht
             )
)

//CODE-EINGABE
PennController("Code",
    newImage("HU","HU Logo.png")
        .size(289,65)
    ,
    newImage("UNam","UNam Logo.png")
      .size(230,60)
    ,
    newImage("SFB","SFB Logo.png")
        .size(280,86)
    ,
    newCanvas("Logosnebeneinander",1138,100)
        .add(100,0, getImage("HU"))
        .add(450,0, getImage("UNam"))
        .add(750,0, getImage("SFB"))
        .center()
        .print()
    ,
    newHtml("Code", "code.html")
        .center()
        .settings.css("font-size", "large")
        .print()
    ,
    newCanvas("Code-Textfeld", 1, 10)
        .center()
        .print()
    ,
    newTextInput("Texteingabe-Code")
        .center()
        .print()
    ,
    newText("Leerzeile"," <br></p>")
        .center()
        .print()
    ,
    getTextInput("Texteingabe-Code")
            .log("last")
    ,
    newButton("weiter","zur Anleitung")
        .center()
        .print()
        .wait(
            getTextInput("Texteingabe-Code").test.text(/^.+/)
                    .failure( newText('errorcode', "<br>Bitte gib den Code ein.").color("red") .center().print() )
            )
    ,
    newText("Leerzeile"," <br></p>")
        .center()
        .print()
)
 
//Anleitung
PennController("Anleitung",
    newHtml("Anleitung","anleitung.html")
        .settings.css("font-family", "calibri") .settings.css("font-size", "large")
        .center()
        .print()
    ,
    newButton("buttonErklärung", "Weiter zum Probedurchlauf")
        .settings.css("font-family", "calibri").settings.css("font-size", "12px")
        .settings.center()
        .print()
        .wait()
        )
    
//TEsten von Skala und Eingabefeld
//Zwischenstopp zwischen Durchgang 1 und Durchgang 2
PennController("Probedurchlauf",
    newText("Probe1", "<p>Bitte einmal auf <b>Play</b> klicken.</p>")
        .settings.css("font-family", "calibri").settings.css("font-size", "18px")
        .settings.center()
        .print()
    ,
    newAudio("Probe","Audio1.wav")
        .center()
        .once()
        .print()
    ,
    newText("Probe2","<p><b>Probe:</b> Bitte Punkte auf den <b>Skalen</b> anklicken. Bitte die gehörte Person nach Gefühl bewerten. Dazu Punkte auf den Skalen auswählen. </p>")
        .settings.css("font-family", "calibri").settings.css("font-size", "18px")
        .settings.center()
        .print()
    ,
    newCanvas(600,120)
        .add(80, 0, getText("Probe2"))
        .center()
        .print()
    ,
    newScale("Probeskala1", 9)
        .settings.css("font-family", "calibri").settings.css("font-size", "22px")
        .settings.labelsPosition("bottom").color("white")
        .settings.before(newText("<b>gebildet</b>"))
        .settings.after(newText("<b>ungebildet</b>"))
        .center()
        .print()
    ,
         newScale("Probeskala2", 9)
        .settings.css("font-family", "calibri").settings.css("font-size", "22px")
        .settings.labelsPosition("bottom").color("white")
        .settings.before(newText("<b>sympathisch</b>"))
        .settings.after(newText("<b>unsympathisch</b>"))
        .center()
        .print()
    ,          
    newText("Probe-8","<p><b>Probe: Bitte die Einordnung kurz begründen.</b></p>")
        .center()
        .print()
    ,
    newCanvas("Probetextfeld", 1, 10)
        .center()
        .print()
    ,
    newTextInput("Probetexteingabe")
        .center()
        .print()
    ,        
    newText("Probe-4", "<br>Sehr gut! Sobald ein Wert auf der Skala ausgewählt wurde und Text im Textfeld steht, erscheint ein Button am Ende der Seite, mit dem das Experiment gestartet wird.</p>")
        .settings.css("font-family", "calibri").settings.css("font-size", "18px")
        .settings.center()
        .print()
    ,       
    newButton("Weiter", "Bitte weiter klicken. Das Experiment startet.")
            .center()
            .print()
            .wait()
        )
audios = []     // audios will reference the audios in a randomized order for simple playback
,
audios2 = []    // audios2 will ultimately be a copy of audios
// Create dummy trials to browse the table and feed then shuffle audios
,
Template("OG-audios.csv", row =>
    PennController( audios.push(row.Audio),
    fisherYates(audios) )
    )

// Now create the Item trials reading the audio references from audios
,
audio = ""
,Template( row =>
    PennController( "Item",
        audio = audios.shift(), // Extract next entry from audios
        audios2.push(audio)     // Place it in audios2
        ,
    newAudio( audio )
            .center()
            .once()
        ,
    newImage("message","messageExp3.png")
            .size(430,215)
        ,
    newCanvas("Message", 430,200 )
        .add(   130, 0, getImage("message"))
        .add( 150, 135, getAudio(audio))
    .print()
         ,
         getAudio( audio )
                   .wait("first")
                   .log()
                   .remove()
         ,
         getImage("message").remove()
         ,
        newText("Bewertung","<p><br>Bitte die gehörte Person bewerten. Wie hört sich die gerade gehörte Person an? Dazu bitte die Fragen im jeweiligen Freitextfeld beantworten und Punkte auf den Skalen auswählen. </p>")
          .settings.css("font-family", "calibri").settings.css("font-size", "18px")
           .center()
            .print()
    ,
    newCanvas(600,120)
        .add(50, 0, getText("Bewertung"))
        .center()
        .print()
      ,
          //mandatory textfelder
                 newText("alter", "Wie alt ist die gehörte Person?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newTextInput("alter")

               .log()
               ,
               newCanvas("altercanvas", 1000, 40)
               .settings.add(0, 0, getText("alter"))
               .settings.add(450,3, getTextInput("alter"))
               //.settings.center()
               .print()
               ,
                newText("Leerzeile"," <br></p>")
                  .center()
                .print()
                 ,    
               newText("wohnort", "Wo lebt diese Person?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newTextInput("wohnort")

               .log()
               ,
               newCanvas("wohnortcanvas", 1000, 40)
               .settings.add(0, 0, getText("wohnort"))
               .settings.add(450,3, getTextInput("wohnort"))
               //.settings.center()
               .print()
               ,
                newText("Leerzeile"," <br></p>")
                  .center()
                .print()
                 ,        
                   newText("herkunft", "Woher kommt die gehörte Person?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newTextInput("herkunft")

               .log()
               ,
               newCanvas("herkunftcanvas", 1000, 40)
               .settings.add(0, 0, getText("herkunft"))
               .settings.add(450,3, getTextInput("herkunft"))
               //.settings.center()
               .print()
               ,
                newText("Leerzeile"," <br></p>")
                  .center()
                .print()
                 ,            
              newText("situation", "Wo würde man einer solchen Person begegnen?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newTextInput("situation")

               .log()
               ,
               newCanvas("situationcanvas", 1000, 40)
               .settings.add(0, 0, getText("situation"))
               .settings.add(450,3, getTextInput("situation"))
               //.settings.center()
               .print()
               ,
                newText("Leerzeile"," <br></p>")
                  .center()
                .print()
                 ,                    
      newScale("selbstbewusstsein", 7)
        .settings.css("font-family", "calibri").settings.css("font-size", "22px")
        .settings.labelsPosition("bottom").color("white")
        .settings.before(newText("<b>überhaupt nicht selbstbewusst</b>"))
        .settings.after(newText("<b>sehr selbstbewusst</b>"))
        .settings.log("last")
        .center()
        .print()
    ,
     newScale("sympathie", 7)
        .settings.css("font-family", "calibri").settings.css("font-size", "22px")
        .settings.labelsPosition("bottom").color("white")
        .settings.before(newText("<b>überhaupt nicht sympathisch</b>"))
        .settings.after(newText("<b>sehr sympathisch</b>"))
        .settings.log("last")
        .center()
        .print()
    , 
    newScale("erfolg", 7)
        .settings.css("font-family", "calibri").settings.css("font-size", "22px")
        .settings.labelsPosition("bottom").color("white")
        .settings.before(newText("<b>beruflich überhaupt nicht erfolgreich</b>"))
        .settings.after(newText("<b>beruflich sehr erfolgreich</b>"))
        .settings.log("last")
        .center()
        .print()
    ,
      newScale("entspanntheit", 7)
        .settings.css("font-family", "calibri").settings.css("font-size", "22px")
        .settings.labelsPosition("bottom").color("white")
        .settings.before(newText("<b>überhaupt nicht entspannt</b>"))
        .settings.after(newText("<b>sehr entspannt</b>"))
        .settings.log("last")
        .center()
        .print()
    ,          
    newScale("intelligenz", 7)
        .settings.css("font-family", "calibri").settings.css("font-size", "22px")
        .settings.labelsPosition("bottom").color("white")
        .settings.before(newText("<b>überhaupt nicht intelligent</b>"))
        .settings.after(newText("<b>sehr intelligent</b>"))
        .settings.log("last")
        .center()
        .print()
    ,      
    newScale("vertrautheit", 7)
        .settings.css("font-family", "calibri").settings.css("font-size", "22px")
        .settings.labelsPosition("bottom").color("white")
        .settings.before(newText("<b>überhaupt nicht vertraut</b>"))
        .settings.after(newText("<b>sehr vertraut</b>"))
        .settings.log("last")
        .center()
        .print()
    ,
    newScale("kompetenz", 7)
        .settings.css("font-family", "calibri").settings.css("font-size", "22px")
        .settings.labelsPosition("bottom").color("white")
        .settings.before(newText("<b>überhaupt nicht kompetent</b>"))
        .settings.after(newText("<b>sehr kompetent</b>"))
        .settings.log("last")
        .center()
        .print()
    ,            
     newScale("humor", 7)
        .settings.css("font-family", "calibri").settings.css("font-size", "22px")
        .settings.labelsPosition("bottom").color("white")
        .settings.before(newText("<b>überhaupt nicht humorvoll</b>"))
        .settings.after(newText("<b>sehr humorvoll</b>"))
        .settings.log("last")
        .center()
        .print()
    ,            
    newScale("ehrgeiz", 7)
        .settings.css("font-family", "calibri").settings.css("font-size", "22px")
        .settings.labelsPosition("bottom").color("white")
        .settings.before(newText("<b>überhaupt nicht ehrgeizig</b>"))
        .settings.after(newText("<b>sehr ehrgeizig</b>"))
        .settings.log("last")
        .center()
        .print() 
        ,    
    newScale("freundlichkeit", 7)
        .settings.css("font-family", "calibri").settings.css("font-size", "22px")
        .settings.labelsPosition("bottom").color("white")
        .settings.before(newText("<b>überhaupt nicht freundlich</b>"))
        .settings.after(newText("<b>sehr freundlich</b>"))
        .settings.log("last")
        .center()
        .print()
        ,
    newSelector("dummy")
        .add(getScale("freundlichkeit"),getScale("ehrgeiz"),getScale("humor"),getScale("kompetenz"),getScale("vertrautheit"),getScale("intelligenz"),getScale("entspanntheit"),getScale("erfolg"),getScale("sympathie"),getScale("selbstbewusstsein"))
        .shuffle()
        .disable()
    ,     
     newHtml("ItemQText", "ItemQ.html")
        .center()
        .settings.css("font-size", "large")
        .print()
    ,
    newTextInput("Begründung")
        .center()
        .log()
    ,
    newCanvas("Begründung",708,200)
        .add(0,0,getTextInput("Begründung") .size(708,100) .lines(15))
        .print()
,              
    getTextInput("Begründung").settings.log("last")
    ,
    newFunction( ()=>{
    window.scrollTo(0,0);
    document.querySelector(".PennController-TextInput.PennController-alter").focus();
}).call() 
                   //2
,
        newButton( "Weiter" )
            .settings.css("font-family", "calibri").settings.css("font-size", "12px")
               //.settings.center()
               .log()
               .center()
               .print()
               .wait(
                 newFunction('dummy', ()=>true).test.is(true)
  .and( getScale("selbstbewusstsein").test.selected()
    .failure( newText('errorscales', "<br>Bitte auf jeder Skala einen Punkt auswählen.").color("red") .center().print() )
  ).and( getScale("sympathie").test.selected()
    .failure( newText('errorscales', "<br>Bitte auf jeder Skala einen Punkt auswählen.").color("red") .center().print() )
  ).and( getScale("erfolg").test.selected()
    .failure( newText('errorscales', "<br>Bitte auf jeder Skala einen Punkt auswählen.").color("red") .center().print() )
  ).and( getScale("entspanntheit").test.selected()
    .failure( newText('errorscales', "<br>Bitte auf jeder Skala einen Punkt auswählen.").color("red") .center().print() )
  ).and( getScale("intelligenz").test.selected()
    .failure( newText('errorscales', "<br>Bitte auf jeder Skala einen Punkt auswählen.").color("red") .center().print() )
  ).and( getScale("vertrautheit").test.selected()
    .failure( newText('errorscales', "<br>Bitte auf jeder Skala einen Punkt auswählen.").color("red") .center().print() )
  ).and( getScale("kompetenz").test.selected()
    .failure( newText('errorscales', "<br>Bitte auf jeder Skala einen Punkt auswählen.").color("red") .center().print() )
  ).and( getScale("humor").test.selected()
    .failure( newText('errorscales', "<br>Bitte auf jeder Skala einen Punkt auswählen.").color("red") .center().print() )
  ).and( getScale("ehrgeiz").test.selected()
    .failure( newText('errorscales', "<br>Bitte auf jeder Skala einen Punkt auswählen.").color("red") .center().print() )
  ).and( getScale("freundlichkeit").test.selected()
    .failure( newText('errorscales', "<br>Bitte auf jeder Skala einen Punkt auswählen.").color("red") .center().print() )
  ).and( getTextInput("herkunft","alter","wohnort","situation").test.text(/^.+/) // testing if at least one digit was written in the input box
    .failure( newText("textfelderror","<br>Bitte jede Frage zur Person im jeweiligen Textfeld beantworten.").color("red").center().print() )
  )
        )
    )
    .log("audio", audio)    // Log which audio was played
    )

 //Metadaten
    //Personenbezogene Daten Seite 1 - Alter, Geschlecht, Bildung, Sozialerstatus
PennController("Meta1",
    newImage("HU","HU Logo.png")  
            .size(289,65)
         ,
        newImage("UNam","UNam Logo.png")
            .size(230,60)
        ,
         newImage("SFB","SFB Logo.png")
            .size(280,86)
        ,
         newCanvas("Logosnebeneinander",1138,100) //bildet den Header mit Logos
            .add(100,0, getImage("HU"))
            .add(450,0, getImage("UNam"))
            .add(750,0, getImage("SFB"))
            .center()
            .print()
        ,

    newText("Meta-1", "<b>Personenbezogene Daten</b> <p>Wir brauchen einige persönliche Angaben von Ihnen. Diese werden anonymisiert gespeichert und eine spätere Zuordnung zu Ihnen wird nicht möglich sein. Bitte nehmen Sie sich beim Ausfüllen der Felder Zeit.<p>")
 //       .settings.css("text-align","justify")
        .center()
        .print()

               ,
               newCanvas("democanvas", 800,120)
               .settings.add(0,0, getText("Meta-1"))
               //.settings.center()
               .print()
               ,
               newTextInput("beforeinput")
               .settings.size(150,40)
               .log()
               .settings.hidden()
               ,
               newText("before_input", "")
               .settings.after(getTextInput("beforeinput"))
               ,
               newText("before", "Haben Sie vorher schon an einem Experiment dieser Art teilgenommen? <br> (Zeitungstext korrigieren, Audioaufnahmen hören bzw. bewerten)")
               ,

               newDropDown("before",  "<br>" +"Bitte eine Option ausw&auml;hlen")
               .settings.add("Ja", "Nein")
               .log()
               .settings.after(getText("before_input"))
               .settings.callback(
                   getDropDown("before")
                   .test.selected("Ja")
                   .success(getTextInput("beforeinput").settings.visible()
               ))
               ,
               newCanvas("before", 1000, 40)
               .settings.add(0, 0, getText("before"))
               .settings.add(500,3, getDropDown("before"))
               //.settings.center()
               .print()
               ,
               newText("Leerzeile"," <br></p>")
               .center()
               .print()
               , 
             
               //Alter
               newDropDown("age", "Bitte eine Option ausw&auml;hlen")
               .settings.add("18" , "19" , "20", "21" , "22" , "23", "24" , "25" , "26", "27" , "28" , "29", "30" , "31", "32","33", "34" , "35", "36","37","38","39","über 40")
               .log()

               ,
               newText("agetext", "Alter:")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newCanvas("agecanvas", 1000, 40)
               .settings.add(0,0,getText("agetext"))
               .settings.add(450,2, getDropDown("age"))
               //.settings.center()
               .print()
               ,
               //Geschlecht
               newText("sex", "Geschlecht:")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newDropDown("sex", "Bitte eine Option ausw&auml;hlen")
               .settings.add("Weiblich", "M&auml;nnlich", "Divers")
               .log()
               ,
               newCanvas("sexcanvas", 1000, 40)
               .settings.add(0, 0, getText("sex"))
               .settings.add(450,3, getDropDown("sex"))
               //.settings.center()
               .print()
               ,
               //Wohnort
               newText("wohnort", "Wohnort (Stadt, Region):")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newTextInput("wohnort")

               .log()
               ,
               newCanvas("wohnortcanvas", 1000, 40)
               .settings.add(0, 0, getText("wohnort"))
               .settings.add(450,3, getTextInput("wohnort"))
               //.settings.center()
               .print()
               ,
                newText("Leerzeile"," <br></p>")
                  .center()
                .print()
                 ,
                 //aufgewachsen
            newText("aufgewachsen", "Wo sind Sie aufgewachsen?")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newTextInput("aufgewachsen")
                .log()
               //.settings.size(200,40)
               ,
               newCanvas("aufgewachsen", 1000,40)
               .settings.add(0,0, getText("aufgewachsen"))
               .settings.add(450,4,getTextInput("aufgewachsen"))
               //.settings.center()
               .print()
               ,
               newText("Leerzeile"," <br></p>")
                  .center()
                .print()
                 ,
                 //Abschluss
                newText("abschluss", "H&ouml;chster Bildungsabschluss:")
               .settings.css("font-size", "18px")
               .settings.bold()
               ,
               newDropDown("abschluss", "Bitte eine Option ausw&auml;hlen")
               .settings.add("kein Abschluss","Schulabschluss","Abitur oder gleichwertiger Abschluss","Studium ohne Abschluss","Bachelor","Master","Magister","Diplom", "Promotion", "Ausbildung", "Sonstige")     // MAYBE ADD QUESTIONS ABOUT DIALECT AND DOMINANT HAND
               //.settings.size(191,20)
               .log()
               ,
               newCanvas("abschlusscanvas", 1000, 40)
               .settings.add(0, 0, getText("abschluss"))
               .settings.add(470,4, getDropDown("abschluss"))
               //.settings.center()
               .print()
               ,
               //Studium
               newText("studium","<b>Studieren Sie?</b><br><small>(Falls ja, welches Fach und Fachsemester?)</small><br><br>")
               .settings.css("font-size", "18px")

               ,
               newTextInput("studiuminput")
               .settings.size(150,40)
               .log()
               .settings.hidden()
               ,
               newText("studium_input", "")
               .settings.after(getTextInput("studiuminput"))
               ,
               newDropDown("studium",  "<br>" +"Bitte eine Option ausw&auml;hlen")
               .settings.add("Ja", "Nein")
               .log()
               .settings.after(getText("studium_input"))
               .settings.callback(
                   getDropDown("studium")
                   .test.selected("Ja")
                   .success(getTextInput("studiuminput").settings.visible(

                   )) )
               ,
               newCanvas("studium", 1000, 40)
               .settings.add(0, 0, getText("studium"))
               .settings.add(500,3, getDropDown("studium"))
               //.settings.center()
               .print()
               ,
               newCanvas("filler", 1, 20)
               .print()
               ,
    newFunction( ()=>{
    window.scrollTo(0,0);
    document.querySelector(".PennController-DropDown.PennController-before").focus();
}).call()
,
    newButton("continue", "Weiter")
               .settings.css("font-family", "calibri").settings.css("font-size", "12px")
               //.settings.center()
               .log()
               .center()
               .print()
               .wait(
            newFunction('dummy', ()=>true).test.is(true)
            // before
            .and( getDropDown("before").test.selected()
                   .failure( newText('errorbefore', "<br>Bitte angeben, ob Sie an einem vergleichbaren Experiment teilgenommen haben.").color("red") .center().print() )
            // age
            ).and( getDropDown("age").test.selected()
                    .failure( newText('errorage', "<br>Bitte Alter angeben.").color("red") .center().print() )
            // sex
            ).and( getDropDown("sex").test.selected()
                    .failure( newText('errorsex', "<br>Bitte Geschlecht angeben.").color("red") .center().print() )
             // abschluss
            ) .and( getDropDown("abschluss").test.selected()
                    .failure( newText('errorabschluss', "<br>Bitte höchsten Abschluss angeben.").color("red") .center().print() )

            ).and( getDropDown("studium").test.selected()
                   .failure( newText('errorstudium', "<br>Bitte Studium angeben.").color("red") .center().print() )
                  
            ).and(
             getTextInput("wohnort").test.text(/^.+/) // testing if at least one digit was written in the input box
                .failure(
                   newText("wohnorter","<br>Bitte Wohnort angeben")
                   .settings.color("red")
                   .center()
                   .print())
                ).and(
             getTextInput("aufgewachsen").test.text(/^.+/) // testing if at least one digit was written in the input box
                .failure(
                   newText("aufgewachsener","<br>Bitte angeben, wo Sie aufgewachsen sind.")
                   .settings.color("red")
                   .center()
                   .print())

            )  )


               ,
               getDropDown("age").wait("first")
               ,
               getDropDown("sex").wait("first")
               ,
                getDropDown("studium").wait("first")             
               ,
               getDropDown("abschluss").wait("first")
 )
 ;
 //Metadaten 2: Sprachbiographie
PennController("Meta2",
    newImage("HU","HU Logo.png")  
            .size(289,65)
         ,
        newImage("UNam","UNam Logo.png")
            .size(230,60)
        ,
         newImage("SFB","SFB Logo.png")
            .size(280,86)
        ,
         newCanvas("Logosnebeneinander",1138,100) //bildet den Header mit Logos
            .add(100,0, getImage("HU"))
            .add(450,0, getImage("UNam"))
            .add(750,0, getImage("SFB"))
            .center()
            .print()
        ,

       newText("SprachenMutter","<b>Welche Sprachen spricht/sprach Ihre Mutter?</b><br>Bitte sortieren und mit der am besten gesprochenen Sprache beginnen.")
 //       .center()
        .print()
,
    newCanvas("SprachenMutter", 1, 10)
        .center()
        .print()
,
    newTextInput("SprachenMutter")
 //       .center()
        .size(600,80)
        .print()
,
    getTextInput("SprachenMutter")
        .log("last")
,
newText("Leerzeile"," <br></p>")
    .center()
    .print()
,
    newText("SprachenVater","<b>Welche Sprachen spricht/sprach Ihr Vater?</b><br> Bitte sortieren und mit der am besten gesprochenen Sprache beginnen.")
  //      .center()
        .print()
,
    newCanvas("SprachenVater", 1, 10)
//        .center()
        .print()
,
    newTextInput("SprachenVater")
//        .center()
        .size(600,80)
        .print()
,
    getTextInput("SprachenVater")
        .log("last")
               ,
               newText("Leerzeile"," <br></p>")
                 .center()
                .print()
                 ,
       newText("SprachenSelbst","<b>Welche Sprachen sprechen Sie selbst im Alltag?</b><br> Mit wem und in welchen Situationen? Bitte sortieren und mit der am häufigsten gesprochenen Sprache beginnen.")
 //       .center()
        .print()
,
    newCanvas("SprachenSelbst", 1, 10)
 //       .center()
        .print()
,
    newTextInput("SprachenSelbst")
  //      .center()
        .size(600,80)
        .print()
,
    getTextInput("SprachenSelbst")
        .log("last")
    ,
 newText("Leerzeile"," <br></p>")
                 .center()
                .print()
                 ,

 newText("Dialekt","<b>Sprechen Sie einen Dialekt?</b><br> Mit wem und in welchen Situationen?")
//        .center()
        .print()
,
    newCanvas("Dialekt", 1, 10)
 //       .center()
        .print()
,

    newTextInput("Dialekt")
 //       .center()
 .size(600,80)
        .print()
,
    getTextInput("Dialekt")
        .log("last")
,
newText("Leerzeile"," <br></p>")
                 .center()
                .print()
                 ,
newText("Email","<b>Dürften wir Sie in Zukunft erneut kontaktieren?</b><br>Wenn ja, bitte Emailadresse angeben.<br>Die Angabe der Kontaktdaten ist freiwillig. Um Anonymität zu gewährleisten, wird diese Angabe getrennt vom ausgefüllten Fragebogen archiviert.")
//        .center()
        .print()
,
    newCanvas("Email", 1, 10)
 //       .center()
        .print()
,

    newTextInput("Email")
 //       .center()
        .size(600,80)
        .print()
,
    getTextInput("Email")
        .log("last")
,
newText("Leerzeile"," <br></p>")
                 .center()
                .print()
                 ,
    newFunction( ()=>{
    window.scrollTo(0,0);
    document.querySelector(".PennController-TextInput.PennController-SprachenMutter").focus();
}).call()
,
    newButton("Ende", "Experiment beenden und Daten abschicken")
               .settings.css("font-family", "calibri").settings.css("font-size", "18px")
               //.settings.center()
               .log()
               .center()
               .print()
               .wait(
            newFunction('dummy', ()=>true).test.is(true)
                .and(
             getTextInput("SprachenMutter").test.text(/^.+/) // testing if at least one digit was written in the input box
                .failure(
                   newText("errormutter","<br>Bitte Sprachen der Mutter angeben")
                   .settings.color("red")
                   .center()
                   .print())
                ).and(
             getTextInput("SprachenVater").test.text(/^.+/) // testing if at least one digit was written in the input box
                .failure(
                   newText("errorvater","<br>Bitte Sprachen des Vaters angeben.")
                   .settings.color("red")
                   .center()
                   .print())
             ).and(
             getTextInput("SprachenSelbst").test.text(/^.+/) // testing if at least one digit was written in the input box
                .failure(
                   newText("errorselbst","<br>Bitte angeben welche Sprachen Sie im Alltag sprechen.")
                   .settings.color("red")
                   .center()
                   .print())
            ).and(
             getTextInput("Dialekt").test.text(/^.+/) // testing if at least one digit was written in the input box
                .failure(
                   newText("errordialekt","<br>Bitte Dialekt angeben.")
                   .settings.color("red")
                   .center()
                   .print())
            )  

 )
)
;
//Geloggte Ergebnisse senden
PennController.SendResults("send");

//Abschlussbildschirm
PennController("Final",
         newText("<p>Vielen Dank f&uuml;r Ihre Teilnahme! Die Studie ist hiermit beendet. </p>")
            .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
            .settings.center()
            .print()
        ,

        newText ("<p>Sie können das Fenster jetzt schließen.")
            .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
            .settings.center()
            .print()
        ,
        newButton("void", "")
            .wait()


   )
;


