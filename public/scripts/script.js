document.getElementById('search-button').addEventListener('click', function() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const weaponCards = document.querySelectorAll('.weapon-card');
  
    weaponCards.forEach(card => {
      const weaponName = card.querySelector('.weapon-name').textContent.toLowerCase();
      if (weaponName.includes(searchQuery)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
  
  // Ensure all weapon cards are displayed initially
  document.addEventListener('DOMContentLoaded', () => {
    const weaponCards = document.querySelectorAll('.weapon-card');
    weaponCards.forEach(card => {
      card.style.display = 'block';
    });
  });
  
  // Function to handle menu button clicks
  function addToFavorites(name, hash, loreHash, icon, weaponType, ammoType) {
    const weaponData = {
      name,
      hash,
      loreHash,
      icon,
      weaponType,
      ammoType
    };
  
    fetch('/api/destiny/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(weaponData)
    })
    .then(response => response.json())
    .then(data => {
      alert(`Added ${name} to favorites`);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  function addToLoadout(name, hash, loreHash, icon, weaponType, ammoType) {
    const loadoutName = prompt('Enter the name of the loadout:');
    if (!loadoutName) return;

    const gearType = prompt('Enter the gear type (kinetic, energy, heavy):').toLowerCase();
    if (!['kinetic', 'energy', 'heavy'].includes(gearType)) {
        alert('Invalid gear type');
        return;
    }

    const loadout = {
        name: loadoutName,
        gear: {}
    };

    loadout.gear[gearType] = { name, hash, loreHash, icon, weaponType, ammoType };

    fetch('/api/destiny/loadouts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loadout)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error adding to loadout: ' + data.error);
        } else {
            alert('Weapon added to loadout');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}