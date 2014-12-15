/* Demo and test of i2c accelerometer
*/

var format_accel = function(val){
    var meterPerSecSec=[0.0,0.0,0.0];
    var accelScaleFactor=[0.0,0.0,0.0];
    runTimeAccelBias = [0, 0, 0];
     return meterPerSecSec.map(function(axis, idx){
				return val.readInt16LE(idx*2) * accelScaleFactor[idx] + runTimeAccelBias[idx];	
    });
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