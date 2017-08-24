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
            if(data.is_store)
                $('#result').addColors('#ebd1d1')
            else
                $('#result').addColors('#d6f0cf')
        },
        error: function (data) {
            $('#comment-text').addClass('error');
            $('#error').text(data.responseJSON.comment.join(' / '));
            $('#result-box').addClass('hide');
        }
    });
}
