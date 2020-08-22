const functions = require('./slide');

describe('testing BT slider of 10',() => {
    beforeEach(() => {
        functions.indexArr=[100,120];
        functions.selecteddata=[100];
        functions.slideCount=5;
        functions.slideIndex=4;
    });    
    test('saverecords returns records',() => {
        var data = [{"format":"jpeg","width":5616,"height":3744,"filename":"0.jpeg","id":123,"author":"Alejandro Escamilla"}];
        expect(functions.saveRecords(data)).toStrictEqual({"123" : {"format":"jpeg","width":5616,"height":3744,"filename":"0.jpeg","id":123,"author":"Alejandro Escamilla"}});
    });
    test('saverecords returns empty if input empty',() => {
        var data = [];
        expect(functions.saveRecords(data)).toStrictEqual({});
    });
    test('randomNumber returns a number',() => {
        expect(functions.randomNumber()).toBe(120);
    });
    test('updateSlideIndex returns index less than slidecount',() =>{
        expect(functions.updateSlideIndex()).toBe(0);
    });    
});



