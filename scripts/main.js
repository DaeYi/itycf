var myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello world!';

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       document.getElementById("rawData").innerHTML = this.responseText;
    }
};
xhttp.open("GET", "http://data.treasury.gov/feed.svc/DailyTreasuryYieldCurveRateData?$filter=month(NEW_DATE)%20eq%203%20and%20year(NEW_DATE)%20eq%202018", true);
xhttp.send();
