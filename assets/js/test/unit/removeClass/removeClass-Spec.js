import removeClass from 'helpers/removeClass';

describe("removeClass", function () {
    var htmlEl = document.querySelectorAll('html')[0];

    it("should remove a class from the html element and return that the class is not present", function () {

        expect(removeClass(htmlEl, 'js')).not.toBeTruthy();

    });

    it("Given an element which doesn't exist it should throw an error", () => {

        expect(
            () => {
                removeClass(document.querySelectorAll('.hello')[0], 'js')
            }
        )
        .toThrowError('Invalid parameters, expected valid DOM object and class string');

    });

    it("Given too few parameters should throw an error", () => {

        expect(
            () => {
                removeClass('hello')
            }
        )
        .toThrowError('Invalid parameters, expected valid DOM object and class string');

    });

});
