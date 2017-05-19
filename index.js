// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }

  return xhr;
}

function getFormData(){
    var data = new FormData();
    data.append('comment', $('#comment-text').val());

    return data;
}

function getText(data){
    var result = [];

    if (data.is_product) result.push("Produto");
    if (data.is_store) result.push("Loja");

    return result.join(' e ');  
}

// Make the actual CORS request.
function checkReview() {
  // This is a sample server that supports CORS.
  var url = 'https://rambo-trustvox.herokuapp.com/sentiment/comments/';

  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    console.log('CORS not supported');

    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var data = JSON.parse(xhr.responseText);
    console.log(data);
    
    $('#result').text(getText(data));
    $('.box').removeClass('hide');
  };

  xhr.onerror = function() {
    console.err('Woops, there was an error making the request.');
  };

  xhr.send(getFormData());
}
