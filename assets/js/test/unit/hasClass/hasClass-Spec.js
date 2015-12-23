import hasClass from 'helpers/hasClass';
import addClass from 'helpers/addClass';

describe("hasClass", () => {

    beforeEach(() => {

        setFixtures(sandbox({class: 'js'}));

    });

    it("should return true if queried for a class we know exists", () => {

        expect(hasClass(document.querySelectorAll('.js')[0], 'js')).toBeTruthy();

    });

    it("should return false if queried for a class we know doesn't", () => {

        expect(hasClass(document.querySelectorAll('.js')[0], 'js')).toBeTruthy();

    });

    it("Given an element which doesn't exist it should throw an error", () => {

        expect(
            () => {
                hasClass(document.querySelectorAll('.hello')[0], 'js')
            }
        )
        .toThrowError('Invalid parameters, expected valid DOM object and class string');

    });

    it("Given too few parameters should throw an error", () => {

        expect(
            () => {
                hasClass(document.querySelectorAll('.hello')[0])
            }
        )
        .toThrowError('Invalid parameters, expected valid DOM object and class string');

    });

});
