//display = setInterval(refreshDisplay, 100)
var max = 900;
var count = max; // seconds
var togglesound = 0
var togglechart = 0
var chart   
var counter

initalizePage();
//führt funktion timer() einmal pro Sekunde aus
function start() {
    if (!counter){
    max = count;
    counter = setInterval(timer, 1000);  
    }
    }

//Updaten der Farbe, Zeit und des Rings
function timer() {
    if (count == 0) {
        document.getElementById('timer').innerHTML = `00:00`;
        if (togglesound == 1) {
            document.getElementById("audio").play();
        }
        
        clearInterval(counter);
        resetCounter();
        
        
        alert("Es sind 15 Minuten vergangen");
        return;
    }
   
    var versek = max/10 - count / 10  //Berechnet Zeitringfläche
    donut = 100 - 1000 / max * versek
    // Ausgabe
    //console.log(count);
    count = count - 1; //= zuweisung
    // Ausgabe in der Konsole
    refreshAll();
    }
//Timer zurücksetzen
function reset() {

    var returnValue = confirm('Wollen sie den Timer zurück setzen?');
    if (returnValue == true) {
        clearInterval(counter);
        count = max
        refreshAll();}
        resetCounter();
    }
//Musik an/aus (togglesound==0 => kein Erinnerungssound)
function musiconoff() {
    if (togglesound == 1) {
        togglesound = 0
        console.log(togglesound)
    }
    else if (togglesound == 0) {
        togglesound = 1
    }
    else {
        console.log("Error: var togglesound has wrong value! ");
    }}
//Zeitring an/aus (togglechart == 0 => kein Zeitring)
function chartonoff() {
    
    if (togglechart == 1) {
        togglechart = 0
        chart = chart.destroy({ bindto: '#chart' });
        document.getElementById('chart').innerHTML = `test`
        document.getElementById('chart').style.color = "rgb(0, 0, 0)"
    }
    else if (togglechart == 0) {
        var donut = chartpercentage(max, count)
        togglechart = 1
        chart = c3.generate({

            bindto: '#chart',
            size: {
                height: 200,
                width: 200
            },
            data: {
                label: false,
                columns: [
                    ['data1', donut],
                    ['data2', 100-donut]
                ],
                colors: {
                    data1: '#2196F3',
                    data2: '#000000'
                },
                type: 'pie',
            },
                pie: {
                    label: {
                        format: function (value, ratio) {
                            return value;
                        },
                        show: false,
                        
                    },
                    expand: true,
                    width: 10,
                    title: 'übrigbleibende Zeit',
                },

                legend: {
                    show: false
                    },
                tooltip: {
                    show: false
                    }

                
            
        });
    }
    else {
        console.log("Error: var togglechart has wrong value! ");
    }}



// Umrechnen in mm:ss

//aktualisiert Zeit, deren Farbe, und Chart
function refreshAll() {
    refreshDisplay();
    refreshChart();
    color_timer();
    }
function refreshDisplay() {
    document.getElementById('timer').style.color = color_timer(count);
    document.getElementById('timer').innerHTML = convert_time(count);
    }
//Sorgt für Farbänderung der Uhrzeit
function color_timer() {
    if (count/max <= 1 && count/max >0.8) {
       color = 'rgb(0, 255, 0';
       return color}
    else if (count/max <= 0.8 && count/max >0.7) {
        color = 'rgb(64, 255, 0)';
        return color}
    else if (count/max <= 0.7 && count/max >0.6) {
        color = 'rgb(128, 255, 0)';
        return color}
    else if (count/max <= 0.6 && count/max >0.5) {
        color = 'rgb(191, 255, 0)';
        return color}
    else if (count/max <= 0.5 && count/max >0.4) {
        color = 'rgb(255, 255, 0)';
        return color}
    else if (count/max <= 0.4 && count/max >0.3) {
        color = 'rgb(255, 191, 0)';
        return color}
    else if (count/max <= 0.3 && count/max >0.2) {
        color = 'rgb(255, 128, 0)';
        return color}
    else if (count/max <= 0.2 && count/max >0.1) {
        color = 'rgb(255, 64, 0)';
        return color}
    else if (count/max <= 0.1 && count/max >0.0) {
        color = 'rgb(255, 0, 0)';
        return color}
    } 
function convert_time(count) {
    
    // Umrechnen in mm:ss
    var minuten = Math.floor(count / 60);
    // Modulo-Operator (Restwert-Operator)
    var sekunden = count % 60; 

    if (minuten < 10 && minuten > 0) {
        minuten = "0" + minuten
    }
    if (minuten < 1) {
        minuten = "0" + "0"
    }
    if (sekunden < 10) {
       sekunden = "0" + sekunden
    }
    var zeit = minuten + ":" + sekunden;
    return zeit;
    }
//aktualisiert Zeitring
function refreshChart () {
    if (togglechart == 1) {
        var donut = chartpercentage(max, count)
        chart.load({
            columns: [
                ['data1', donut],
                ['data2', 100 - donut]
            ]
            })
    }
    else if (togglechart == 0){ 
        document.getElementById('chart').innerHTML = `test`
        document.getElementById('chart').style.color = "rgb(0, 0, 0)"}
    else {}
    }
function chartpercentage(max, count) {
    var versek = max/10 - count / 10
    donut = 100 - 1000 / max * versek
    return donut;
    }
//Zeit verlängern/verkürzen    
function minus1min(max) {
    var maxnew
        if (count > 60) {
        count = count - 60;
        maxnew = count;
            if (maxnew > max)  {
            max = maxnew
        }
        refreshAll();
    }
    return max;
    }

function plus1min(max) {
    var maxnew
    if (count >= 0) {
        count = count + 60;
        maxnew = count;
        if (maxnew > max)  {
            max = maxnew
        }
        refreshAll();
    }
    return max;
    }
function minus10sec(max) {
    var maxnew
    if (count > 10) {
        count = count - 10;
        maxnew = count;
        if (maxnew > max)  {
            max = maxnew
        }
        refreshAll(donut);
    }
    return max;
    }
function plus10sec(max) {   
    var maxnew
    if (count >= 0) {
        count = count + 10;
        maxnew = count;
        if (maxnew > max)  {
            max = maxnew
        }
        refreshAll();
    }
    return max;
    }
function minus1sec(max) {
    var maxnew
    if (count > 0) {
        count = count - 1;
        maxnew = count;
        if (maxnew > max)  {
            max = maxnew
        }
        refreshAll();
    }
    return max;
    }
function plus1sec(max) {
    var maxnew
    if (count >= 0) {
        count = count + 1;
        maxnew = count;
        if (maxnew > max)  {
            max = maxnew
        }
        refreshAll();
    }
    return max;
    }

function chartpercentage(max, count) {
    var versek = max/10 - count / 10
    donut = 100 - 1000 / max * versek
    return donut;
    }
function initalizePage() {
    refreshAll();
    }
function keypress() {
    var keycode = event.which; 
    if (keycode == 32) {
        start();
    }
    else if (keycode == 13) {
       reset();
    }
    }
function resetCounter() {
    counter = null;
    }

//spielt kurzen Piepton ab - NOCH NICHT FUNKTIONSFÄHIG!
/*function playSound() {
    if (color_timer(count) == 0.5) {
        document.getElementById("shortbeep").play();
    }
    } */

//TODO: Bugfix für funktion playSound(), Test für Funktionen schreiben, 
