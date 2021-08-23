self.addEventListener('install', event => event.waitUntil(onInstall(event)));
self.addEventListener('activate', event => event.waitUntil(onActivate(event)));
self.addEventListener('fetch', event => event.respondWith(onFetch(event)));

const resource = String.raw`{"result":{"announcements":{"date":1629122400,"dayInfo":{"date":"2021-08-17","term":"3","week":"6","weekType":"B","events":[],"dayNumber":7},"dateYesterday":1629036000,"dateTomorrow":1629208800,"notices":[{"id":"23543","title":"WINTER SPORT REPORTS DUE THIS WEEK","content":"<p>Don't forget to submit!</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis enim lobortis scelerisque fermentum dui faucibus in ornare quam. Purus in massa tempor nec. Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla. Posuere lorem ipsum dolor sit. Commodo elit at imperdiet dui accumsan sit amet nulla. Id interdum velit laoreet id donec ultrices tincidunt arcu. Id venenatis a condimentum vitae sapien pellentesque habitant. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Aliquet risus feugiat in ante metus dictum at tempor commodo. Tristique senectus et netus et.<br/>Tincidunt augue interdum velit euismod in pellentesque massa placerat. Faucibus ornare suspendisse sed nisi lacus sed. Pellentesque elit eget gravida cum sociis natoque penatibus et. Senectus et netus et malesuada fames ac turpis egestas. Viverra orci sagittis eu volutpat. Volutpat sed cras ornare arcu dui vivamus. Imperdiet dui accumsan sit amet nulla facilisi. Fames ac turpis egestas maecenas pharetra. Pretium aenean pharetra magna ac placerat. Orci a scelerisque purus semper eget duis. Nunc consequat interdum varius sit amet mattis vulputate enim nulla. Lobortis mattis aliquam faucibus purus in massa. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget. Sapien pellentesque habitant morbi tristique senectus.<br/>Ut venenatis tellus in metus vulputate eu scelerisque felis. Pulvinar neque laoreet suspendisse interdum consectetur libero. Dictumst vestibulum rhoncus est pellentesque. Est ante in nibh mauris cursus. Ornare lectus sit amet est placerat in egestas erat. Ipsum nunc aliquet bibendum enim facilisis gravida. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Erat velit scelerisque in dictum non consectetur a erat. Imperdiet proin fermentum leo vel orci porta non. Blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada. In arcu cursus euismod quis viverra nibh. Et netus et malesuada fames.<br/>Mi ipsum faucibus vitae aliquet. Odio euismod lacinia at quis risus sed vulputate. Sem viverra aliquet eget sit amet tellus cras. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Egestas fringilla phasellus faucibus scelerisque. Aliquet nibh praesent tristique magna sit amet purus. Leo urna molestie at elementum eu. Neque ornare aenean euismod elementum nisi quis eleifend quam. Ligula ullamcorper malesuada proin libero. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida. Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Adipiscing commodo elit at imperdiet dui. Ultricies integer quis auctor elit sed vulputate.<br/>Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. At in tellus integer feugiat scelerisque varius morbi enim. Turpis massa sed elementum tempus egestas. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Id eu nisl nunc mi ipsum faucibus vitae aliquet nec. Facilisis magna etiam tempor orci eu. Turpis egestas integer eget aliquet nibh praesent tristique. Egestas egestas fringilla phasellus faucibus scelerisque. Felis eget nunc lobortis mattis aliquam faucibus purus in massa. Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Semper quis lectus nulla at. Mauris sit amet massa vitae tortor. Amet consectetur adipiscing elit duis. Elementum integer enim neque volutpat ac tincidunt. Arcu dui vivamus arcu felis bibendum ut tristique. Porta lorem mollis aliquam ut. Nam libero justo laoreet sit amet cursus sit amet dictum. Interdum varius sit amet mattis vulputate enim nulla. Nisl purus in mollis nunc sed id semper risus.</p>","years":["7","8","9","10","11","12","Staff"],"dates":["2021-08-13","2021-08-16","2021-08-17"],"relativeWeight":0,"isMeeting":1,"meetingDate":null,"meetingTimeParsed":"00:00:00","meetingTime":"9am","meetingLocation":"","displayYears":"All Students and Staff","authorName":"J May"},{"id":"23545","title":"Premier's Reading Challenge - validating now","content":"<p><b>NOTE:</b> This will take a while</p>","years":["7","8","9","10"],"dates":["2021-08-17","2021-08-18"],"relativeWeight":0,"isMeeting":0,"meetingDate":null,"meetingTimeParsed":"00:00:00","meetingTime":"","meetingLocation":"","displayYears":"Years 7-10","authorName":"Mrs Crothers"}]},"calendar":[{"info":{"date":"2021-08-16","term":"3","week":"6","weekType":"B","dayNumber":6},"items":[{"type":"school","subtype":"","subject":"","title":"Subject Information Evening, zoom, Year 11 2022","time":"18:00","description":"]","data":{"index":"1","user":"","activity":"Subject Information Evening, zoom, Year 11 2022","venue":"","displayVenue":null,"start":"18:00","end":"19:15","notes":"]","date":"2021-08-16","venueDisplay":""}}]},{"info":{"date":"2021-08-17","term":"3","week":"6","weekType":"B","dayNumber":7},"items":[{"type":"school","subtype":"","subject":"","title":"Year 12, University Medicine presentation","time":"15:45","description":"","data":{"index":"1","user":"","activity":"Year 12, University Medicine presentation","venue":"","displayVenue":null,"start":"15:45","end":"16:15","notes":"","date":"2021-08-17","venueDisplay":""}},{"type":"school","subtype":"","subject":"","title":"Foundation meeting","time":"18:30","description":"","data":{"index":"2","user":"","activity":"Foundation meeting","venue":"","displayVenue":null,"start":"18:30","end":"20:30","notes":"","date":"2021-08-17","venueDisplay":""}}]},{"info":{"date":"2021-08-18","term":"3","week":"6","weekType":"B","dayNumber":8},"items":[{"type":"school","subtype":"","subject":"HSC","title":"Trial, PDHPE task","time":"12:30","description":"","data":{"index":"2","user":"HSC","activity":"Trial, PDHPE task","venue":"","displayVenue":null,"start":"12:30","end":"15:30","notes":"","date":"2021-08-18","venueDisplay":""}},{"type":"school","subtype":"","subject":"HSC","title":"Trial, Music 1 Aural and Music 2 Musicology + Aural - 11:45-14:45","time":"","description":"","data":{"index":"1","user":"HSC","activity":"Trial, Music 1 Aural and Music 2 Musicology + Aural - 11:45-14:45","venue":"","displayVenue":null,"start":"","end":"","notes":"","date":"2021-08-18","venueDisplay":""}}]},{"info":{"date":"2021-08-19","term":"3","week":"6","weekType":"B","dayNumber":9},"items":[{"type":"school","subtype":"","subject":"Year 12 presentation","title":"USA university applications","time":"20:00","description":"","data":{"index":"2","user":"Year 12 presentation","activity":"USA university applications","venue":"","displayVenue":null,"start":"20:00","end":"","notes":"","date":"2021-08-19","venueDisplay":""}},{"type":"school","subtype":"","subject":"Class tests","title":"8MaS-P1, 9MaA-P3","time":"","description":"","data":{"index":"1","user":"Class tests","activity":"8MaS-P1, 9MaA-P3","venue":"","displayVenue":null,"start":"","end":"","notes":"","date":"2021-08-19","venueDisplay":""}}]},{"info":{"date":"2021-08-20","term":"3","week":"6","weekType":"B","dayNumber":10},"items":[{"type":"school","subtype":"","subject":"HSC Trial","title":"DT-P4","time":"","description":"","data":{"index":"1","user":"HSC Trial","activity":"DT-P4","venue":"","displayVenue":null,"start":"","end":"","notes":"","date":"2021-08-20","venueDisplay":""}},{"type":"school","subtype":"","subject":"Debating","title":"SHS v SJC","time":"","description":"","data":{"index":"2","user":"Debating","activity":"SHS v SJC","venue":"","displayVenue":null,"start":"","end":"","notes":"","date":"2021-08-20","venueDisplay":""}}]},{"info":{"date":"2021-08-21","term":3,"week":"","weekType":"","dayNumber":0},"items":[]},{"info":{"date":"2021-08-22","term":3,"week":"","weekType":"","dayNumber":0},"items":[]}],"dailytimetable":{"status":"OK","date":"2021-08-24","bells":[{"bell":"R","time":"09:00","reasonShort":"Tue B","reason":"","bellDisplay":"Roll Call"},{"bell":"1","time":"09:05","reasonShort":"Tue B","reason":"","bellDisplay":"Period 1"},{"bell":"Transition","time":"10:05","reasonShort":"Tue B","reason":"","bellDisplay":"Transition"},{"bell":"2","time":"10:10","reasonShort":"Tue B","reason":"","bellDisplay":"Period 2"},{"bell":"Lunch 1","time":"11:10","reasonShort":"Tue B","reason":"","bellDisplay":"Lunch 1"},{"bell":"Lunch 2","time":"11:30","reasonShort":"Tue B","reason":"","bellDisplay":"Lunch 2"},{"bell":"3","time":"11:50","reasonShort":"Tue B","reason":"","bellDisplay":"Period 3"},{"bell":"Transition","time":"12:50","reasonShort":"Tue B","reason":"","bellDisplay":"Transition"},{"bell":"4","time":"12:55","reasonShort":"Tue B","reason":"","bellDisplay":"Period 4"},{"bell":"Recess","time":"13:55","reasonShort":"Tue B","reason":"","bellDisplay":"Recess"},{"bell":"5","time":"14:15","reasonShort":"Tue B","reason":"","bellDisplay":"Period 5"},{"bell":"End of Day","time":"15:15","reasonShort":"Tue B","reason":"","bellDisplay":"End of Day"}],"timetable":{"timetable":{"dayname":"Tuesday B","routine":"R1T2=3T4=5","rollcall":{"title":"08R","teacher":"HU","room":""},"periods":{"1":{"title":"Ma1","teacher":"WG","room":"105","fullTeacher":"Mr R Wang","year":"8"},"2":{"title":"Sc2","teacher":"MO","room":"303","fullTeacher":"Mr L Matto","year":"8"},"3":{"title":"VE1","teacher":"JO","room":"801","fullTeacher":"Ms M Jollie","year":"8"},"4":{"title":"Hs2","teacher":"BA","room":"403","fullTeacher":"Mr C Barris","year":"8"},"5":{"title":"DT1","teacher":"GF","room":"505","fullTeacher":"Mr R Gifford","year":"8"},"R":{"title":"08R","teacher":"HU","room":""}}},"subjects":{"820":{"title":"2020","shortTitle":"20","teacher":"","subject":"","fullTeacher":"","year":"8"},"8En2":{"title":"8 English 2","shortTitle":"En2","teacher":"SM","subject":"English","fullTeacher":"Ms P Schlam","year":"8"},"8Ma1":{"title":"8 Maths 1","shortTitle":"Ma1","teacher":"WG","subject":"Mathematics","fullTeacher":"Mr R Wang","year":"8"},"8Sc2":{"title":"8 Science 2","shortTitle":"Sc2","teacher":"MO","subject":"Science","fullTeacher":"Mr L Matto","year":"8"},"8Hs2":{"title":"8 History 2","shortTitle":"Hs2","teacher":"BA","subject":"History","fullTeacher":"Mr C Barris","year":"8"},"8ChB":{"title":"8 Chinese B","shortTitle":"ChB","teacher":"FO","subject":"Chinese","fullTeacher":"Ms R Fong","year":"8"},"8PH2":{"title":"8 PD/H/PE 2","shortTitle":"PH2","teacher":"SH","subject":"PD Health and PE","fullTeacher":"Mr D Smith","year":"8"},"8Ms1":{"title":"8 Music 1","shortTitle":"Ms1","teacher":"MI","subject":"Music","fullTeacher":"Ms R Miller","year":"8"},"8Ar1":{"title":"8 Art 1","shortTitle":"Ar1","teacher":"MY","subject":"Visual Arts","fullTeacher":"Ms J May","year":"8"},"8DT1":{"title":"8 D+T 1","shortTitle":"DT1","teacher":"GF","subject":"Design and Technology","fullTeacher":"Mr R Gifford","year":"8"},"8VE1":{"title":"8 Values Ed 1","shortTitle":"VE1","teacher":"JO","subject":"","fullTeacher":"Ms M Jollie","year":"8"},"8Y8":{"title":"All Year 8","shortTitle":"Y8","teacher":"","subject":"","fullTeacher":"","year":"8"},"8R":{"title":"8R","shortTitle":"R","teacher":"","subject":"","fullTeacher":"","year":"8"},"8SAR":{"title":"Student Adviser","shortTitle":"SAR","teacher":"ML","subject":"","fullTeacher":"Ms S Millett","year":"8"}}},"roomVariations":[],"classVariations":[],"serverTimezone":"36000","shouldDisplayVariations":true},"timetable":{"student":{"surname":"PYE","givenname":"Andrew","sex":null,"DOB":"1196859600","roll":"28","lines":{"1":"2","2":"1","3":"2","4":"2","5":"1","6":"-1","7":"2","8":"1","9":"1","10":"1","11":"1","12":"-1","13":"1","14":"1","15":"4","16":"-1","17":"4","18":"-1"},"extraLines":{"1":"-1","2":"70","3":"-1","4":"-1"},"BoSNumber":"0","studentId":"443201246","year":"8","years":["8"]},"days":{"1":{"dayname":"Monday A","routine":"R1T2=3T4=5","rollcall":{"title":"08R","teacher":"HU","room":""},"periods":{"1":{"title":"Sc2","teacher":"MO","room":"302","fullTeacher":"Mr L Matto","year":"8"},"2":{"title":"ChB","teacher":"FO","room":"214","fullTeacher":"Ms R Fong","year":"8"},"3":{"title":"DT1","teacher":"GF","room":"502","fullTeacher":"Mr R Gifford","year":"8"},"4":{"title":"En2","teacher":"SM","room":"204","fullTeacher":"Ms P Schlam","year":"8"},"5":{"title":"Ma1","teacher":"WG","room":"105","fullTeacher":"Mr R Wang","year":"8"}}},"2":{"dayname":"Tuesday A","routine":"R1T2=3T4=5","rollcall":{"title":"08R","teacher":"HU","room":""},"periods":{"1":{"title":"Ms1","teacher":"MI","room":"201","fullTeacher":"Ms R Miller","year":"8"},"2":{"title":"Ma1","teacher":"WG","room":"108","fullTeacher":"Mr R Wang","year":"8"},"3":{"title":"ChB","teacher":"FO","room":"214","fullTeacher":"Ms R Fong","year":"8"},"4":{"title":"Sc2","teacher":"MO","room":"304","fullTeacher":"Mr L Matto","year":"8"},"5":{"title":"PH2","teacher":"SH","room":"903","fullTeacher":"Mr D Smith","year":"8"}}},"3":{"dayname":"Wednesday A","routine":"R1T2=3=4T5","rollcall":{"title":"08R","teacher":"HU","room":""},"periods":{"1":{"title":"Ar1","teacher":"MY","room":"610","fullTeacher":"Ms J May","year":"8"},"2":{"title":"ChB","teacher":"FO","room":"214","fullTeacher":"Ms R Fong","year":"8"},"3":{"title":"Hs2","teacher":"BA","room":"403","fullTeacher":"Mr C Barris","year":"8"},"4":{"title":"Ms1","teacher":"MI","room":"201","fullTeacher":"Ms R Miller","year":"8"},"5":{"title":"En2","teacher":"SM","room":"202","fullTeacher":"Ms P Schlam","year":"8"}}},"4":{"dayname":"Thursday A","routine":"R1T2=3=4T5","rollcall":{"title":"08R","teacher":"HU","room":""},"periods":{"1":{"title":"Ma1","teacher":"WG","room":"106","fullTeacher":"Mr R Wang","year":"8"},"2":{"title":"DT1","teacher":"GF","room":"502","fullTeacher":"Mr R Gifford","year":"8"},"3":{"title":"Sc2","teacher":"PP","room":"304","fullTeacher":"Ms I Pepe","year":"8"}}},"5":{"dayname":"Friday A","routine":"R1T2=3=4T5","rollcall":{"title":"08R","teacher":"HU","room":""},"periods":{"1":{"title":"En2","teacher":"SM","room":"204","fullTeacher":"Ms P Schlam","year":"8"},"2":{"title":"Hs2","teacher":"BA","room":"403","fullTeacher":"Mr C Barris","year":"8"},"3":{"title":"PH2","teacher":"SH","room":"901","fullTeacher":"Mr D Smith","year":"8"},"4":{"title":"Sc2","teacher":"MO","room":"602","fullTeacher":"Mr L Matto","year":"8"},"5":{"title":"DT1","teacher":"GF","room":"704","fullTeacher":"Mr R Gifford","year":"8"}}},"6":{"dayname":"Monday B","routine":"R1T2=3T4=5","rollcall":{"title":"08R","teacher":"HU","room":""},"periods":{"1":{"title":"DT1","teacher":"GF","room":"502","fullTeacher":"Mr R Gifford","year":"8"},"2":{"title":"Hs2","teacher":"BA","room":"403","fullTeacher":"Mr C Barris","year":"8"},"3":{"title":"Ma1","teacher":"WG","room":"105","fullTeacher":"Mr R Wang","year":"8"},"4":{"title":"ChB","teacher":"FO","room":"214","fullTeacher":"Ms R Fong","year":"8"},"5":{"title":"En2","teacher":"SM","room":"204","fullTeacher":"Ms P Schlam","year":"8"}}},"7":{"dayname":"Tuesday B","routine":"R1T2=3T4=5","rollcall":{"title":"08R","teacher":"HU","room":""},"periods":{"1":{"title":"Ma1","teacher":"WG","room":"105","fullTeacher":"Mr R Wang","year":"8"},"2":{"title":"Sc2","teacher":"MO","room":"303","fullTeacher":"Mr L Matto","year":"8"},"3":{"title":"VE1","teacher":"JO","room":"801","fullTeacher":"Ms M Jollie","year":"8"},"4":{"title":"Hs2","teacher":"BA","room":"403","fullTeacher":"Mr C Barris","year":"8"},"5":{"title":"DT1","teacher":"GF","room":"505","fullTeacher":"Mr R Gifford","year":"8"}}},"8":{"dayname":"Wednesday B","routine":"R1T2=3=4T5","rollcall":{"title":"08R","teacher":"HU","room":""},"periods":{"1":{"title":"Hs2","teacher":"BA","room":"403","fullTeacher":"Mr C Barris","year":"8"},"2":{"title":"ChB","teacher":"FO","room":"214","fullTeacher":"Ms R Fong","year":"8"},"3":{"title":"PH2","teacher":"SH","room":"901","fullTeacher":"Mr D Smith","year":"8"},"4":{"title":"Ms1","teacher":"MI","room":"201","fullTeacher":"Ms R Miller","year":"8"},"5":{"title":"En2","teacher":"SM","room":"202","fullTeacher":"Ms P Schlam","year":"8"}}},"9":{"dayname":"Thursday B","routine":"R1T2=3=4T5","rollcall":{"title":"08R","teacher":"HU","room":""},"periods":{"1":{"title":"Ma1","teacher":"WG","room":"105","fullTeacher":"Mr R Wang","year":"8"},"2":{"title":"Sc2","teacher":"MO","room":"302","fullTeacher":"Mr L Matto","year":"8"},"3":{"title":"VE1","teacher":"JO","room":"304","fullTeacher":"Ms M Jollie","year":"8"}}},"10":{"dayname":"Friday B","routine":"R1T2=3=4T5","rollcall":{"title":"08R","teacher":"HU","room":""},"periods":{"1":{"title":"En2","teacher":"SM","room":"204","fullTeacher":"Ms P Schlam","year":"8"},"2":{"title":"DT1","teacher":"GF","room":"704","fullTeacher":"Mr R Gifford","year":"8"},"3":{"title":"Hs2","teacher":"BA","room":"403","fullTeacher":"Mr C Barris","year":"8"},"4":{"title":"Sc2","teacher":"MO","room":"303","fullTeacher":"Mr L Matto","year":"8"},"5":{"title":"Ar1","teacher":"MY","room":"610","fullTeacher":"Ms J May","year":"8"}}},"11":{"dayname":"Monday C","routine":"R1T2=3T4=5","rollcall":{"title":"08R","teacher":"HU","room":""},"periods":{"1":{"title":"PH2","teacher":"SH","room":"903","fullTeacher":"Mr D Smith","year":"8"},"2":{"title":"En2","teacher":"SM","room":"204","fullTeacher":"Ms P Schlam","year":"8"},"3":{"title":"Ar1","teacher":"MY","room":"610","fullTeacher":"Ms J May","year":"8"},"4":{"title":"Ma1","teacher":"WG","room":"105","fullTeacher":"Mr R Wang","year":"8"},"5":{"title":"ChB","teacher":"FO","room":"214","fullTeacher":"Ms R Fong","year":"8"}}},"12":{"dayname":"Tuesday C","routine":"R1T2=3T4=5","rollcall":{"title":"08R","teacher":"HU","room":""},"periods":{"1":{"title":"DT1","teacher":"GF","room":"502","fullTeacher":"Mr R Gifford","year":"8"},"2":{"title":"ChB","teacher":"FO","room":"214","fullTeacher":"Ms R Fong","year":"8"},"3":{"title":"Ar1","teacher":"CL","room":"707","fullTeacher":"Ms B Collignon","year":"8"},"4":{"title":"Hs2","teacher":"BA","room":"403","fullTeacher":"Mr C Barris","year":"8"},"5":{"title":"Ma1","teacher":"WG","room":"105","fullTeacher":"Mr R Wang","year":"8"}}},"13":{"dayname":"Wednesday C","routine":"R1T2=3=4T5","rollcall":{"title":"08R","teacher":"HU","room":""},"periods":{"1":{"title":"PH2","teacher":"SH","room":"902","fullTeacher":"Mr D Smith","year":"8"},"2":{"title":"Hs2","teacher":"GS","room":"403","fullTeacher":"Ms M Genias","year":"8"},"3":{"title":"Ma1","teacher":"WG","room":"105","fullTeacher":"Mr R Wang","year":"8"},"4":{"title":"Ms1","teacher":"MI","room":"201","fullTeacher":"Ms R Miller","year":"8"},"5":{"title":"En2","teacher":"SM","room":"202","fullTeacher":"Ms P Schlam","year":"8"}}},"14":{"dayname":"Thursday C","routine":"R1T2=3=4T5","rollcall":{"title":"08R","teacher":"HU","room":""},"periods":{"1":{"title":"Ma1","teacher":"WG","room":"106","fullTeacher":"Mr R Wang","year":"8"},"2":{"title":"DT1","teacher":"GF","room":"502","fullTeacher":"Mr R Gifford","year":"8"},"3":{"title":"Sc2","teacher":"MO","room":"304","fullTeacher":"Mr L Matto","year":"8"}}},"15":{"dayname":"Friday C","routine":"R1T2=3=4T5","rollcall":{"title":"08R","teacher":"HU","room":""},"periods":{"1":{"title":"Hs2","teacher":"BA","room":"207","fullTeacher":"Mr C Barris","year":"8"},"2":{"title":"PH2","teacher":"SH","room":"903","fullTeacher":"Mr D Smith","year":"8"},"3":{"title":"En2","teacher":"SM","room":"204","fullTeacher":"Ms P Schlam","year":"8"},"4":{"title":"Sc2","teacher":"MO","room":"304","fullTeacher":"Mr L Matto","year":"8"},"5":{"title":"En2","teacher":"SM","room":"204","fullTeacher":"Ms P Schlam","year":"8"}}}},"subjects":{"1":{"title":"8 English 2","shortTitle":"En2","teacher":"SM","subject":"English","fullTeacher":"Ms P Schlam","year":"8"},"2":{"title":"8 Maths 1","shortTitle":"Ma1","teacher":"WG","subject":"Mathematics","fullTeacher":"Mr R Wang","year":"8"},"3":{"title":"8 Science 2","shortTitle":"Sc2","teacher":"MO","subject":"Science","fullTeacher":"Mr L Matto","year":"8"},"4":{"title":"8 History 2","shortTitle":"Hs2","teacher":"BA","subject":"History","fullTeacher":"Mr C Barris","year":"8"},"5":{"title":"8 Chinese B","shortTitle":"ChB","teacher":"FO","subject":"Chinese","fullTeacher":"Ms R Fong","year":"8"},"6":-1,"7":{"title":"8 PD/H/PE 2","shortTitle":"PH2","teacher":"SH","subject":"PD Health and PE","fullTeacher":"Mr D Smith","year":"8"},"8":{"title":"8 Music 1","shortTitle":"Ms1","teacher":"MI","subject":"Music","fullTeacher":"Ms R Miller","year":"8"},"9":{"title":"8 Art 1","shortTitle":"Ar1","teacher":"MY","subject":"Visual Arts","fullTeacher":"Ms J May","year":"8"},"10":{"title":"8 D+T 1","shortTitle":"DT1","teacher":"GF","subject":"Design and Technology","fullTeacher":"Mr R Gifford","year":"8"},"11":{"title":"8 Values Ed 1","shortTitle":"VE1","teacher":"JO","subject":"","fullTeacher":"Ms M Jollie","year":"8"},"12":-1,"13":{"title":"All Year 8","shortTitle":"Y8","teacher":"","subject":"","fullTeacher":"","year":"8"},"14":{"title":"2020","shortTitle":"20","teacher":"","subject":"","fullTeacher":"","year":"8"},"15":{"title":"8R","shortTitle":"R","teacher":"","subject":"","fullTeacher":"","year":"8"},"16":-1,"17":{"title":"Student Adviser","shortTitle":"SAR","teacher":"ML","subject":"","fullTeacher":"Ms S Millett","year":"8"},"18":-1},"allSubjects":{"8":{"1":{"title":"8 English 2","shortTitle":"En2","teacher":"SM","subject":"English","fullTeacher":"Ms P Schlam","year":"8"},"2":{"title":"8 Maths 1","shortTitle":"Ma1","teacher":"WG","subject":"Mathematics","fullTeacher":"Mr R Wang","year":"8"},"3":{"title":"8 Science 2","shortTitle":"Sc2","teacher":"MO","subject":"Science","fullTeacher":"Mr L Matto","year":"8"},"4":{"title":"8 History 2","shortTitle":"Hs2","teacher":"BA","subject":"History","fullTeacher":"Mr C Barris","year":"8"},"5":{"title":"8 Chinese B","shortTitle":"ChB","teacher":"FO","subject":"Chinese","fullTeacher":"Ms R Fong","year":"8"},"7":{"title":"8 PD/H/PE 2","shortTitle":"PH2","teacher":"SH","subject":"PD Health and PE","fullTeacher":"Mr D Smith","year":"8"},"8":{"title":"8 Music 1","shortTitle":"Ms1","teacher":"MI","subject":"Music","fullTeacher":"Ms R Miller","year":"8"},"9":{"title":"8 Art 1","shortTitle":"Ar1","teacher":"MY","subject":"Visual Arts","fullTeacher":"Ms J May","year":"8"},"10":{"title":"8 D+T 1","shortTitle":"DT1","teacher":"GF","subject":"Design and Technology","fullTeacher":"Mr R Gifford","year":"8"},"11":{"title":"8 Values Ed 1","shortTitle":"VE1","teacher":"JO","subject":"","fullTeacher":"Ms M Jollie","year":"8"},"13":{"title":"All Year 8","shortTitle":"Y8","teacher":"","subject":"","fullTeacher":"","year":"8"},"14":{"title":"2020","shortTitle":"20","teacher":"","subject":"","fullTeacher":"","year":"8"},"15":{"title":"8R","shortTitle":"R","teacher":"","subject":"","fullTeacher":"","year":"8"},"17":{"title":"Student Adviser","shortTitle":"SAR","teacher":"ML","subject":"","fullTeacher":"Ms S Millett","year":"8"}}},"extraSubjects":{"1":-1,"2":{"title":"Clearance Form","shortTitle":null,"teacher":"","subject":null,"fullTeacher":"","year":"8"},"3":-1,"4":-1},"rollcall":{"title":"08R","teacher":"HU","room":"","fullTeacher":"Mr D Huynh"},"advisor":"Ms R Mellor","errorLog":null},"userinfo":{"username":"443201246","studentId":"443201246","givenName":"Andrew","surname":"Pye","rollClass":"08R","yearGroup":"8","role":"Student","department":"Year 8","office":"08R","email":"443201246@student.sbhs.nsw.edu.au","emailAliases":["andrew.pye2@student.sbhs.nsw.edu.au"],"decEmail":"Andrew.Pye2@education.nsw.gov.au","groups":["Domain Users","Year08","BYOD.Charter-Signed"]}},"token":{"access_token":"a899e4e4564b1aced8ea07c1e06d89dbab6263a5","refresh_token":"804c683fdf533012bff0b5b408ca2114cfe68976","expiry":"2021-08-17T03:23:15.4385728","termination":"2021-11-15T02:23:15.4385751"}}`;

const token =
String.raw`{
    "access_token": "e05c7eead5c8202b43043ebfa722a261df3d9bfc",
    "refresh_token": "d9dd6df4679a810cd86f5e05444d885f2a8405d4",
    "expiry": "2021-07-28T06:21:22.3968863",
    "termination": "2021-10-26T05:21:22.3968885"
}`;

async function onInstall(event) {
    self.skipWaiting();
}

async function onActivate(event) {
    clients.claim();
}

async function onFetch(event) {
    if (event.request.method == 'GET' || event.request.method == 'POST') {
        const request = event.request;
        
        if (request.url.endsWith("/login")) {
            return fetch("/callback");
        }

        if (request.url.startsWith("https://webparagon.azurewebsites.net/api/resource")) {
            return new Response(resource);
        }
        
        if (request.url.startsWith("https://webparagon.azurewebsites.net/api/auth")) {
            return new Response(resource);
        }

        return fetch(event.request);
    }

    return fetch(event.request);
}
