function toggleForm() {
    var form = document.getElementById("feedbackForm");
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}


$(document).ready(function(){
    var errorContainer = $('#error-container');

    $("#connection").submit(function(event){
        event.preventDefault();
        errorContainer.empty();
        var formData = {
            'name' : $('input[name=name]').val(),
            'email' : $('input[name=email]').val(),
            'comment' : $('textarea[name=comment]').val()
        };

        if (!formData.name || !formData.email || !formData.comment) {
            errorContainer.text('Пожалуйста, заполните все поля формы.');
            return;
        }
        $.ajax({
            type: 'POST',
            url: '/your-server-endpoint',
            data: formData,
            dataType: 'json',
            encode: true
        })
        .done(function(data){
            console.log(data);
        })
        .fail(function(xhr){
            errorContainer.text('Я всё ещё не знаю php: ' + xhr.statusText);
        });
    });
});







$(document).ready(function(){
    var menu = $(".navigation-menu");
    var offset = menu.offset().top;

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= offset) {
            menu.addClass("fixed");
        } else {
            menu.removeClass("fixed");
        }
    });
});

$(document).ready(function() {
    const navigationPanel = $('.navigation-panel');
    const form = $('#feedbackForm');

    $(document).mousemove(function(event) {
        if (event.clientX < 300 && !form.is(':visible')) { 
            navigationPanel.fadeIn('slow');
        } else {
            navigationPanel.fadeOut('slow');
        }
    });
});



function showResults() {

    var answers = {
        question1: getSelectedValue("question1"),
        question2: getSelectedValue("question2"),
        question3: getSelectedValue("question3"),
        question4: getSelectedValue("question4"),
        question5: getSelectedValue("question5"),
        question6: getSelectedValue("question6")
    };


    var correctAnswers = {
        question1: "answer2",
        question2: "answer3",
        question3: "answer3",
        question4: "answer1",
        question5: "answer2",
        question6: "answer1"
    };

    var score = 0;
    for (var question in correctAnswers) {
        if (correctAnswers.hasOwnProperty(question)) {
            if (answers[question] === correctAnswers[question]) {
                score++;
            }
        }
    }

    alert("Вы набрали " + score + " из " + Object.keys(correctAnswers).length + " правильных ответов.");
}

function getSelectedValue(questionName) {
    var selectedOption = document.querySelector('input[name="' + questionName + '"]:checked');
    return selectedOption ? selectedOption.value : null;
}
