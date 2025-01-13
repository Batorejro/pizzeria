{
    const personOnes = { firstName: 'John', lastName: 'Doe' };// to jest obiekt
    const personTwo = personOnes;//S, zamiast bezmyślnie je kopiować, w przypadku przypisania do nowej zmiennej czy stałej, przekazuje im tylko “adres” do oryginalnego obiektu. Zatem nie tworzymy kopii, lecz ta nowa zmienna/stała staje się tylko czymś w rodzaju “linku” (referencją) kierującego do oryginału.
    personTwo.firstName = 'Amanda';
    console.log('Person one', personOnes);
    console.log('Person two', personTwo);
};
{
    const personOne = { firstName: 'John', lastName: 'Doe' };
    const personTwo = personOne;
    personTwo.firstName = 'Amanda';
    console.log('Person one', personOne);
    console.log('Person two', personTwo);
}
{
    const namesOne = ['John', 'Amanda'];
    const namesTwo = namesOne;
    namesTwo.push('Thomas');

    console.log(namesOne);
    console.log(namesTwo);
}
{
    const label = 'Names of people';
    const names = ['John', 'Amanda'];

    function prepareAndShowNames(namesArr, title) {
        title = '==' + title + '==';
        namesArr.push('Thomas');//referencja tablicy names
        console.log(title, namesArr);
        console.log(label, names);
    }

    prepareAndShowNames(names, label);
}
{
    const person = { firstName: '', lastName: '' };
    const name = person.firstName;

    const personOne = person;
    personOne.firstName = 'ama';
    personOne.lastName = 'Doe';

    const personTwo = person;
    personTwo.firstName = 'jon';
    personTwo.lastName = 'Doe';

    console.log(name, personOne, personTwo);
}
/*
{
    function hello(name) {
        console.log('Hey', name);
    }

    function runOtherFunc(callback) {
        const val = prompt('Pass the value!');
        callback(val);
    }

    //runOtherFunc(hello);//
    runOtherFunc(function () { hello('John'); });
}
*/
//callback "cb" - callback
{
    function foo(cbOne, cbTwo) {
        cbOne();
        cbTwo();
    }

    foo(function () { console.log('One!'); }, function () { console.log('Two!'); })
}
{
    function foo(cb, text) {
        cb(text);
    }

    function bar(textOne, textTwo) {
        console.log(textOne, textTwo);
    }

    foo(function (txt) { bar(txt, 'World') }, 'Hello');
};

{

    'use strict';

    console.log(this);

    function foo() {
        console.log(this);
    }

    foo();
};
{


    console.log(this);

    function foo() {
        console.log(this);
    }

    foo();
}

{
    function func() {
        console.log(this);
    }

    const obj1 = {
        name: 'object 1',
        bar: func
    }

    const obj2 = {
        name: 'object 2',
        bar: func
    }

    obj1.bar(); // this = obj1
    obj2.bar(); // this = obj2
};
{
    function foo() {
        const this = {}
        this.bar = 'baz';
        console.log(this);
        return this;
    }
}