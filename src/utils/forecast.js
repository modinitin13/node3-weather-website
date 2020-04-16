const request=require('request');
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=ae97341ce859ad77d06830558c0d425c&query='+latitude+','+longitude+'&units=m';
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect please check you connection',undefined);
        }else if(body.error){
            callback('Please input a valid co-ordinate',undefined);
        }else{
            callback(undefined,{
                currenttime:body.location.localtime,
                humidity:body.current.humidity,
                descriptions:body.current.weather_descriptions[0],
                temperature:+body.current.temperature,
                feelslike:body.current.feelslike
            });
        }
    })
};
module.exports=forecast;