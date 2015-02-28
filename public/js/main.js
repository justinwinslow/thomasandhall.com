var url = 'https://www.googleapis.com/calendar/v3/calendars/';
var calendar = 'rofff8a3lr670kseoioopm9ark@group.calendar.google.com';
var key;
var now = new Date().toISOString();
var $eventsDefer;

function getEvents(){
  return $.ajax({
    type: 'GET',
    url: url + calendar + '/events?key=' + key + '&timeMin=' + now,
    headers: {
      'X-JavaScript-User-Agent':  'Google APIs Explorer'
    }
  });
}

$(function() {
  $.get('key.json').done(function(response){
    key = response.key;

    $eventsDefer = getEvents();

    $eventsDefer.done(function(response){
      var shows = _.sortBy(response.items, function(item){
        return item.start.dateTime;
      });

      $(document).ready(function(){
        var $cal = $('.calendar ul');
        var itemTemplate = _.template($('#template-calendar-item').text());

        $.each(shows, function(index, item){
          // console.log(item);
          var $li = $(itemTemplate(item));

          $cal.append($li);
        });
      });
    });
  });
});
