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
    date: "20 minuten geleden",
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
    date: "2 minuten geleden",
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
    date: "3 uur geleden",
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
    date: "5 seconden geleden",
    image: "/imagesPosts/Atar_Jabeir_AngeleVideo.jpeg",
    messageSource: "De Morgen",
    messageSourceWebsite: "demorgen.be",
    action: "heeft een bericht gedeeld van",
    messageResponse: "en 3 anderen hebben verbaasd gekeken naar dit bericht",
    smiley: "😍😌"
  },

  {
    id: 3,
    type: "news",
    dt: 1234981243,
    text:
      "Aflevering 3 van ‘Temptation’ in vogelvlucht: de mannen houden bitchfight met verleiders",
    profileName: "Vijf",
    profileImage: "/imagesProfilePages/Vijf.png",
    date: "5 minuten geleden",
    image: "/imagesPosts/Vijf_temptation.jpeg",
    messageSource: "Vijf",
    messageSourceWebsite: "vijf.be",
    action: "heeft gereageerd op een bericht van",
    messageResponse: "en 3 anderen hebben verbaasd gekeken naar dit bericht",
    smiley: "😍😌"
  },

  // -------------------------BIG NEWS----------------------------//

  {
    id: 3,
    type: "bigNews",
    dt: 1234981243,
    text: "Slachtoffer zinloos geweld getuigt anoniem",
    subText:
      "Een leerling die dinsdagavond na school werd afgetuigd door leeftijdsgenoten, doet anoniem zijn verhaal. Hij vertelt hoe hij in een straatje werd gelokt. Daar kreeg hij plots klappen. De beelden van het zinloos geweld verschenen op social media en werden massaal gedeeld...",
    profileName: "Beatrix Verhoeven",
    profileImage: "/imagesProfilePeople/Beatrix_Verhoeven.jpeg",
    date: "22 minuten geleden",
    image: "/imagesPosts/Beatrix_Verhoeven_geweldJongeren.jpeg",
    messageSource: "Het Laatste Nieuws",
    messageSourceWebsite: "hln.be",
    action: "heeft een bericht gedeeld van",
    messageResponse:
      "en 3 anderen hebben droevig en kwaad gekeken naar dit bericht",
    smiley: "😤😢"
  },

  // -------------------------STATUS----------------------------//

  {
    id: 3,
    type: "status",
    dt: 1234981243,
    text:
      "Iemand tips voor een rondreis in Ijsland? We gaan een rondtrip maken aan de noordkant van het eiland! Alvast bedankt 💙💜🧡",
    profileName: "Inne Grijp",
    profileImage: "/imagesProfilePeople/Beatrix_Verhoeven.jpeg",
    action: "heeft een status geplaatst",
    date: "1 minuut geleden",
    messageResponse: "en 3 anderen hebben gereageerd op dit bericht",
    smiley: "😤😢"
  },

  {
    id: 3,
    type: "status",
    dt: 1234981243,
    text:
      "Tips and tricks voor Rome? (20 dagen gaan we) 🚘🇮🇹🚘🇮🇹🚘🇮🇹🚘🇮🇹🚘🇮🇹🚘🇮🇹🚘🇮🇹🚘🇮🇹🚘🇮🇹🚘🇮🇹 ",
    profileName: "Boris Lewalski",
    profileImage: "/imagesProfilePeople/Boris_Lewalski.jpeg",
    action: "heeft een status geplaatst",
    date: "2 minuten geleden",
    messageResponse: "en 3 anderen hebben gereageerd op dit bericht",
    smiley: "😍"
  },

  {
    id: 3,
    type: "status",
    dt: 1234981243,
    text:
      "Ben op zoek naar een kat (liefst een kattin), regio Antwerpen! Danku",
    profileName: "Dennis Heyens",
    profileImage: "/imagesProfilePeople/Dennis_Heyens.jpeg",
    action: "heeft een status geplaatst",
    date: "30 seconden geleden",
    messageResponse: "en 3 anderen hebben gereageerd op dit bericht",
    smiley: "😍"
  },
  {
    id: 3,
    type: "status",
    dt: 1234981243,
    text:
      "Ontbijten in een gezellige bar op zondag in stad suggesties aub ☕️🍳🥓",
    profileName: "Dieter De Reyck",
    profileImage: "/imagesProfilePeople/Dieter_De_Reyck.jpeg",
    action: "heeft een status geplaatst",
    date: "1 dag geleden",
    messageResponse: "en 3 anderen hebben gereageerd op dit bericht",
    smiley: "😍"
  },
  {
    id: 3,
    type: "status",
    dt: 1234981243,
    text:
      "  Aan wie betalen elektischetijdcentrales eigelijk hun stroomverbruik?",
    profileName: "Elke Saenen",
    profileImage: "/imagesProfilePeople/Elke_Saenen.jpeg",
    action: "heeft een status geplaatst",
    date: "34 minuten geleden",
    messageResponse: "en 3 anderen hebben gereageerd op dit bericht",
    smiley: "🐑"
  },
  {
    id: 3,
    type: "status",
    dt: 1234981243,
    text:
      "Vergeet niet dat morgen de nieuwe Facebook-regel begint waarin ze jouw foto kunnen gebruiken. Deadline morgen niet vergeten !!! Alles wat je ooit hebt gepost wordt vanaf morgen openbaar. Zelfs berichten die zijn verwijderd of de foto's niet zijn toegestaan. Het kost niets voor een eenvoudig kopiëren en plakken, beter dan genezen. Channel 13 News sprak over de verandering in het privacybeleid van Facebook. Ik geef Facebook of met Facebook geassocieerde entiteiten geen toestemming om mijn foto's, informatie, berichten of berichten te gebruiken, zowel in het verleden als in de toekomst.",
    profileName: "Elke Saenen",
    profileImage: "/imagesProfilePeople/Elke_Saenen.jpeg",
    action: "heeft een status geplaatst",
    date: "43 minuten geleden",
    messageResponse: "en 24 anderen hebben dit bericht gedeeld",
    smiley: "😨"
  },

  // -------------------------PICTURE----------------------------//

  {
    id: 2,
    type: "picture",
    dt: 1234981243,
    text: "pls",
    profileName: "Erik Bosmans",
    profileImage: "/imagesProfilePeople/Erik_Bosmans.jpeg",
    date: "12 minuten geleden",
    image: "/imagesPosts/be_like_bil.png",
    action: "heeft een foto geplaatst",
    messageResponse: "en 3 anderen hebben kwaad gereageerd op dit bericht",
    smiley: "😡"
  },

  {
    id: 2,
    type: "picture",
    dt: 1234981243,
    text: "See you in two weeks everybody!",
    profileName: "Hanne Bregman",
    profileImage: "/imagesProfilePeople/Hanne_Bregman.jpeg",
    date: "56 minuten geleden",
    image: "/imagesPosts/vliegtuid_raam_op_reis.jpg",
    action: "heeft haar status bewerkt",
    messageResponse: "en 3 anderen hebben kwaad gereageerd op dit bericht",
    smiley: "😡"
  },
  {
    id: 2,
    type: "picture",
    dt: 1234981243,
    text: "Haha, LOL!",
    profileName: "Funny Cat Memes",
    profileImage: "/imagesProfilePages/funny_cats.jpg",
    date: "3 minuten geleden",
    image: "/imagesPosts/cat_meme_1.png",
    action: "heeft een bericht gedeeld",
    messageResponse: "en 256 anderen hebben gelachen naar dit bericht",
    smiley: "🤪"
  },
  {
    id: 2,
    type: "picture",
    dt: 1234981243,
    text: "True that",
    profileName: "Funny Cat Memes",
    profileImage: "/imagesProfilePages/funny_cats.jpg",
    date: "3 minuten geleden",
    image: "/imagesPosts/cat_meme_2.jpg",
    action: "heeft een bericht gedeeld",
    messageResponse: "en 256 anderen hebben gelachen naar dit bericht",
    smiley: "🤪"
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
    textTitle: "Sleepy Time™ — 10 dagen gratis testen"
  },
  {
    id: 4,
    type: "notification",
    dt: 1234981243,
    message: "Hallo, zware dag gehad? Je ziet er een beetje moe uit...",
    text:
      "Heel de dag lang energie met het sinaasappelsap van je AD Delhaize. Nu met bovendien 35% korting!",
    image: "/imagesNotifications/minute_maid.jpeg",
    textTitle: "Ad Delhaize — Vers sinaasappelsap"
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
  ,
  {
    id: 4,
    type: "notification",
    dt: 1234981243,
    message:
      "We hebben je gezicht gevonden op 31 foto's die door je vrienden zijn geüpload. We hebben de vrijheid genomen om jouw tag toe te voegen.",
    text: "Zelf taggen voor een kleine prijs met de Dymo label maker",
    image: "/imagesAds/label_maker.jpg",
    textTitle: "Dymo — Goed gelabeld is goed geordend!"
  },

  // -----------------------MININOTIFICATION-------------------------//

  {
    id: 4,
    type: "miniNotification",
    dt: 1234981243,
    message: "Niet vergeten te lachen! het leven duurt maar even"
  },
  {
    id: 4,
    type: "miniNotification",
    dt: 1234981243,
    message: "We meten een hoog decibelgehalte in de ruimte waar je nu zit."
  },
  {
    id: 4,
    type: "miniNotification",
    dt: 1234981243,
    message:
      "Veel van je vrienden zijn aanwezig op de plek waar je nu bent. Kijk maar om je heen."
  },

  {
    id: 4,
    type: "miniNotification",
    dt: 1234981243,
    message:
      "Er zijn nog heel wat dingen die je vergat in te vullen zoals je gsm nummer, bankrekening, wachtwoorden, adres..."
  },
  {
    id: 4,
    type: "miniNotification",
    dt: 1234981243,
    message:
      "We zagen op instagram dat je een reis aan het plannen bent naar Noorwegen. Klik op 'verzenden' als je dit met je vrienden wil delen."
  },
  {
    id: 4,
    type: "miniNotification",
    dt: 1234981243,
    message:
      "Omdat je locatiegegevens aanstonden, weten we dat je wel wat tijd hebt gespendeerd op de eroticabeurs in Antwerp Expo. Kunnen we je nog wat extra tips geven?"
  },
  {
    id: 4,
    type: "miniNotification",
    dt: 1234981243,
    message:
      "Om optimaal te kunnen plannen, kan je je agenda synchroniseren met Facebook. Alle evenementen waarbij je jezelf op aanwezig zetten worden dan automatisch gesynchroniseerd met je externe agenda."
  },
  {
    id: 4,
    type: "miniNotification",
    dt: 1234981243,
    message:
      "Afgaande op je berichtenwisseling met Cecile Homans lijkt het alsof jullie ruzie hebben... Wil je dat we je vriendschap met haar opheffen?"
  },
  {
    id: 4,
    type: "miniNotification",
    dt: 1234981243,
    message:
      "Nick de Bouwer heeft al veel berichten van je geliket, sturen we hem een vriendschapsverzoek?"
  },

  //----------------------ADVERTISEMENTS-------------------------//
  // {
  //   id: 5,
  //   type: "ad",
  //   dt: 1234981243,
  //   profileImage: "/imagesProfilePages/Pearl.png",
  //   pageName: "Pearl Opticien ",
  //   image: "/imagesAds/meerdere_brillen.jpg",
  //   text:
  //     "Heb je nog niet voldoende brillen? Kijk hoeveel je er op je hoofd kan plaatsen bij je Pearl Opticien!",
  //   subText: "nu 20 % korting op ons hele assortiment"
  // },
  // {
  //   id: 5,
  //   type: "ad",
  //   dt: 1234981243,
  //   profileImage: "/imagesProfilePages/apple.png",
  //   pageName: "Apple ",
  //   image: "/imagesAds/apple_watch.jpg",
  //   text:
  //     "Oude versie beu? Tijd voor een nieuwe? De Apple watch series 4 is nu verkrijgbaar in de App Store",
  //   subText: "Ga langs bij je lokale Switch handelaar en vraag voor meer info"
  // },
  // {
  //   id: 5,
  //   type: "ad",
  //   dt: 1234981243,
  //   profileImage: "/imagesProfilePages/esprit.png",
  //   pageName: "Esprit ",
  //   image: "/imagesAds/blauw_hemd_esprit.png",
  //   text: "Zomercollectie nu beschikbaar bij Esprit!",
  //   subText: "Koppelkorting op elk blauw item dat u koopt"
  // },
  {
    id: 5,
    type: "ad",
    dt: 1234981243,
    profileImage: "/imagesProfilePages/de_morgen.png",
    pageName: "De Morgen ",
    image: "/imagesAds/de_morgen.jpg",
    text: "Lees De Morgen nu 1 maand gratis",
    subText: "Geef het tegenovergesteld ook een kans"
  },
  {
    id: 5,
    type: "ad",
    dt: 1234981243,
    profileImage: "/imagesProfilePages/trix.jpeg",
    pageName: "Trix Antwerpen ",
    image: "/imagesAds/sold_out_trix.png",
    text: "GODSMACK US + LIKE A STORM NZ Uitverkocht",
    subText: "Dit concert is in samenwerking met Biebob"
  },
  {
    id: 5,
    type: "ad",
    dt: 1234981243,
    profileImage: "/imagesProfilePages/wix.jpg",
    pageName: "Wix ",
    image: "/imagesAds/wix.jpg",
    text: "Wix your website",
    subText: "Design your own logo with the Wix Logo Maker"
  }
];

export default DATA;
