
amount = document.getElementById('amount');
button = document.getElementById('button');
positionTitleInput = document.getElementById('position-title');

button.onclick = function () {

    // Send query up via ajax
    query = positionTitleInput.value;
    if (query) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function(res) {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                // Update page with new result
                res = JSON.parse(httpRequest.responseText);
                amount.textContent = res.result;
            }
        };
        httpRequest.open('GET', 'http://localhost:3000/employee/average-salary?title=' + query, true);
        httpRequest.send(null)
    }
    else {
        amount.textContent = '$0';
    }
};
