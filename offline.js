const $ = (input) => document.querySelector(input);
const baseUrl = 'https://cdn.jsdelivr.net/gh/altbdoor/d2-api-human@data';

$('#load-json').onclick = () => {
  fetch(`${baseUrl}/weapons/all.json`)
    .then((res) => res.json())
    .then((weapons) => {
      $('#data-count').innerText = weapons.length;
      $('#data-first-weapon').innerText = JSON.stringify(weapons[0], null, 2);

      const firstWeapon = weapons.find((x) =>
        x.name.toLowerCase().includes('ignition code')
      );

      $('#data-weapon-name').innerText = firstWeapon.name;
      $('#data-weapon-icon').src = 'https://www.bungie.net' + firstWeapon.icon;
      $('#data-weapon-watermark').src =
        'https://www.bungie.net' + firstWeapon.watermark;
      $('#data-weapon-screenshot').src =
        'https://www.bungie.net' + firstWeapon.screenshot;

      $('#data-weapon-frame-img').src =
        'https://www.bungie.net' + firstWeapon.frame.icon;
      $('#data-weapon-frame-text').innerHTML =
        '<b>' +
        firstWeapon.frame.name +
        '</b><br>' +
        firstWeapon.frame.description;
    });
};