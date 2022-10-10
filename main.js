Webcam.set({
    width : 350,
    height: 300,
    image_format: 'png',
    png_quailty: 90
})

Webcam.attach("#camera")

function img(){
    Webcam.snap(function(data_uri){
        document.getElementById("results").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>'
    });
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "prediction 1" + prediction_1;
    speak_data_2 = "prediction 2" + prediction_2;    
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    utterThis.rate = 0.5;
    synth.speak(utterThis)
}
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ofhbSRmgq/model.json", modelLoaded)

function modelLoaded(){
    console.log("Model Loaded!")
}
function check(){
    image = document.getElementById("capture_image");
    classifier.classify(image, gotResults)
}
function gotResults(error, results){
    if (error){ 
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_name").innerHTML = results[0].label;
        document.getElementById("result_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if(results[0].label=="thumbs up"){
            document.getElementById("update_emoji").innerHTML = "&#128077;"
        }
        if(results[0].label=="perfect"){
            document.getElementById("update_emoji").innerHTML = "&#128076;"
        }
        if(results[0].label=="hand"){
            document.getElementById("update_emoji").innerHTML = "&#128400;"
        }

        if(results[1].label=="thumbs up"){
            document.getElementById("update_emoji2").innerHTML = "&#128077;"
        }
        if(results[1].label=="perfect"){
            document.getElementById("update_emoji2").innerHTML = "&#128076;"
        }
        if(results[1].label=="hand"){
            document.getElementById("update_emoji2").innerHTML = "&#128400;"
        }
    }
}
