$(document).ready(function () {
  // Get the current date using Day.js
  var currentDay = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDay);

  // Function to update time-blocks based on the current time
  function updateBlocks() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // Remove old classes to reset colors
      $(this).removeClass("past present future");

      // Add the appropriate class based on the current hour
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  // Load events from local storage and display them in time-blocks
  function loadEvents() {
    $(".time-block").each(function () {
      var blockHour = $(this).attr("id");
      var event = localStorage.getItem(blockHour);

      if (event) {
        $(this).find(".description").val(event);
      }
    });
  }

  // Save event to local storage when the save button is clicked
  $(".saveBtn").on("click", function () {
    var blockHour = $(this).parent().attr("id");
    var event = $(this).siblings(".description").val();

    localStorage.setItem(blockHour, event);
  });

  // Call the functions to update time-blocks and load events
  updateBlocks();
  loadEvents();
});
