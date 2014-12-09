/* Demo and test of i2c accelerometer
*/
{   name:"Test-accelerometer",
    components : [{type:"accelerometer", interface:"i2c", init: [
        {cmd:'write', byte: 0x2D, bytes: [1 << 3]}
        {cmd:'write', byte:0x31, bytes:[0x09]},
        {cmd:'write', byte: 0x2c, bytes: [8 + 2 + 1], wait: 10}
        ], 
    get:{cmd: 'read', byte: 0x32, bytes: 6}
    }]
}