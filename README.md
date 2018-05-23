# clue_seeker
This project origins from a [game concept](https://github.com/phek/clue_seeker/blob/master/concept.pdf) I have. The idea was to create a hacking game where you interact with the game from multiple platforms such as a Web browser, Java client, a Game client or even a Mobile application. The scope of the project was quite big and I was hoping to recruit a few more developers/designers to fullfill it. This did however not happen and I instead decided to create the core communication of the game.

You can read a simple rapport of the project in the [project rapport](https://github.com/phek/clue_seeker/blob/master/project-rapport.pdf).

## Communication
The current state of the game is a simple game built in Unreal Engine. I also created a Java client, Website and a NodeJS server. All of the clients can communicate with each other through the NodeJS server with Socket.IO. The main functionality is a chat system across the platforms.

## Security
The following file needs to be created manually due to security:  
server/configs/auth.js
