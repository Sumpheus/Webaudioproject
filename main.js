const audioContext = new AudioContext();
console.log(audioContext);
const file = document.getElementById('track');

/* Mise en place du canvas */
const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height =  window.innerHeight;
const ctx = canvas.getContext('2d');
let audioSource;
let analyser;

 container.addEventListener('click', function(){
     const audio1 = document.getElementById('audio1');

     audio1.src = "data:audio/mpeg;base64,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VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTdj/AAAH+AAAAIAAAP8AAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQVBFVEFHRVjQBwAApgAAAAQAAAAAAACgAAAAAAAAAAAaAAAAAAAAAFRpdGxlAFNvdW5kQmlibGUuY29tIE11c3QgQ3JlZGl0GgAAAAAAAABBcnRpc3QAU291bmRCaWJsZS5jb20gTXVzdCBDcmVkaXQEAAAAAAAAAFllYXIAMjAxNxUAAAAAAAAAU291cmNlAGh0dHA6Ly9zb3VuZGJpYmxlLmNvbUFQRVRBR0VY0AcAAKYAAAAEAAAAAAAAgAAAAAAAAAAAVEFHU291bmRCaWJsZS5jb20gTXVzdCBDcmVkaXQAAAAAU291bmRCaWJsZS5jb20gTXVzdCBDcmVkaXQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAxNwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8=";

     const audioContext = new AudioContext();
     audio1.play();
     audioSource =  audioContext.createMediaElementSource(audio1);
     analyser = audioContext.createAnalyser();
     audioSource.connect(analyser);
     analyser.connect(audioContext.destination);
     analyser.fftSize = 128; //Number of bars

     const bufferLength = analyser.frequencyBinCount;
     const dataArray = new Uint8Array(bufferLength);

     /* effets visuelles */
     const barWidth = (canvas.width/2)/bufferLength;
     let barHeight;
     let x;

     function animate(){
         x = 0;
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         analyser.getByteFrequencyData(dataArray);
         drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
         requestAnimationFrame(animate);
     }
     animate();
 });

file.addEventListener('change', function(){
    console.log(this.file);
    const files = this.files;
    const audio1 =  document.getElementById('audio1');
    audio1.src =  URL.createObjectURL(files[0]);
    audio1.load();
    audio1.play();

    audioSource =  audioContext.createMediaElementSource(audio1);
    analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 128; /* Number of bars */

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    /* effets visuelles */
    const barWidth = (canvas.width/2)/bufferLength;
    let barHeight;
    let x;

    function animate(){
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);
    }
    animate();
});

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
    for (let i = 0; i < bufferLength; i++){
        barHeight = dataArray[i] * 2;

        const red = i * barHeight/2;
        const green = i * 10;
        const blue = barHeight/2;

        ctx.fillStyle = 'aqua';
        ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight - 30, barWidth, 15);

        ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
    }

    for (let i = 0; i < bufferLength; i++){
        barHeight = dataArray[i] * 2;

        const red = i * barHeight/2;
        const green = i * 10;
        const blue = barHeight/2;

        ctx.fillStyle = 'aqua';
        ctx.fillRect(x, canvas.height - barHeight - 30, barWidth, 15);

        ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
    }
};