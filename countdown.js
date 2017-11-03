document.addEventListener('DOMContentLoaded', function () {

    'use strict';

    var timerBt = document.querySelector('.countdown-container .start-button'),
        stopBt = document.querySelector('.countdown-container .stop-button'),
        countDownContainer = document.querySelector('.countdown-container');

    timerBt.addEventListener('click', startClock);
    stopBt.addEventListener('click', stopClock);

    countDownContainer.classList.add('fade-in');

    //calculates the time remaining
    function getTimeRemaining(endtime) {

        var totalTime = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((totalTime / 1000) % 60),
            minutes = Math.floor((totalTime / 1000 / 60) % 60),
            hours = Math.floor((totalTime / (1000 * 60 * 60)) % 24),
            days = Math.floor(totalTime / (1000 * 60 * 60 * 24));

        //return the data as a reusable object
        return {
            'total': totalTime,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    //outputs timer data to html
    function initializeClock(id, endtime) {

        var clock = document.getElementById(id),
            daysSpan = clock.querySelector('.days'),
            hoursSpan = clock.querySelector('.hours'),
            minutesSpan = clock.querySelector('.minutes'),
            secondsSpan = clock.querySelector('.seconds');

        function updateClock() {

            var totalTime = getTimeRemaining(endtime);

            daysSpan.innerHTML = totalTime.days;
            hoursSpan.innerHTML = ('0' + totalTime.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + totalTime.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + totalTime.seconds).slice(-2);

            //timer end - fadein start button and play audio
            if (totalTime.total <= 0) {

                clearInterval(timeinterval);
                toggleButtons();

                var audio = new Audio('http://soundbible.com/grab.php?id=1954&type=mp3');
                audio.play();

                timerBt.childNodes[1].innerHTML = "START";

            }

        }

        updateClock();
        window.timeinterval = setInterval(updateClock, 1000);

    }

    function startClock() {

        //takes the current time and adds minutes
        var
            timeInMinutes = 1,
            currentTime = Date.parse(new Date()),
            deadline = new Date(currentTime + timeInMinutes * 60 * 1000);

        //initialize the clock countdown
        initializeClock('countdown', deadline);

        timerBt.classList.remove('fade-in');
        timerBt.classList.add('fade-out');
        stopBt.classList.remove('fade-out');
        stopBt.classList.add('fade-in');

        return false;

    }

    function stopClock() {

        clearInterval(timeinterval);
        toggleButtons();
        timerBt.childNodes[1].innerHTML = "START OVER";

        return false;

    }

    function toggleButtons() {

        timerBt.classList.remove('fade-out');
        timerBt.classList.add('fade-in');
        stopBt.classList.remove('fade-in');
        stopBt.classList.add('fade-out');

    }

});