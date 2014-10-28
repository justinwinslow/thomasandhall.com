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

$.get('key.json').done(function(response){
  key = response.key;

  $eventsDefer = getEvents();

  $eventsDefer.done(function(response){
    // console.log(response);
    $(document).ready(function(){
      var $cal = $('.calendar ul');
      var itemTemplate = _.template($('#template-calendar-item').text());

      $.each(response.items, function(index, item){
        // console.log(item);
        var $li = $(itemTemplate(item));

        $cal.append($li);
      });
    });
  });
});
