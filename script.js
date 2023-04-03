$(document).ready(function() {
  // Displays the current date in the header of the page
  var today = dayjs();
  $('#currentDay').text(today.format('MMM D, YYYY'));

  var currentTime = dayjs().hour();
  console.log(currentTime);

  var timeContainerEl = $('#timeContainer');

  for (var i = 8; i <= 18; i++) {
    var hour = i % 12 || 12; // convert to 12-hour format
    var ampm = i < 12 ? "AM" : "PM"; // determine AM/PM
    var hourId = 'hour-' + i; // create unique id for each time block
    var hourEl = $('<div class="row time-block" id="' + hourId + '"><div class="col-2 col-md-1 hour text-center py-3">' + hour + ampm + '</div><textarea class="col-8 col-md-10 description" rows="3"></textarea><button class="btn saveBtn col-2 col-md-1"><i class="fas fa-save"></i></button></div>');

    // Color coding time blocks by past, present, or future 
    if (i < currentTime) {
      hourEl.addClass("past"); // add past class if hour has already passed
    } else if (i === currentTime) {
      hourEl.addClass("present"); // add present class if hour is current
    } else {
      hourEl.addClass("future"); // add future class if hour is in the future
    }

    // Get the saved user input from local storage and display it in the corresponding textarea
    var savedInput = localStorage.getItem(hourId);
    if (savedInput) {
      hourEl.find('.description').val(savedInput);
    }

    timeContainerEl.append(hourEl);
  }

  // Add listener for click events on the save button to save user input in local storage
  $('.saveBtn').on('click', function() {
    var hourId = $(this).parent().attr('id');
    var userInput = $(this).siblings('.description').val();
    localStorage.setItem(hourId, userInput);
    alert('Your input has been saved!');
  });
});
