
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        initialDate: '2023-01-03',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: '/api/appointments',

    });
    
    calendar.render();
});
$( function() {
    $( "#datepicker" ).datepicker({
        dateFormat: 'yy-mm-dd'
    });
    } 
    )

