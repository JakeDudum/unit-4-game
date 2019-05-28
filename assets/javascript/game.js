$(document).ready(function () {

    var characters = {

        'Goku': {
            name: "Goku",
            hp: 140,
            ap: 13,
            cap: 15,
            image: "assets/images/goku"
        },

        'Vegeta': {
            name: "Vegeta",
            hp: 145,
            ap: 11,
            cap: 18,
            image: "assets/images/vegeta"
        },

        'Cell': {
            name: "Cell",
            hp: 160,
            ap: 9,
            cap: 20,
            image: "assets/images/cell"
        },

        'Frieza': {
            name: "Frieza",
            hp: 115,
            ap: 18,
            cap: 25,
            image: "assets/images/frieza"
        },

        'Majin Buu': {
            name: "Majin Buu",
            hp: 150,
            ap: 12,
            cap: 30,
            image: "assets/images/majin_buu"
        }
    };

    var chosenChar;
    var chosenEnemy;
    var chosenEnemyIndex = 0;
    var enemies = [];
    var victories = 0;
    var turn = 1;

    function load(char, area) {
        str = char.name.replace(/\s+/g, '');
        var charDiv = $("<div class='character' id='" + char.name + "'/div>");
        var charName = $("<p class='character-name' /p>").text(char.name);
        var charImage = $("<img id='" + str.toLowerCase() + victories + "'>").attr("src", char.image + victories + ".png");
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
        }
        if (area === "#defender") {
            charDiv.addClass("defender");
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
                    chosenEnemyIndex = i;
                }
            }
            enemies.splice(chosenEnemyIndex, 1);
            load(chosenEnemy, "#defender");
            $("#enemies").empty();
            for (var i = 0; i < enemies.length; i++) {
                load(enemies[i], '#enemies');
            }
        }
    });

    $(document).on('click', '#attack', function () {

        if ($('#defender').children().length !== 0) {

            $(".message").text("You attacked " + chosenEnemy.name + " for " + (chosenChar.ap * turn) + " damage.");
            $(".message").append("<br>")
            chosenEnemy.hp = (chosenEnemy.hp - (chosenChar.ap * turn));

            $("#defender").empty();
            load(chosenEnemy, "#defender");

            if (chosenEnemy.hp > 0) {

                $(".message").append(chosenEnemy.name + " attacked you back for " + chosenEnemy.cap + " damage.");

                chosenChar.hp = (chosenChar.hp - chosenEnemy.cap);

                $("#your-character").empty();
                load(chosenChar, "#your-character");

                if (chosenChar.hp <= 0) {
                    $("#attack").remove();
                    $(".message").empty();
                    $(".message").text("You Lose! Try Again!!!");
                    $(".message").append($('<br> <button>Restart</button>').click(function () {
                        location.reload();
                    }));
                }
            } else {
                $("#defender").empty();
                $(".message").empty();
                $(".message").append("You Defeated " + chosenEnemy.name + ". Select a new Enemy.");
                victories++;
                $("#your-character").empty();
                load(chosenChar, "#your-character");
                $("#enemies").empty();
                for (var i = 0; i < enemies.length; i++) {
                    load(enemies[i], '#enemies');
                }
                if (victories === 4) {
                    $("#attack").remove();
                    $(".message").text("You Win! GAME OVER!!!");
                    $(".message").append($('<br> <button>Restart</button>').click(function () {
                        location.reload();
                    }));
                }
            }
            turn++;
        }
        else {
            $(".message").text("No Enemies Here");
        }
    });
});