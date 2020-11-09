# noteTaker

This is my Not Taker App. The goal as the readme outlined was to create backend functionality via express to handle GET POST and DELETE operations to the note taker UI that was provided to us. It does so by first using server.js which creates and express instances to handle incoming route requests. Those requests are sent to the respective route.js files to be fulfilled. In HTML routes, sendfile functions are used to render the requested html docs from public directory. In API routes, all CRUD operations are handle respectively by calling the different pieces of functionality built out in store.js which is in the db directory. store.js is are backend js logic used to manipulate the db.json file which is where all the data of the notes is compiled. 

Please review the code and test it out on heroku (link below)

look forward to the feedback, and I also as to please consider not marking off much for the lack of commits, I had some local pathing issues that required me to delete the initial repo and re establish. Thanks.

heroku link...