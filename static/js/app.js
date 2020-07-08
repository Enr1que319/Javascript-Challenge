// from data.js
var tableData = data;
 
// YOUR CODE HERE!
var table = d3.select("table");
var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var reset_button = d3.select("#reset-btn");
var selector = d3.select("#selector");

function row_app(data){
    data.map( item => { 


        var row = tbody.append("tr");
    
        row.append("td").text(item.datetime);
        row.append("td").text(item.city);
        row.append("td").text(item.state);
        row.append("td").text(item.country);
        row.append("td").text(item.shape);
        row.append("td").text(item.durationMinutes);
        row.append("td").text(item.comments);
    
    })
}

function runEnter() {

    d3.event.preventDefault();

    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");
    var item_select = selector.property("value");

    tbody.text("");

    if (item_select == "Date") {
        var temp = [];
        var input_date = new Date(inputValue);
        var input_day = input_date.getDate();
        var input_month = input_date.getMonth();
        var input_year = input_date.getFullYear();

        tableData.map( item =>{

            var date_item = new Date(item.datetime)
            var day_item = date_item.getDate();
            var month_item = date_item.getMonth();
            var year_item = date_item.getFullYear();


            if (input_day == day_item && input_month == month_item && input_year == year_item) {
                temp.push(item);
            }
        })
        var filteredDate = temp

    } else {
        var item_low = item_select.toLowerCase();
        var inputValLow = inputValue.toLowerCase();
        var filteredDate = tableData.filter( item => item[item_low] == inputValLow );
    }


    if (filteredDate.length == 0) {
        tbody.text("No data founded");
    }
       row_app(filteredDate);

}

function change() {
    var placeHolder = d3.select("#datetime");
    var text = selector.property("value");
    
    if (text == "Date") {
        placeHolder.attr("placeholder","mm/dd/yyyy");
    } else {
        placeHolder.attr("placeholder","Insert value");
    }
}

reset_button.on("click", rset => {
    tbody.text("");
    row_app(tableData);
    d3.select("#datetime").property("value", "");
    change()
});

button.on("click", runEnter);

selector.on("change", change)

row_app(tableData);