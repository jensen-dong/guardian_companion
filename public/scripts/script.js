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
  
  let loadout = {
    name: '',
    gear: {
        kinetic: null,
        energy: null,
        heavy: null
    }
};

function addWeaponToLoadout(name, hash, loreHash, icon, weaponType, ammoType) {
    if (!loadout.name) {
        loadout.name = prompt('Enter the name of the loadout:');
        if (!loadout.name) return;
    }

    let gearType = prompt('Enter the gear type (kinetic, energy, heavy):').toLowerCase();
    if (!['kinetic', 'energy', 'heavy'].includes(gearType)) {
        alert('Invalid gear type');
        return;
    }

    if (loadout.gear[gearType]) {
        alert(`You already have a ${gearType} weapon in the loadout.`);
        return;
    }

    loadout.gear[gearType] = { name, hash, loreHash, icon, weaponType, ammoType };

    const weaponsInLoadout = Object.values(loadout.gear).filter(Boolean).length;
    if (weaponsInLoadout === 3) {
        submitLoadout();
    } else {
        alert(`Weapon added to loadout. ${3 - weaponsInLoadout} more to go.`);
    }
}

function submitLoadout() {
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
            alert('Loadout created successfully');
            loadout = {
                name: '',
                gear: {
                    kinetic: null,
                    energy: null,
                    heavy: null
                }
            };
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}