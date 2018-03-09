// form URL
var base_yql_query = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'http%3A%2F%2Fdata.treasury.gov%2Ffeed.svc%2FDailyTreasuryYieldCurveRateData"

var base_url = "%3F%24filter%3D";
var trailing_query = "'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&maxage=7200&callback=yqlCallback";
var today = new Date();
var yesterday = new Date(today); // last business day's data is most recent

// get day from today's date which be between 0-6 (0 is Sunday and 6 is Saturday
var bd = today.getDay();
if (bd < 2)
{
  if (bd === 0)
  {
    bd = 2;
  }
  else
  {
    bd = 3;
  }
}
else
{
  bd = 1;
}
 //variable lbd will get the last business day by reducing the calculated lbd from today's date

yesterday.setDate(today.getDate() - bd);

var dd = yesterday.getDate();
var mm = yesterday.getMonth() + 1; // January is 0
var yyyy = yesterday.getFullYear();

var day_filter = 'day(NEW_DATE)%2520eq%2520' + dd;
var month_filter = 'month(NEW_DATE)%2520eq%2520' + mm;
var year_filter = 'year(NEW_DATE)%2520eq%2520' + yyyy;

base_url += day_filter + '%2520and%2520' + month_filter + '%2520and%2520' + year_filter;

var total_query = base_yql_query + base_url + trailing_query;

var yqlCallback = function(data)
{
  var rawData = document.getElementById("rawData")
  
  // Get the entries from the XML
  var entry = data.query.results.feed.entry;

  var dateLabels = [];
  var interestLabels = [];
  var BCDataSets = [];

  // Parse through the raw entries (5 entries for different dates)
  var date = entry.content.properties.NEW_DATE.content;
  dateLabels.push(date);
  
  // Extract the child entries from a date
  var entry_children = entry.content.properties;
  
  var dataSet = [];

  var twoYear = 0;
  var tenYear = 0;

  // Parse through the child entries ("BC_*")
  for (var key in entry_children)
  {
    // Only bother if it has a timeframe
    if (key.includes("BC_"))
    {
      // Sanity check
      if (entry_children.hasOwnProperty(key))
      {
        var timeString = key.substring(3)
        interestLabels.push(timeString);

        var child = entry_children[key];
        dataSet.push(child.content);
        
        // Check for two year and ten year rates
        if (key.includes("BC_2YEAR"))
        {
          twoYear = child.content;
        }
        if (key.includes("BC_10YEAR"))
        {
          tenYear = child.content;
        }
      }
    }
  }
  BCDataSets.push(dataSet);
  // Compile colors
  var colors = [
    'rgba(0,150,150,0.8)',
    'rgba(0,255,0,0.8)',
    'rgba(0,0,255,0.8)',
    'rgba(150,150,0,0.8)',
    'rgba(255,0,0,0.8)',
    'rgba(150,0,150,0.8)'
  ];
  
  
  // Compile datasets
  var dataSets = [];
  for (i = 0; i < dateLabels.length; i++)
  {
    var daySet = {
      label: dateLabels[i],
      data: BCDataSets[i],
      borderColor: colors[i],
      backgroundColor: 'rgba(0,0,0,0)'
    }
    dataSets.push(daySet);
  }
  
  // Chart options
  var chartOptions = {
    title: {
      display: true,
      text: 'Treasury Dept Yields',
      fontSize: 30
    },
    scales: {
      xAxes: [{
        ticks:{
          autoSkip: false,
          fontSize: 18
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: false,
          autoSkip: false
        }
      }]
    }
  };
  
  // Create chart
  var ctx = document.getElementById("lineChart");
  var lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: interestLabels,
      datasets: dataSets,
    },
    options: chartOptions
  });
  
  
  // Now modify header to answer question of flat yield curve
  var myHeading = document.getElementById("responseHeader");
  if (tenYear <= twoYear)
  {
    myHeading.innerHTML = 'YES';
  }
  else
  {
    myHeading.innerHTML = 'NO';
  }
  
};

$.getScript(total_query);
