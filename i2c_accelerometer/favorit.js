/* Demo and test of i2c accelerometer
*/

var format_accel = function(rawData){
    /* this snippet of code was taken from tessel's accelerometer code
        https://github.com/tessel/accel-mma84
    */
    var out = [];
    var scaleRange=2;
      for (var i = 0; i < 3 ; i++) {
        var gCount = (rawData[i*2] << 8) | rawData[(i*2)+1];  // Combine the two 8 bit registers into one 12-bit number

        gCount = (gCount >> 4); // The registers are left align, here we right align the 12-bit integer

        // If the number is negative, we have to make it so manually (no 12-bit data type)
        if (rawData[i*2] > 0x7F) {
          gCount = -(1 + 0xFFF - gCount); // Transform into negative 2's complement
        }

        out[i] = gCount / ((1<<12)/(2*scaleRange));
      }
}
module.exports = {   name:"Test-accelerometer",
    i2c_path: "/dev/i2c/1",
    components: [{type:"accelerometer", 
    interface:"i2c", 
    address: 0x53,
    init: [{cmd:'write', byte: 0x2D, bytes: [1 << 3]},
        {cmd:'write', byte:0x31, bytes:[0x09]},
        {cmd:'write', byte: 0x2c, bytes: [8 + 2 + 1], wait: 10}
        ], 
    get:{cmd: 'read', byte: 0x32, bytes: 6, post_action: format_accel}
    }]
}