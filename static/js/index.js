//https://www.eclipse.org/paho/clients/js/
var cnt=0;
function historial1() {
	//alert("led on");
	//console.log("Obteniendo historial 1 .....");
	console.log("Obteniendo CONTROL LED .....");
	
	if(cnt==0){
	message = new Paho.MQTT.Message("ON");
    	message.destinationName = "jfjacome.fie@unach.edu.ec/led";
    	client.send(message);
	cnt=cnt+1;
	}
	else if(cnt==1){
	message = new Paho.MQTT.Message("OFF");
    	message.destinationName = "jfjacome.fie@unach.edu.ec/led";
    	client.send(message);
	cnt=0;
	}
	
	//document.getElementById("sensor").innerHTML="led on";
	
	
  
}
function historial2(){	
	//alert("led off");
	console.log("Obteniendo historial 2 .....");
	message = new Paho.MQTT.Message("historial");
    	message.destinationName = "jfjacome.fie@unach.edu.ec/historial";
    	client.send(message);
	//document.getElementById("sensor").innerHTML="led off";
}






// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "jfjacome.fie@unach.edu.ec",
    password: "jimmy1996",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("jfjacome.fie@unach.edu.ec/led");
    client.subscribe("jfjacome.fie@unach.edu.ec/historial");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "jfjacome.fie@unach.edu.ec/historial";
 
    client.send(message);
  
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
	  sms=message.payloadString;
	  numero=sms.length;
	  if(sms[7]=="1"){
	   document.getElementById("historial1").innerHTML=sms;
	  }
	   if(sms[7]=="2"){
	   document.getElementById("historial2").innerHTML=message.payloadString;
	  }
	   if(numero==6 || numero==7){
	    document.getElementById("LED").innerHTML=message.payloadString;
	   }
		  
  }
  
