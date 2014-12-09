/* 
A module testing interacting with gpio structures, and i2c blinkm leds. 
*/
{
    "name":"Test-Tri-led",
    "components" : [{"type":"led", "name":"green", "address":17, "interface": "gpio"},{"type":"led","name":"blue", "address":27, "interface": "gpio"},{"type":"led","name":"red","address":22, "interface": "gpio" },{"type":"button", "name":"push-button", "address":4, "interface":"gpio"}]
}