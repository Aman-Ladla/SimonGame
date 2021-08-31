let answer = [];

let question = [];

let arr = ["red","green","blue","yellow"];

let score = 0;

//Functions
async function ifCorrect() {
    question.push(arr[Math.floor(Math.random() * arr.length)]);

    for (let i = 0; i < question.length; i++) {
        await new Promise(done => setTimeout(() => done(), 500));
        $("div ." + question[i]).addClass("pressed");
        setTimeout(function () {
                $("div ." + question[i]).removeClass("pressed");
            },
            100
        );
    }
}

async function conds() {

    if(answer.length === question.length){

        if (question[question.length - 1] === answer[answer.length - 1]) {
            let mySound = new Audio('sounds/' + answer[answer.length - 1] + '.mp3');
            await mySound.play();
            score++;
            $("h1").text("Score " + score);
            await ifCorrect();
            answer = [];
        }
        else{
            let mySound = new Audio('sounds/wrong.mp3')
            await mySound.play();
            $("h1").text("You Lost. Press A to restart");

            $("body").addClass("game-over");
            setTimeout(function (){
                    $("body").removeClass("game-over");
                },
                100
            );

            unbinding();
        }
    }
    else{
        if (question[answer.length - 1] === answer[answer.length - 1]) {
            let mySound = new Audio('sounds/' + answer[answer.length - 1] + '.mp3');
            await mySound.play();
        }
        else{
            let mySound = new Audio('sounds/wrong.mp3')
            await mySound.play();
            $("h1").text("You Lost. Press A to restart");
            $("body").addClass("game-over");
            setTimeout(function (){
                    $("body").removeClass("game-over");
                },
                100
            );
            unbinding();

        }
    }
}

function unbinding(){
    $("div .red").unbind("click");
    $("div .green").unbind("click");
    $("div .blue").unbind("click");
    $("div .yellow").unbind("click");
}

function addingListeners(color){
    $("div ." + color).click(async function (){
        $("div ." + color).addClass("pressed");
        setTimeout(function (){
                $("div ." + color).removeClass("pressed");
            },
            100
        );
        answer.push(color);

        await conds();


    });
}



//Start with Event Listeners

$(document).keypress(async function (e){

    if(e.key === 'a' || e.key === 'A'){

        score = 0;
        question = [];
        answer = [];

        $("h1").text("Score 0");


        //Init

        unbinding();

        await new Promise(done => setTimeout(() => done(), 500));

        question.push(arr[Math.floor(Math.random()*arr.length)]);

        $("div ." + question[0]).addClass("pressed");
        setTimeout(function (){
                $("div ." + question[0]).removeClass("pressed");
            },
            100
        );


        //Event Listeners

        addingListeners("red");

        addingListeners("green");

        addingListeners("blue");

        addingListeners("yellow");


        }

});