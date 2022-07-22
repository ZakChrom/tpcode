var tgl = true;
var place_x    = document.getElementById('place-x').value
var place_y    = document.getElementById('place-y').value
var place_id   = document.getElementById('place-id').value
var place_rot  = document.getElementById('place-rot').value
var place_heat = document.getElementById('place-heat').value
function place2() {
  if (tgl == false) {
    place_x    = document.getElementById('place-x').value
    place_y    = document.getElementById('place-y').value
    place_id   = document.getElementById('place-id').value
    place_rot  = document.getElementById('place-rot').value
    place_heat = document.getElementById('place-heat').value
    tgl = true
    document.getElementById('place-menu').setAttribute("style", "display: none;");
    if (place_x == '' || place_y == '' || place_id == '' || place_rot == '' || place_heat == '') {return}
    place(
      place_x,
      place_y,
      place_id,
      place_rot,
      place_heat
    )
  } else {
    document.getElementById('place-menu').setAttribute("style", "display: box;");
    tgl = false
  }
}