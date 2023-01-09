async function eventFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('#event-title').value.trim();
    const location= document.querySelector('#event-location').value.trim();
    const start_date = document.querySelector('#datepicker').value.trim();
    const event_name = document.querySelector('#event-creator').value.trim();
    const description = document.querySelector('#event-des').value.trim();
    const start_time = document.querySelector('#event-start-time').value.trim();
    const start = start_date + start_time;
    if (title && location && start && event_name && description && start_time) {
      const response = await fetch(`/api/appointments`, {
        method: 'POST',
        body: JSON.stringify({ 
          title,
          location,
          start, 
          start_time,
          event_name,
          description 
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('appointment made');
      } else {
        alert('Failed to create appointment');
        
      }
    }
    
};
document.getElementById('postBtn').addEventListener('click', eventFormHandler);
