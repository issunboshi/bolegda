import addClass from 'helpers/addClass';

describe("addClass", () => {
    var htmlEl = document.querySelectorAll('html')[0];

    it("should add a class to the html element and return that the class is present", () => {

        expect(addClass(htmlEl, 'js')).toBeTruthy();

    });

    it("Given an element which doesn't exist it should throw an error", () => {

        expect(
            () => {
                addClass(document.querySelectorAll('.hello')[0], 'js')
            }
        )
        .toThrowError('Invalid parameters, expected valid DOM object and class string');

    });

    it("Given too few parameters should throw an error", () => {

        expect(
            () => {
                addClass('hello')
            }
        )
        .toThrowError('Invalid parameters, expected valid DOM object and class string');

    });

});
