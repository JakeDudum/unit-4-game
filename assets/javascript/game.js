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

        if (area === "#character-select") {
            charDiv.addClass("select");
        }
        else {
            charDiv.removeClass("select");
        }
        if (area === "#enemies") {
            charDiv.addClass("enemy");
            charDiv.removeClass("select");
        }
        if (area === "#defender") {
            charDiv.addClass("defender");
            charDiv.removeClass("select");
        }
    }

    for (var key in characters) {
        if (characters.hasOwnProperty(key)) {
            load(characters[key], "#character-select");
        }
    }

    $(document).on('click', '.select', function () {

        var name = $(this).attr("id");

        if (name !== chosenChar) {
            for (var key in characters) {
                if (key === name) {
                    chosenChar = characters[key];
                }
                else {
                    enemies.push(characters[key]);
                }
            }
            $("#character-select").empty();
            load(chosenChar, '#your-character');

            for (var i = 0; i < enemies.length; i++) {
                load(enemies[i], '#enemies');
            }
        }
    });

    $(document).on('click', '.enemy', function () {

        var name = $(this).attr("id");

        if ($('#defender').children().length === 0) {
            for (var i = 0; i < enemies.length; i++) {
                if (enemies[i].name === name) {
                    chosenEnemy = enemies[i];
                }
            }
            load(chosenEnemy, "#defender");
            $(this).remove();
        }
    });
});