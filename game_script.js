let points;
let liv;
let time;
let rand;
let restart = false;
let timeEnded = false;
let addEnemy;
let addNeutral;
let difficultyEasy = false;
let difficultyMedium = false;
let difficultyHard = false;

//Siden loades
window.addEventListener("load", sidenVises);

function sidenVises() {
    document.querySelector("#start").classList.add("show");
    document.querySelector("#startButton").addEventListener("click", startGame);
    document.querySelector("#game_background").classList.add("hide");

    //skjul player TODO: player bliver ikke brugt
    document.querySelector("#player_sprite").classList.add("hide");

    //skjul taber og vinder skærm
    document.querySelector("#game_over").classList.add("hide");
    document.querySelector("#level_complete").classList.add("hide");

    //Skjul tid //TODO: genaktiver den her
    /*
        document.querySelector("#time_container").classList.add("hide");*/

    //Gør at man kan vælge difficulty
    /*document.querySelector("#easyMode").classList.add("show");
document.querySelector("#mediumMode").classList.add("show");
document.querySelector("#hardMode").classList.add("show");*/

    //start tid
    document.querySelector("#time_board").classList.add("timeScale");
    document.querySelector("#easyMode").addEventListener("click", difficulty1);
    document.querySelector("#mediumMode").addEventListener("click", difficulty2);
    document.querySelector("#hardMode").addEventListener("click", difficulty3);


    document.querySelector(".timeScale").classList.add("defaultTime");
    document.querySelector(".timeScale").classList.add("pausing");

    //Sæt default tid
    if (difficultyEasy == true || difficultyMedium == true || difficultyHard == true) {
        document.querySelector("#startButton").addEventListener("click", setDefaultTime);
    }

    if (difficultyEasy == true || difficultyMedium == true || difficultyHard == true) {
        document.querySelector("#neutral_container").classList.add("neutralDefault");
    }


    document.querySelector("#easyMode").classList.add("hide");
document.querySelector("#mediumMode").classList.add("hide");
document.querySelector("#hardMode").classList.add("hide");
}

function startGame() {
    console.log("game has begun");

    document.querySelector("#easyMode").classList.remove("show");
    document.querySelector("#easyMode").classList.add("hide");
    document.querySelector("#mediumMode").classList.remove("show");
    document.querySelector("#mediumMode").classList.add("hide");
    document.querySelector("#hardMode").classList.remove("show");
    document.querySelector("#hardMode").classList.add("hide");

    //Skjul og gør at man ikke kan klikke på difficulty knapperne
    /*document.querySelector("#easyMode").classList.remove("show");
document.querySelector("#easyMode").removeEventListener("click", difficulty1);*/

    //Spil musik starter
    document.querySelector("#musik").play();
    document.querySelector("#musik").volume = 0.2;

    //Skjul startskærm
    document.querySelector("#start").classList.remove("show");
    document.querySelector("#start").offsetHeight;
    document.querySelector("#start").classList.add("hide");

    //Gør at man ikke kan klikke på startknappen igen og skjul den
    document.querySelector("#startButton").removeEventListener("click", startGame);
    document.querySelector("#startButton").classList.add("hide");

    //Vis spilskærm
    document.querySelector("#game_background").classList.remove("hide");

    //Nulstil point, tid og liv
    points = 0;
    liv = 3;
    time = 0;
    addNeutral = 0;

    //Udregn en random position
    rand = Math.floor(Math.random() * 4);
    this.classList.add("pos" + rand + "Gris");

    //Giv altid den første gris en random position i starten af spillet
    document.querySelector("#neutral_container0").classList.add("pos" + rand + "Gris");

    //start tid TODO: timescale bliver ikke brugt
    document.querySelector("#time_container").classList.remove("hide");
    document.querySelector("#time_board").classList.add("timeScale");
    document.querySelector(".timeScale").classList.remove("pausing");

    //vis liv
    document.querySelector("#energy_board").classList.add("liv" + liv);

    //vis points
    document.querySelector("#score_board").innerHTML = points;

    //Start animationen fra-venstre-til-højre på gris TODO: add flere elementer
    document.querySelector("#neutral_container0").classList.add("rightToLeftMovingGris");

    //Start animationen fra-højre-til-venstre på raptor ELLER Start animationen fra-venstre-til-højre på raptor
    document.querySelector("#enemy_container0").classList.add("rightToLeftMovingRaptor");

    //klik på gris -> klikGris
    document.querySelector("#neutral_container0").addEventListener("click", klikGris);
    document.querySelector("#neutral_container1").addEventListener("click", klikGris);
    document.querySelector("#neutral_container2").addEventListener("click", klikGris);
    document.querySelector("#neutral_container3").addEventListener("click", klikGris);
    document.querySelector("#neutral_container4").addEventListener("click", klikGris);

    //klik på raptor -> klikRaptor
    document.querySelector("#enemy_container0").addEventListener("click", klikRaptor);

    //Når gris eller raptor når til enden af skærmen -> nyPosition TODO: få den til at gøre det

    //Fejlen findes her med vinderskærm hvor den kører i baggrunden og inde i resetPosition funktionen
    document.querySelector("#neutral_container0").addEventListener("animationend", resetPositionGris);
    document.querySelector("#neutral_container1").addEventListener("animationend", resetPositionGris);
    document.querySelector("#neutral_container2").addEventListener("animationend", resetPositionGris);
    document.querySelector("#neutral_container3").addEventListener("animationend", resetPositionGris);
    document.querySelector("#neutral_container4").addEventListener("animationend", resetPositionGris);

    //Få ny raptor til at komme ind når den kommer uden for skærmen.
    document.querySelector("#enemy_container0").addEventListener("animationend", resetPositionRaptor);
    document.querySelector("#enemy_sprite0").addEventListener("animationend", resetPositionRaptor);

    //tiden stopper og aktiverer boolean der gør at spillet stopper
    document.querySelector("#time_board").addEventListener("animationend", timesUp);

    //Når man klikker på grisen --> så sæt ny gris ind


    document.querySelector("#neutral_container0").classList.remove("pausing");
    document.querySelector("#neutral_container1").classList.remove("pausing");
    document.querySelector("#neutral_container2").classList.remove("pausing");
    document.querySelector("#neutral_container3").classList.remove("pausing");
    document.querySelector("#neutral_container4").classList.remove("pausing");
}

