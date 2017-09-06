function getText(data){
    if (data.is_store)
        return "Esse review contém comentários sobre loja, atendimento ou entrega.";
    else
        return "Ótimo! Esse é um review somente de produto!"; 
}

function checkReview() {
    $('#result').text('...');
    $('#error').text('');
    $('#comment-text').removeClass('error');
    $('#result-box').css('background', '#f8f8f8')
    $('#result-box').removeClass('hide');


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
            result = getText(data);

            $('#result').text(result);
            $('#result-box').removeClass('hide');
            if(result == "Esse review contém comentários sobre loja, atendimento ou entrega.")
                $('#result-box').css('background', '#ebd1d1');
            else
                $('#result-box').css('background', '#d6f0cf');
        },
        error: function (data) {
            $('#comment-text').addClass('error');
            $('#error').text(data.responseJSON.comment.join(' / '));
            $('#result-box').addClass('hide');
        }
    });
}
