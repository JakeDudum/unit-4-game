$(document).ready(function () {

    var characters = {

        'goku': {
            name: "Goku",
            hp: 100,
            ap: 10,
            cap: 10,
            image: "assets/images/goku.png"
        },

        'vegeta': {
            name: "Vegeta",
            hp: 100,
            ap: 10,
            cap: 10,
            image: "assets/images/vegeta.png"
        },

        'cell': {
            name: "Cell",
            hp: 100,
            ap: 10,
            cap: 10,
            image: "assets/images/cell.png"
        },

        'frieza': {
            name: "Frieza",
            hp: 100,
            ap: 10,
            cap: 10,
            image: "assets/images/frieza.png"
        },

        'buu': {
            name: "Majin Buu",
            hp: 100,
            ap: 10,
            cap: 10,
            image: "assets/images/majin_buu.png"
        }
    };

    var chosenChar;
    var chosenEnemy;
    var enemies = [];
    var victories;
    var turn = 1;

    function load(char, area) {
        var charDiv = $("<div class='character' id='" + char.name + "'/div>");
        var charName = $("<p class='character-name' /p>").text(char.name);
        var charImage = $("<img class='character-image'>").attr("src", char.image);
        var charHP = $("<p class='character-hp' /p>").text(char.hp);
        charDiv.append(charName).append(charImage).append(charHP);
        $(area).append(charDiv);
    }

    for (var key in characters) {
        if (characters.hasOwnProperty(key)) {
          load(characters[key], "#character-select");
        }
    }


});