function klikGris() {
    console.log("gris clicked");
    if (addNeutral < 4) {
        addNeutral++;
    }
    console.log(addNeutral);

    //afspiller oink lyd når man klikker en gris
    document.querySelector("#oink").play();
    document.querySelector("#oink").volume = 0.5;
    document.querySelector("#oink").currentTime = 0;

    //Gør så man ikke kan klikke på grisen flere gange
    this.removeEventListener("click", klikGris);

    //Grisen frys eksisterende position,
    this.classList.add("pausing");

    //Gris fader ud
    this.lastElementChild.classList.add("fadingDown");

    //Man får flere points når man klikker på grisene
    points++;

    //Vis samlet antal point
    document.querySelector("#score_board").innerHTML = points;

    //Afspil oink-lyd

    //fade animationen er færdig -> resetPositionGris

    //[20 point] -> stopSpillet
    if (10 == points) {
        stopSpillet();
        levelComplete();

        //Stop tiden så man ikke kan tabe efter man har vundet
        document.querySelector("#time_board").removeEventListener("animationend", timesUp);
        document.querySelector("#time_board").classList.remove("timeScale");
    }

    //Når du klikker på en gris så aktiverer sætter den en ny ind
    if (addNeutral < 4) {
        document.querySelector("#neutral_container" + addNeutral).classList.add("rightToLeftMovingGris");
    }
}

function klikRaptor() {
    console.log("raptor clicked");

    //Når man klikker på raptoren så laver den et brøl
    document.querySelector("#raptor_dead").play();

    //Gør så man ikke kan klikke på raptoren flere gange
    document.querySelector("#enemy_container0").removeEventListener("click", klikRaptor);

    //frys eksisterende position
    document.querySelector("#enemy_container0").classList.add("pausing");

    //Gør så den fader op og forsvinder
    document.querySelector("#enemy_sprite0").classList.add("fadingUp");

    //Raptoren fader ud og bliver større
    document.querySelector("#enemy_sprite0").classList.add("clickThrough");

    //Fjern liv før variablen ændrer sig og så tilføj den efterfølgende
    document.querySelector("#energy_board").classList.remove("liv" + liv);

    //liv--
    liv--;

    //Vis liv
    document.querySelector("#energy_board").classList.add("liv" + liv);

    //Afspil brøle-lyd

    //fade animationen er færdig -> resetPositionRaptor

    //[ingen liv tilbage] -> stopSpillet
    if (liv <= 0) {
        stopSpillet();
        gameOver();

        //Stop tiden så man ikke kan tabe efter man har tabt IGEN
        document.querySelector("#time_board").removeEventListener("animationend", timesUp);
        document.querySelector("#time_board").classList.remove("timeScale");
    }
}

