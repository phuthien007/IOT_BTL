const mqtt = require("mqtt"); // require mq
const client = mqtt.connect("mqtt://broker.hivemq.com:1883"); // create a client

client.on("connect", function () {
  client.subscribe("20194352in", function (err) {
    if (!err) {
      console.log("Connected");
    }
  });
});
client.subscribe("fake", function (err) {
  if (!err) {
    console.log("Connected");
  }
});
// create function random number min - max
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const arr = [];

const interval = setInterval(() => {
  const data = {
    type: "1",
    temp: randomIntFromInterval(0, 50),
    humid: randomIntFromInterval(0, 100),
  };
  client.publish("fake", JSON.stringify(data));
  if (data.temp > 40 || data.humid < 20) {
    console.log("gui canh bao");
    client.publish("20194352", JSON.stringify(data));
  }
}, 1000);

client.on("message", function (topic, message) {
  // message is Buffer
  //   if (topic == "20194352") {
  //     if (arr.length < 5) {
  //       arr.push(message.toString());
  //     } else {
  //       console.log(arr);
  //     }
  //   }
  //   console.log("topic", message.toString());
  //   client.end();

  if (topic == "20194352") {
    if (message.length > 2) {
      const jsonData = JSON.parse(message.toString());
      // neu nhiet do lon hon 40 thi gui lenh sang arduino bat coi canh bao

      if (jsonData?.type == 1) {
        console.log("DH11", jsonData);
        console.log("DH11", jsonData.temp);
        if (jsonData.temp > 40) {
          console.log("bat coi canh bao");
          client.publish("20194352in", "2");
        }
        // do am qua thap thi bat coi canh bao
        else if (jsonData.humid < 20) {
          console.log("bat coi canh bao");
          client.publish("20194352in", "2");
        }
      }
    } else {
      if (message.toString() == "1") {
        console.log("tat den");
        client.publish("20194352in", "1");
      } else if (message.toString() == "2") {
        console.log("tat coi ");
        client.publish("20194352in", "2");
      } else {
        console.log("bat den");
        client.publish("20194352in", "0");
      }
    }
  }
});

module.exports = client;
