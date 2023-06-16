let backSynth = new Tone.Synth().toDestination();
let notes = ["c3", "c#3", "d3", "d#3", "e3", "f3", "f#3", "g3", "g#3,", "a3", "a#3", "b3"]
let length = ["2n", "4n", "8n", "16n"]
let time = 0
let playing = false
document.cookie = "muted=false"
let muted = false

// getCookie provided by https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  } 

function setup() {
    if (getCookie("muted") == "true") {
        muted = true
        backSynth.volume.value = 0
    }
}
function toggle_mute() {
    if (getCookie("muted") == "true") {
        document.cookie = "muted=false"
        muted = false
        backSynth.volume.value = 0
    }
    else {
        document.cookie = "muted=true"
        muted = true
        backSynth.volume.value = -1000
    }
}
function play_music() {
    console.log("muted: ", getCookie("muted") == "true")
    if (!playing) {
        playing = true
        let rng = Math.floor(Math.random() * 12);
        let rand = Math.floor(Math.random() * 4)
        backSynth.triggerAttackRelease(notes[rng], length[rand], time);
        time += 2 / (1 + rand)
        setTimeout(1000)
        playing = false
    }
}

