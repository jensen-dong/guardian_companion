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

    let gearType;

    if (ammoType === 3) {
        gearType = 'heavy';
    } else if (ammoType === 1 || ammoType === 2) {
        gearType = prompt('Enter the gear type (kinetic, energy):').toLowerCase();
        if (!['kinetic', 'energy'].includes(gearType)) {
            alert('Invalid gear type');
            return;
        }
    } else {
        alert('Invalid ammo type');
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

function removeFromFavorites(id) {
    fetch(`/api/destiny/favorites/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error removing favorite: ' + data.error);
        } else {
            alert('Favorite removed successfully');
            location.reload();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function removeLoadout(id) {
    fetch(`/api/destiny/loadouts/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error removing loadout: ' + data.error);
        } else {
            alert('Loadout removed successfully');
            location.reload();
            }
            })
            .catch(error => {
            console.error('Error:', error);
            });
}