function resetPositionGris() {
    console.log("position reset gris");

    //Giv grisen en ny (random) position uden for skærmen
    this.classList.remove("pos0Gris");
    this.classList.remove("pos1Gris");
    this.classList.remove("pos2Gris");
    this.classList.remove("pos3Gris");
    this.classList.remove("pos4Gris");

    //Få grisen til at bevæge sig igen
    this.classList.remove("pausing");

    //Vis gris igen
    this.lastElementChild.classList.remove("fadingDown");

    //Få gris til at unpause
    this.classList.remove("pausing");

    //fjern tidligere postioner på neutral_container0
    this.classList.remove("pos0Gris");

    //neutral_container1
    this.classList.remove("pos1Gris");

    //neutral_container2
    this.classList.remove("pos2Gris");

    //neutral_container3
    this.classList.remove("pos3Gris");

    //neutral_container4
    this.classList.remove("pos4Gris");

    rand = Math.floor(Math.random() * 4);
    this.classList.add("pos" + rand + "Gris");

    //Få gris til at bevæge sig igen
    this.classList.remove("rightToLeftMovingGris");
    this.offsetHeight;
    this.classList.add("rightToLeftMovingGris");

    //position er reset -> klikGris
    this.addEventListener("click", klikGris);

}

function resetPositionRaptor() {
    console.log("position reset raptor");

    //TODO (extra challenge): Giv raptoren en ny (random) position uden for skærmen højre eller venstre

    //Få raptor til at unpause
    document.querySelector("#enemy_container0").classList.remove("pausing");

    //Få raptoren til at bevæge sig igen
    document.querySelector("#enemy_container0").classList.remove("rightToLeftMovingRaptor");
    document.querySelector("#enemy_container0").offsetHeight;
    document.querySelector("#enemy_container0").classList.add("rightToLeftMovingRaptor");

    //position er reset -> klikRaptor
    document.querySelector("#enemy_container0").addEventListener("click", klikRaptor);


    //Vis anden del af raptoren igen
    document.querySelector("#enemy_sprite0").classList.remove("fadingUp");

    //Vis raptor igen
    document.querySelector("#enemy_sprite0").classList.remove("hide");
    document.querySelector("#enemy_sprite0").classList.remove("clickThrough");
}

function nyPosition() {
    console.log("new position. Element reached end of screen");

    //Gør at man kan klikke på den igen
    this.addEventListener("click", klikGris);

    //fjern tidligere position fra grisen
    this.classList.remove("pos0Gris");
    this.classList.remove("pos1Gris");
    this.classList.remove("pos2Gris");
    this.classList.remove("pos3Gris");
    this.classList.remove("pos4Gris");

    //Udregn ny position
    rand = Math.floor(Math.random() * 3);
    this.classList.add("pos" + rand + "Gris");

    //Fjerner fading animationen fra raptoren
    this.firstElementChild.classList.remove("fadingUp");

    //TODO: de her comments nedenunder?
    //Vis gris igen

    //Vis raptor igen
}

