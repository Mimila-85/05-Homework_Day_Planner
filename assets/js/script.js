// Document.ready function to make sure document object model (DOM) is ready before code is executed.
$(document).ready(function(){
    
    // Take the classes and ids from the index file that are being used in this script.
    var currentDay = $("#currentDay");
    var description = $(".description");
    var saveBtn = $(".saveBtn");
    
    // Take current date from moment.js.
    var date = moment().format("dddd, MMM Do YYYY");

    // Take current hour in the 24h format from moment.js. ParseInt to make sure we are working with numbers.
    var parseTime = parseInt(moment().format("H"));
    // console.log(parseTime);
    
    // Variables that are going to be used to store the tasks descriptions in the local storage.
    var value = "";
    var task = "";

    var today ="";

    // Display current date inside <p> tag with id #currentDay.
    currentDay.text(date);   

    initial();
    
    // Get itens from local storage. When page is refresh the events persist.
    function initial(){
       
       $(".9").text(localStorage.getItem("9"));
       $(".10").text(localStorage.getItem("10"));
       $(".11").text(localStorage.getItem("11"));
       $(".12").text(localStorage.getItem("12"));
       $(".13").text(localStorage.getItem("13"));
       $(".14").text(localStorage.getItem("14"));
       $(".15").text(localStorage.getItem("15"));
       $(".16").text(localStorage.getItem("16"));
       $(".17").text(localStorage.getItem("17"));   

       storeDay();

    }

    // Save tasks in the local storage.
    function storeTasks(){
        localStorage.setItem(value, task);
    }

    // When user clicks on save button the value of the button that matches the 24h format is saved as a key, and the description is saved as a value of this key represented by the variable task.
    saveBtn.on("click", function(event){       

        event.preventDefault();

        value = $(this).val();
        task = $(this).parent().find(description).val().trim();

        // console.log(value);
        // console.log(task);

        storeTasks();        
        
    });   

    // Call for function that color code pass, present and future hours.
    colorCode();    
   
    // Function to color code past, current, and future times. 
    function colorCode() {       

        description.each(function(){
            
            var hData = parseInt($(this).attr("name"));

            // console.log(hData);
            // console.log (hData < parseTime);
            // console.log (hData === parseTime);
            // console.log (hData > parseTime);
               
                if (hData < parseTime){
                    $(this).addClass("past");
                }
                else if (hData === parseTime){
                    $(this).addClass("present");
                }
                else if (hData > parseTime){
                    $(this).addClass("future");
                }
        });

    } 
    
    
    // Funtion that stored the current day in local storage.    
    function storeDay(){
        today = moment().format("MMM Do YYYY");
        localStorage.setItem("storeDay", today);
    }

    newDay();
    //  Function that clears the local storage once a new day is loaded.
    function newDay(){  

        var passDay = localStorage.getItem("storeDay");

        if (passDay === today){
            initial();
        }
        else {
            localStorage.clear();
        }
    }       
});

