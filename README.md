[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)<br>

# FarQuest

**Welcome to FarQuest**<br>
A role-playing game of medieval fantasy. Select from a hero class of Knights, Wizards, Huntresses, or be an Assassin. Explore a rich world of story-telling, battles, and surprises as you journey to see the King. He's asked for your help and you fear you're running out of time.

A letter arrived, it's from the King... he's asking for your help. You set off to the castle to speak with the King but you discover your journey there is frought with obstacles. Indeed, something is stirring in the kingdom and your haste quickens. When you arrive at the castle, you discover that there is nary a soul nor sound in the streets and you begin to investigate.
<br>
<br>

[Click here to play FarQuest!](https://farquest.herokuapp.com/)
<br>
<br>

## Table of Contents

1. [Technology](#technology)
2. [Usage & Features](https://github.com/cheng21tang/Project-2/tree/models#usage--features)
3. [Game Mechanics]()
4. [License](#license)
5. [Contributing](#contributing)
6. [Questions](#questions)

<br>
<hr>
<br>

## Technology

<img align="left" alt="JavaScript" width="25x" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png"/> &nbsp;
<img align="left" alt="JavaScript" width="25x" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png"/> &nbsp;
<img align="left" alt="JavaScript" width="25x" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png"/> &nbsp;
<img align="left" alt="JavaScript" width="25x" src="https://static-00.iconduck.com/assets.00/file-type-sequelize-icon-443x512-ck0z81j3.png"/> &nbsp;
<img align="left" alt="JavaScript" width="25x" src="https://camo.githubusercontent.com/bec2c92468d081617cb3145a8f3d8103e268bca400f6169c3a68dc66e05c971e/68747470733a2f2f76352e676574626f6f7473747261702e636f6d2f646f63732f352e302f6173736574732f6272616e642f626f6f7473747261702d6c6f676f2d736861646f772e706e67"/> &nbsp;
<img align="left" alt="JavaScript" width="25x" src="https://cdn.iconscout.com/icon/free/png-512/jquery-10-1175155.png"/> &nbsp;
<img align="left" alt="JavaScript" width="25x" src="https://www.pngkey.com/png/full/274-2741866_jquery-ui-jquery-ui-logo-png.png"/> &nbsp;
<img align="left" alt="MySQL" width="25px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mysql/mysql.png"/> &nbsp;
<img align="left" alt="JavaScript" width="25x" src="https://cdn.iconscout.com/icon/free/png-512/heroku-5-569467.png"/> &nbsp;
<img align="left" alt="Node.js" width="25px" src="https://cdn.iconscout.com/icon/free/png-512/node-js-1174925.png"/> &nbsp;
<img align="left" alt="express" width="25px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/express/express.png"/> &nbsp;
<img align="left" alt="SQL" width="25px" src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.png"/> &nbsp;
<img align="left" alt="SQL" width="25px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/npm/npm.png"/> &nbsp;
<br><br>

Here is a shortlist of technologies and tools used to build this game.

- HTML
- CSS
- JavaScript
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [jQueryUI](https://jqueryui.com/)
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) packages
    - [express](https://www.npmjs.com/package/express)
    - [express-session](https://www.npmjs.com/package/express-session)
    - [bcrypt](https://www.npmjs.com/package/bcrypt)
    - [mysql2](https://www.npmjs.com/package/mysql2)
    - [sequelize](https://www.npmjs.com/package/sequelize)
    - [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize)
    - [dotenv](https://www.npmjs.com/package/dotenv)
    - [RPGUI](https://github.com/RonenNess/RPGUI)
- [MySQL](https://www.mysql.com/)
- [HEROKU](https://www.heroku.com/)

Please visit the links above to learn more.

<br>

## Usage & Features

**HomePage**<br>
Create an account or sign-up to begin. You'll be taken to the character creation page if it is your first time.
![homepage](./public/assets/homepage.gif)<br><br>

**Character creation**<br>
You have a choice between 4 characters.

- Knight
- Wizard
- Huntress
- Assassin

Each character class has their own unique set of attributes that effect the stamina, strength, power, speed, luck, and their own set of attacks.

![character-selection](./public/assets/characterpage-demo.gif)<br><br>

**Profile**<br>
On your profile page, you can see all the characters on your account. You can create new characters, delete old ones, or start a game by clicking on your character.

![profile](./public/assets/user-profile-demo.gif)<br><br>

**Adventure Mode**<br>
When you start a game you'll be taken into adventure mode where the story begins. Your character is given choices and will effect the events in the storyline.

![adventure-mode](./public/assets/adventure-mode-1.gif)<br><br>

**Battle**<br>
You will encounter enemies in a turn-based fight. Your attacks and defense are calculated from your characters attributes. Keep an eye on your health bar and you trade attacks with the enemy.

![battle](./public/assets/path-dungeon.gif)<br><br>

**Chest & Items**<br>
You may find treasures in your journey, what surprises lie inside.

<---GIF OF CHEST HERE--->

<br>

## Game Mechanics

**Storyline paths**<br>
Diverging paths for the storyline created complexity in the client-side JavaScript.
![path-letsgo](./public/docs/RESTful-routes/path-letsgo.PNG)
<br><br>

**Battle - instances**<br>
Generating a battle instance during the story line, we fetch the enemy.id and render them to the HTML page.
![generate-fight](./public/docs/RESTful-routes/generate-fight.PNG)<br>
*(Please see **/public/js/character.js** to review the code in more detail: **generateFight(); on line 162**)*
<br><br>

**Battle - fight mechanics**<br>
Here you can see the some of the factors we're taking in during each turn and action. We calculated the turn-based fight taking in the characters attributes and mixing in RNG. This effects the damange output, defense, chance to miss, etc.

![fight-rng](./public/docs/RESTful-routes/fight-rng.PNG)
![fight-mechanics](./public/docs/fight-mechanics.gif)<br>
*(Please see **/public/js/character.js** to review the code in more detail: **fight(); on line 190**)*
<br><br>

<br>

## License

MIT License

Copyright (c) 2021 Cheng Tang, Liam Stewart, and Dylan Couzon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

<br>

## Musics

All Musics are free of charge, but all copyrights vest with YouFulca.
- [Link](https://wingless-seraph.net/en)

<br>

## Contributing

Future development opportunites:
- Story path model to be stored in database. Adds flexiblility and reduces lines of code.
- Additional classes, secondary character attribute like mana, rage, etc.
- Provide starter points during character creation for user to distribute
- Leveling system
- More inventory items!
- Equippable items; armor, swords, shields, etc.

We are gamers at heart and this is our first game built together and it was such a great learning experience of all the inner workings of a game of this scope. Then we started to think of the magnitude of our favorite games of the past and the effort and planning it takes to build those. Wow!

If you'd like to contribute, please fork this repository and submit pull request for the features above or other features you'd like to see in the game. We will review it for acceptance.

<br>

## Contact Us

Please feel free to reach out to us to talk about the game or check out our other individual works.


<img align="left" width="200" height="200" src="./public/sprites/1.gif">

Liam Stewart
- [liamchristopher.media@gmail.com](mailto:liamchristopher.media@gmail.com)
- [GitHub](https://github.com/LiamStewart8)
- [LinkedIn](https://www.linkedin.com/in/liamsctewart/)

<br>
<br>
<br>

<img align="left" width="200" height="200" src="./public/sprites/2.gif">

Dylan Couzon
- [dylancouzon@gmail.com](mailto:dylancouzon@gmail.com)
- [GitHub](https://github.com/Dylancouzon)
- [LinkedIn](https://www.linkedin.com/in/dcouzon/)

<br>
<br>
<br>

<img align="left" width="200" height="200" src="./public/sprites/4.gif">

Cheng Tang
- [cheng21tang@gmail.com](mailto:cheng21tang@gmail.com)
- [GitHub](https://github.com/cheng21tang)
- [LinkedIn](https://www.linkedin.com/in/cheng21tang/)
