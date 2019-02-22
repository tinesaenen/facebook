const DATA = [
  //http://source.unsplash.com/random/75x75?girl
  {
    // -------------------------NEWS----------------------------//
    id: 1,
    type: "news",
    dt: 1234981243,
    text:
      "Joodse graven geschonden in aanloop van protesten tegen antisemitisme",
    profileName: "Aline Van Heverlee",
    profileImage: "/imagesProfilePeople/Aline_Van_Heverlee.jpeg",
    image: "/imagesPosts/ALine_van_Heverlee_joosdeGraven.jpg",
    messageSource: "De Standaard",
    messageSourceWebsite: "standaard.be",
    action: "heeft een bericht gedeeld van",
    messageResponse: "en 20 anderen hebben kwaad gekeken naar dit bericht",
    smiley: "😡"
  },
  {
    id: 2,
    type: "news",
    dt: 1234981243,
    text: "Kinderen willen wel sporten, maar er zijn geen trainers meer",
    profileName: "Arianne Janssens",
    profileImage: "/imagesProfilePeople/Arianne_Janssens.jpeg",
    image: "/imagesPosts/Arianne_Jansses_trainersSporten.jpg",
    messageSource: "De Standaard",
    messageSourceWebsite: "standaard.be",
    action: "heeft gereageerd op een bericht van",
    messageResponse: "en 3 anderen hebben triest gekeken naar dit bericht",
    smiley: "😔"
  },
  {
    id: 3,
    type: "news",
    dt: 1234981243,
    text:
      "Nu al bloeiende krokussen en fladderende vlinders: is dat wel goed voor de natuur?",
    profileName: "Arne Goossens",
    profileImage: "/imagesProfilePeople/Arne_Goossens.jpeg",
    image: "/imagesPosts/Arne_Goossens_Krokussen.jpeg",
    messageSource: "De Morgen",
    messageSourceWebsite: "demorgen.be",
    action: "heeft een bericht gedeeld van",
    messageResponse: "en 3 anderen hebben verbaasd gekeken naar dit bericht",
    smiley: "😨😱"
  },
  {
    id: 3,
    type: "news",
    dt: 1234981243,
    text:
      "  Het allermooiste aan de dansvideo’s van Angèle en Léo is de liefde die je erin kan ontwaren",
    profileName: "Atar Jabeir",
    profileImage: "/imagesProfilePeople/Atar_Jabeir.jpeg",
    image: "/imagesPosts/Atar_Jabeir_AngeleVideo.jpeg",
    messageSource: "De Morgen",
    messageSourceWebsite: "demorgen.be",
    action: "heeft een bericht gedeeld van",
    messageResponse: "en 3 anderen hebben verbaasd gekeken naar dit bericht",
    smiley: "😍😌"
  },

  // -----------------------NOTIFICATION-------------------------//
  {
    id: 4,
    type: "notification",
    dt: 1234981243,
    message:
      "We merken dat je er wat moe uitziet vandaag... Misschien moet je vanavond wat vroeger gaan slapen?",
    text:
      "Een beetje moe? probeer Sleepy Time™! Slapen was nog nooit zo makkelijk.",
    image: "/imagesNotifications/Sleepy_Time_App.jpg",
    textTitle: "Sleepy Time™ — 10 dagen grais testen"
  },
  {
    id: 4,
    type: "notification",
    dt: 1234981243,
    message: "Hallo Werner, zware dag gehad? Je ziet er wat moe uit",
    text:
      "Heel de dag lang energie met het sinaasappelsap van je AD Delhaize. Nu met bovendien 35% korting!",
    image: "/imagesNotifications/minute_maid.jpeg",
    textTitle: "Ad Delhaize — Sinaasappelsap"
  },
  {
    id: 4,
    type: "notification",
    dt: 1234981243,
    message: "Je bent gespannen... ontspannen kan met de onderstaandebeelden",
    text:
      "Say goodbye to insomnia and experience sleep like you never slept before.",
    image: "/imagesNotifications/relax_app.jpg",
    textTitle: "Relax Melodies — Sleep like never before"
  },

  // -----------------------MININOTIFICATION-------------------------//

  {
    id: 4,
    type: "mininotification",
    dt: 1234981243,
    message: "Niet vergeten te lachen! het leven duurt maar even"
  },
  {
    id: 4,
    type: "mininotification",
    dt: 1234981243,
    message: "We meten een hoog decibelgehalte in de ruimte waar je nu zit."
  },
  {
    id: 4,
    type: "mininotification",
    dt: 1234981243,
    message:
      "Veel van je vrienden zijn aanwezig op de plek waar je nu bent. Kijk maar om je heen."
  },

  //  ----------------------ADVERTISEMENTS-------------------------//
  {
    id: 5,
    type: "ad",
    dt: 1234981243,
    profileImage: "/imagesProfilePages/Pearl.png",
    pageName: "Pearl Opticien",
    image: "/imagesAds/meerdere_brillen.jpg",
    text:
      "Heb je nog niet voldoende brillen? Kijk hoeveel je er op je hoofd kan plaatsen bij je Pearl Opticien!",
    subText: "nu 20 % korting op ons hele assortiment"
  }
];

export default DATA;
