async function addEvents(){
    try {
        const res = await fetch('/api/appointments',)
        console.log(res.json);
        return await res.json();
        
        
    } catch (error) {
        console.log(error);
    }
    
};
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
        events: [],

    });
    
    calendar.render();
});
$( function() {
    $( "#datepicker" ).datepicker();
    } 
    )

