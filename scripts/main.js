var myHeading = document.getElementById("headerID");
myHeading.innerHTML = 'Hello world! v5';

var yqlCallback = function(data) {
    var rawData = document.getElementById("rawData")
    
    var entries = data.query.results.feed.entry;
    var num_entries = entries.length;
    
    var output = '';
    for (var i = 0; i < num_entries; i++)
    {
        var id = entries[i].id;
        output += id + ' - ';
        
        var entry_children = entries[i].content.properties;
        var num_children = entry_children.length;
        
        for (var j = 0; j < num_children; j++)
        {
            output += entry_children[j] + ' > ' + entry_children[j].content + '<br />';
        }            
    }
    
    rawData.innerHTML = output;
  };

