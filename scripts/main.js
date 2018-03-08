var myHeading = document.getElementById("headerID");
myHeading.innerHTML = 'Hello world! v4';

var yqlCallback = function(data) {
    var rawData = document.getElementById("rawData")
    
    var entries = data.query.results.entry;
    var num_entries = entries.length;
    
    var output = '';
    for (var i = 0; i < num_entries; i++){
        var id = entries[i].id;
        var content = entries[i].content;
        
        output += id + ' - ' + content + '<br/>';
    }
    
    rawData.innerHTML = data.query.results.feed.title.content;
  };

