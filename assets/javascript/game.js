$(document).ready(function () {

    var characters = {

        'Goku': {
            name: "Goku",
            hp: 140,
            ap: 13,
            cap: 15,
            image: "assets/images/goku",
            sound: "assets/sounds/gokuAttack.mp3"
        },

        'Vegeta': {
            name: "Vegeta",
            hp: 145,
            ap: 11,
            cap: 18,
            image: "assets/images/vegeta",
            sound: "assets/sounds/vegetaAttack.mp3"
        },

        'Cell': {
            name: "Cell",
            hp: 160,
            ap: 9,
            cap: 20,
            image: "assets/images/cell",
            sound: "assets/sounds/cellAttack.mp3"
        },

        'Frieza': {
            name: "Frieza",
            hp: 115,
            ap: 18,
            cap: 25,
            image: "assets/images/frieza",
            sound: "assets/sounds/friezaAttack.mp3"
        },

        'Majin Buu': {
            name: "Majin Buu",
            hp: 135,
            ap: 12,
            cap: 30,
            image: "assets/images/majin_buu",
            sound: "assets/sounds/majin_buuAttack.mp3"
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
        var charImage = $("<img class='character-image' id='" + str.toLowerCase() + victories + "'>").attr("src", char.image + victories + ".png");
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
            var title = $("<h1>");
            title.text("Defender");
            $(area).prepend(title);
        }
        if (area === "#your-character") {
            charDiv.addClass("user-character");
            var title = $("<h1>");
            title.text("Your Character");
            $(area).prepend(title);
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
            $("#attack").css("visibility", "visible");
            $("#enemies").empty();
            for (var i = 0; i < enemies.length; i++) {
                load(enemies[i], '#enemies');
            }
        }
    });

    $(document).on('click', '#attack', function () {

        $("#hitSound").attr("src", chosenChar.sound);
        $("#hitSound").prop("volume", 0.05);
        $("#hitSound")[0].play();
        $(".message").text("You attacked " + chosenEnemy.name + " for " + (chosenChar.ap * turn) + " damage.");
        $(".message").append("<br>")
        chosenEnemy.hp = (chosenEnemy.hp - (chosenChar.ap * turn));

        if (chosenEnemy.hp > 0) {
            $("#defender").empty();
            load(chosenEnemy, "#defender");

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
            $("#attack").css("visibility", "hidden");
            $("#defender").empty();
            $(".message").empty();
            victories++;
            if (victories === 4) {
                $("#attack").remove();
                $("#your-character").remove();
                $("#enemies").remove();
                $("#enemy-header").remove();
                $(".message").text("You Win! GAME OVER!!!");
                $(".message").append($('<br> <button>Restart</button>').click(function () {
                    location.reload();
                }));
                var newDiv = $("<img>").attr('src', "assets/images/wins.png");
                newDiv.addClass("winner");
                $("#main").append(newDiv);
            }
            else {
                $(".message").append("You Defeated " + chosenEnemy.name + ".");
                $(".message").append('<br>', "Select a new Enemy.");
                $("#your-character").empty();
                load(chosenChar, "#your-character");
                $("#enemies").empty();
                for (var i = 0; i < enemies.length; i++) {
                    load(enemies[i], '#enemies');
                }
            }
        }
        turn++;
    });
});