$(document).ready(function () {

    var characters = {

        'Goku': {
            name: "Goku",
            hp: 100,
            ap: 10,
            cap: 10,
            image: "assets/images/goku.png"
        },

        'Vegeta': {
            name: "Vegeta",
            hp: 100,
            ap: 10,
            cap: 10,
            image: "assets/images/vegeta.png"
        },

        'Cell': {
            name: "Cell",
            hp: 100,
            ap: 10,
            cap: 10,
            image: "assets/images/cell.png"
        },

        'Frieza': {
            name: "Frieza",
            hp: 100,
            ap: 10,
            cap: 10,
            image: "assets/images/frieza.png"
        },

        'Majin Buu': {
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

    $(".character").on('click', function () {

        var name = $(this).attr("id");

        if (name !== chosenChar) {
            for (var key in characters) {
                if (key === name) {
                    chosenChar=characters[key];
                }
                else {
                    enemies.push(characters[key]);
                }
            }
            $("#character-select").hide();
            load(chosenChar, '#your-character');
            
            for (var i = 0; i <enemies.length; i++) {
                load(enemies[i], '#enemies');
            }
        }
    });
});