function stopSpillet() {
    console.log("animation stops");

    //Stop musik
    document.querySelector("#musik").pause();
    document.querySelector("#musik").load();

    //Fjerner at den lytter efter animation end
    document.querySelector("#neutral_container0").removeEventListener("animationend", resetPositionGris);
    document.querySelector("#neutral_container1").removeEventListener("animationend", resetPositionGris);
    document.querySelector("#neutral_container2").removeEventListener("animationend", resetPositionGris);
    document.querySelector("#neutral_container3").removeEventListener("animationend", resetPositionGris);
    document.querySelector("#neutral_container4").removeEventListener("animationend", resetPositionGris);

    //Stop alle animationer raptor
    document.querySelector("#enemy_container0").removeEventListener("animationend", resetPositionRaptor);
    document.querySelector("#enemy_container0").classList.remove("rightToLeftMovingRaptor");
    document.querySelector("#enemy_container0").classList.add("pausing");


    //Stop alle animationer gris
    /*
        this.classList.add("pausing");*/ //linje 322 Kan måske bruges til glitchmode
    document.querySelector("#neutral_container0").classList.add("pausing");
    document.querySelector("#neutral_container1").classList.add("pausing");
    document.querySelector("#neutral_container2").classList.add("pausing");
    document.querySelector("#neutral_container3").classList.add("pausing");
    document.querySelector("#neutral_container4").classList.add("pausing");

    document.querySelector("#neutral_container0").classList.remove("rightToLeftMovingGris");
    document.querySelector("#neutral_container1").classList.remove("rightToLeftMovingGris");
    document.querySelector("#neutral_container2").classList.remove("rightToLeftMovingGris");
    document.querySelector("#neutral_container3").classList.remove("rightToLeftMovingGris");
    document.querySelector("#neutral_container4").classList.remove("rightToLeftMovingGris");

    //Fjern alle eventlisteners
    this.removeEventListener("click", klikGris);

    //Når animationerne er stoppet -> levelComplete ELLER gameOver
}

function levelComplete() {
    console.log("levelComplete");
    //Skriv “Level complete - du fik XX point” ud i konsollen.
    console.log("Tillykke du fik " + points);

    //spil musik for når man vinder
    document.querySelector("#winning").play();
    document.querySelector("#winning").volume = 0.05;

    //Vis vinder skærm
    //document.querySelector("#neutral_container0").removeEventListener("animationend", resetPositionGris);
    document.querySelector("#level_complete").classList.remove("hide");
    document.querySelector("#level_complete").classList.add("show");
    document.querySelector("#game_background").classList.add("hide");

    document.querySelector("#neutral_container0").classList.remove("rightToLeftMovingGris");
    document.querySelector("#neutral_container1").classList.remove("rightToLeftMovingGris");
    document.querySelector("#neutral_container2").classList.remove("rightToLeftMovingGris");
    document.querySelector("#neutral_container3").classList.remove("rightToLeftMovingGris");
    document.querySelector("#neutral_container4").classList.remove("rightToLeftMovingGris");

    //RestartButton
    document.querySelector("#restartButton_levelComplete").addEventListener("click", restarting);
    document.querySelector("#restartButton_levelComplete").addEventListener("click", startGame);

    //Imidlertidig fix af bug der gør at restart knappen får positionerne fra grisene. Sikkert fordi man bruger this. Så giver en position ligemeget hvad man klikker på.
    document.querySelector("#restartButton_levelComplete").classList.remove("pos0Gris");
    document.querySelector("#restartButton_levelComplete").classList.remove("pos1Gris");
    document.querySelector("#restartButton_levelComplete").classList.remove("pos2Gris");
    document.querySelector("#restartButton_levelComplete").classList.remove("pos3Gris");
    document.querySelector("#restartButton_levelComplete").classList.remove("pos4Gris");

    //Skjul tiden
    document.querySelector("#time_board").classList.add("hide");
    document.querySelector("#time_container").classList.add("hide");
}

function gameOver() {
    console.log("gameOver");

    //spil musik for når man taber
    document.querySelector("#losing").play();
    document.querySelector("#losing").volume = 0.05;

    //Skriv “Game over - du fik XX point” ud i konsollen.
    console.log("Desværre du fik kun " + points);

    //Vis taberskærm
    document.querySelector("#game_over").classList.remove("hide");
    document.querySelector("#game_over").classList.add("show");
    document.querySelector("#game_background").classList.add("hide");

    //Stop tiden

    //RestartButton
    document.querySelector("#restartButton_gameOver").addEventListener("click", restarting);
    document.querySelector("#restartButton_gameOver").addEventListener("click", startGame);


    //Imidlertidig fix af bug der gør at restart knappen får positionerne fra grisene. Sikkert fordi man bruger this. Så giver en position ligemeget hvad man klikker på.
    document.querySelector("#restartButton_gameOver").classList.remove("pos0Gris");
    document.querySelector("#restartButton_gameOver").classList.remove("pos1Gris");
    document.querySelector("#restartButton_gameOver").classList.remove("pos2Gris");
    document.querySelector("#restartButton_gameOver").classList.remove("pos3Gris");
    document.querySelector("#restartButton_gameOver").classList.remove("pos4Gris");
}

