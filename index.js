function getText(data){
    if (!data.is_product && data.is_store) 
        return "Oops! Agora você deve escrever apenas sobre o produto. " +
               "Você vai poder falar sobre a loja depois.";
    else
        return "Ótimo! Esse é um review somente de produto!"; 
}

function checkReview() {
    $('#result').text('...');
    $('#error').text('');
    $('#comment-text').removeClass('error');

    $.ajax({
        type: "POST",
        data: JSON.stringify({ 
            "comment": $('#comment-text').val() 
        }),
        url: 'https://rambo-trustvox.herokuapp.com/sentiment/comments/',
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        processData: true,
        success: function (data) {
            console.log(data);

            $('#result').text(getText(data));
            $('#result-box').removeClass('hide');
        },
        error: function (data) {
            $('#comment-text').addClass('error');
            $('#error').text(data.responseJSON.comment.join(' / '));
            $('#result-box').addClass('hide');
        }
    });
}