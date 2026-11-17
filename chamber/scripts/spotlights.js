const spotlightsContainer = document.querySelector('#spotlights') || document.createElement('div');

const membersUrl = 'data/members.json';

async function getSpotlightMembers() {
  try {
    const response = await fetch(membersUrl);
    if (response.ok) {
      const data = await response.json();
      displaySpotlights(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error('Error fetching spotlight members:', error);
  }
}


function displaySpotlights(members) {
  const qualifiedMembers = members.filter(member => 
    member.membership === 'Gold' || 
    member.membership === 'Silver' || 
    member.membership === 'Platinum'
  );

  const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

  const selectedMembers = shuffled.slice(0, 3);

  spotlightsContainer.innerHTML = '';
  
  selectedMembers.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('spotlight-card');

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="100" height="100">
      <div class="spotlight-info">
        <h3>${member.name}</h3>
        <p class="membership-badge">Level: ${member.membership}</p>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
      </div>
    `;

    spotlightsContainer.appendChild(card);
  });
}

getSpotlightMembers();