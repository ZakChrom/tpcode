let ws = ''
var count = 0
var toggle = true
var uuid = ''
var id = ''
var tk = {}

const n = document.getElementById('n')
const infoText = document.getElementById('t')
const btn = document.getElementById('new')
const placebtn = document.getElementById('place')
const packets = document.getElementById('text')
const result_display = document.getElementById('result');
if (getCookie('server') != null) {
  packets.innerHTML = getCookie('server')
} else {
  packets.innerHTML = '<server ip>'
}


fetch("https://tpcode.calion.repl.co/uuid")
.then(response => response.json())
.then(data => {
  uuid = data['uuid']
  id = 'TPCode-' + uuid
  tk = {"version": "2.0.1.0", "clientID": id}
  //n.innerHTML = "Your username is <span style='color: white;'>"+tk['clientID']+"</span> but you can simply do <span style='color: white;'>@username</span>"
})


function activate() {
  infoText.innerHTML = "Packets to send to server:"
  ws = new WebSocket("wss://" + packets.value);
  ws.onerror = function (error) {
    alert('Server offline or invalid ip');
  };
  ws.onclose = function (error) {
    alert('You got disconnected')
  }
  setCookie('server', packets.value, 999999)
  packets.innerHTML = ''
  btn.innerHTML = "Run"
  btn.setAttribute("onClick", "javascript: run();");
  placebtn.setAttribute("style", "display: box;");
  ws.addEventListener('message', function (event) {
    login(ws)
    displayServerPacket(event.data)
    count++;
  });
}

function place(x, y, id, rot, heat) {
  displayClientPacket("place "+x+" "+y+" "+id+" "+rot+" "+heat)
  ws.send(("place "+x+" "+y+" "+id+" "+rot+" "+heat))
}

function clearPackets() {
  result_display.innerHTML = ''
}

function login(ws) {
  if (toggle) {
    displayClientPacket("token "+JSON.stringify(tk))
    ws.send("token " + JSON.stringify(tk))
    toggle = false
  }
}

function format(str) {
    return str.replace(/@(?:(\w+|@)|\|(.*?)\|)/g, (_, $1, $2) => {
        if ($1) {
            switch ($1) {
                case "r": return Math.floor(Math.random() * 100);
                case "r2": return Math.floor(Math.random() * 100);
                case "username": return id;
                case "uuid": return uuid;
                
                case "@": return "@";
                default: return $1;
            }
        }
        else {
            return eval($2);
        }
    });
}


function run() {
  displayClientPacket(format(packets.value))
  ws.send(format(packets.value))
}


function displayServerPacket(result) {
  if (count >= 300) {
    result_display.innerHTML = '';
    count = 0;
  }
  result_display.innerHTML += "<span style='color: white;'>[SERVER]</span> <span style='color: red;'>" + result + "<br>";
  result_display.scrollTop = result_display.scrollHeight;
}

function displayClientPacket(result) {
  t = result.replace('<br>', '\n').split('\n')
  for (let i of t) {
    result_display.innerHTML += "<span style='color: white;'>[CLIENT]</span> <span style='color: #006eff;'>" + i + "<br>";
    result_display.scrollTop = result_display.scrollHeight;
  }
}