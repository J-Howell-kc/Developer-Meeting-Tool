async function eventFormHandler(event) {
    event.preventDefault();
  
    const organization = document.querySelector('#organization-profile').value.trim();
    const about = document.querySelector('#about-profile').value.trim();
  
    if (organization && about) {
      const response = await fetch('/profiles', {
        method: 'post',
        body: JSON.stringify({
          organization,
          about
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        console.log('success');
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
}
  
document.querySelector('.signup-form').addEventListener('submit', eventFormHandler);