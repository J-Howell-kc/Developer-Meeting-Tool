const mEvent = document.querySelector('#modal-event');
const dEvent = document.querySelector('#modal-description');
const lEvent = document.querySelector('#modal-location');
const dateEvent = document.querySelector('#modal-date');
const sEvent = document.querySelector('#modal-start');
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
        eventClick: function(info) {
            $( "#dialog-message" ).dialog({
                modal: true,
                buttons: {
                    Ok: function() {
                        $( this ).dialog( "close" );
                    }
                }
            });
            let clickInfo = info.event._def.publicId
            async function checkId(){
                let event = await getInfo();
                for (let i = 0; i < event.length; i++) {
                    const element = event[i];
                    if (clickInfo == element.id) {
                        let eventName = 'Event: '+element.title;
                        let eventDes = 'Description: '+ element.description;
                        let eventLocation = 'Location: '+element.location;
                        let eventDate = 'Date: '+element.start;
                        let startTime = 'Start Time: '+element.start_time
                        
                        mEvent.append(eventName);
                        dateEvent.append(eventDate);
                        sEvent.append(startTime);
                        dEvent.append(eventDes);
                        lEvent.append(eventLocation);    
                    }else{
                        return;
                    }
                }

            }
            checkId();
            
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
async function getInfo() {
    let url = '/api/appointments';
    try {
        let res = await fetch(url);
       
        return await res.json();
        
    } catch (error) {
        console.log(error);
    }
}