function timesUp() {
    console.log("TIMES UP");
    timeEnded = true;

    //[Vent 1 min] -> stopSpillet
    if (timeEnded == true) {
        stopSpillet();
        gameOver();
    }
}

function restarting() {
    console.log("restarting triggered");

    restart = true;

    document.querySelector("#neutral_container0").classList.remove("rightToLeftMovingGris");
    document.querySelector("#neutral_container1").classList.remove("rightToLeftMovingGris");
    document.querySelector("#neutral_container2").classList.remove("rightToLeftMovingGris");
    document.querySelector("#neutral_container3").classList.remove("rightToLeftMovingGris");
    document.querySelector("#neutral_container4").classList.remove("rightToLeftMovingGris");

    if (restart == true) {

        //stop taber musik
        document.querySelector("#losing").pause();
        document.querySelector("#losing").load();

        //stop vinder musik
        document.querySelector("#winning").pause();
        document.querySelector("#winning").load();

        //Fjern vinder- og taberskærm
        document.querySelector("#game_over").classList.remove("show");
        document.querySelector("#game_over").classList.add("hide");
        document.querySelector("#level_complete").classList.remove("show");
        document.querySelector("#level_complete").classList.add("hide");

        //genstart animationer
        document.querySelector("#enemy_container0").classList.remove("pausing");
        this.classList.remove("pausing");

        document.querySelector("#neutral_sprite0").classList.remove("fadingDown");
        document.querySelector("#neutral_sprite1").classList.remove("fadingDown");
        document.querySelector("#neutral_sprite2").classList.remove("fadingDown");
        document.querySelector("#neutral_sprite3").classList.remove("fadingDown");
        document.querySelector("#neutral_sprite4").classList.remove("fadingDown");

        //fjern clickthrough fra raptor
        document.querySelector("#enemy_sprite0").classList.remove("fadingUp");
        document.querySelector("#enemy_sprite0").classList.remove("clickThrough");

        //restart timer animation
        document.querySelector("#time_board").classList.remove("timeScale");
        document.querySelector("#time_board").offsetHeight;
        document.querySelector("#time_board").classList.add("timeScale");

        //Restart liv
        document.querySelector("#energy_board").classList.remove("liv0");
        document.querySelector("#energy_board").classList.remove("liv1");
        document.querySelector("#energy_board").classList.remove("liv2");

        //Vis tid igen
        document.querySelector("#time_board").classList.remove("hide");
        document.querySelector("#time_container").classList.remove("hide");
    }
}

function difficulty1() {
    console.log("difficulty1");

    difficultyEasy = true;

    if (difficultyEasy == true) {
        difficultyMedium = false;
        difficultyHard = false;
    }

    document.querySelector(".timeScale").classList.remove("defaultTime");
    document.querySelector(".timeScale").classList.add("difficulty_level_1")
    document.querySelector(".timeScale").classList.add("pausing");

}

function difficulty2() {
    console.log("difficulty2");

    difficultyMedium = true;

    if (difficultyMedium == true) {
        difficultyEasy = false;
        difficultyHard = false;
    }

    document.querySelector(".timeScale").classList.remove("defaultTime");
    document.querySelector(".timeScale").classList.add("difficulty_level_2")
    document.querySelector(".timeScale").classList.add("pausing");
}

function difficulty3() {
    console.log("difficulty3");

    difficultyHard = true;

    if (difficultyHard == true) {
        difficultyEasy = false;
        difficultyMedium = false;
    }

    document.querySelector(".timeScale").classList.remove("defaultTime");
    document.querySelector(".timeScale").classList.add("difficulty_level_3")
    document.querySelector(".timeScale").classList.add("pausing");

    document.querySelector("#neutral_container").classList.add("neutralHard");
}

function setDefaultTime() {
    document.querySelector(".timeScale").classList.add("defaultTime");
}
