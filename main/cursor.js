var tgl2 = true;
var cursor_x    = document.getElementById('cursor-x').value
var cursor_y    = document.getElementById('cursor-y').value
function cursor2() {
  if (tgl2 == false) {
    cursor_x    = document.getElementById('cursor-x').value
    cursor_y    = document.getElementById('cursor-y').value
    tgl2 = true
    document.getElementById('cursor-menu').setAttribute("style", "display: none;");
    if (cursor_x == '' || cursor_y == '') {return}
    cursor(
      cursor_x,
      cursor_y
    )
  } else {
    document.getElementById('cursor-menu').setAttribute("style", "display: box;");
    tgl2 = false
  }
}