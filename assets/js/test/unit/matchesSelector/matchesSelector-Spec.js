import matchesSelector from 'helpers/matchesSelector';

describe("matchesSelector", () => {
    var helloWorldEl, noneExistentEl;

    beforeEach(() => {

        setFixtures(sandbox({class: 'helloWorld', id: 'hello'}));

        helloWorldEl = document.querySelectorAll('.helloWorld')[0];
        noneExistentEl = document.querySelectorAll('.nonExistent')[0];

    });

    it("should return true if the element has the selector", () => {

        expect(matchesSelector(helloWorldEl, '.helloWorld')).toBeTruthy();

    });

    it("Given an element or selector which doesn't exist it should throw an error", () => {

        expect(
            () => {
                matchesSelector(noneExistentEl, '.helloWorld')
            }
        )
        .toThrowError('Invalid parameters, expected valid DOM object and selector');

    });

    it("Given too few parameters should throw an error", () => {

        expect(
            () => {
                matchesSelector('hello')
            }
        )
        .toThrowError('Invalid parameters, expected valid DOM object and selector');

    });

});
