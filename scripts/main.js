var myHeading = document.getElementById("headerID");
myHeading.innerHTML = 'Hello world! v3';

/***** DELETE THIS BLOCK IF YQL WORKS
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(this.responseText, "text/xml");
        
        myHeading.textContent = "readyState";
        
        document.getElementById("rawData").innerHTML = xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue;
    }
};
xhttp.open("GET", "http://data.treasury.gov/feed.svc/DailyTreasuryYieldCurveRateData?$filter=month(NEW_DATE)%20eq%203%20and%20year(NEW_DATE)%20eq%202018", true);
xhttp.send();
*/

var yqlCallback = function(data) {
    document.getElementById("rawData").innerHTML = data.query.results.feed.title.content;
  };

