// будет приходить с ответом сервера, каждый символ содержит состояние места (0 - свободно, 1 - занято)
let placesInfoString = '10100000100100010001000000000000010000001100100000';
// приходит с сервера
let placePrice = 18000;
let chosenPlacesCount = 0;
let sum = 0;
updateView();

function onSwitchToggle(id) {
    chosenPlacesCount = 0;
    let switches = document.querySelectorAll('input[type=checkbox]');
    for (let i = 0; i < switches.length; i++) {
        if (switches[i].checked) {
            chosenPlacesCount++;
        }
    }
    sum = placePrice * chosenPlacesCount;
    updateView();
}

function updateView() {
    $('#count').html('Выбрано мест: ' + chosenPlacesCount);
    $('#sum').html(`Стоимость: ${sum} руб.`);
}

$(function () {
    for (let i = 0; i < placesInfoString.length; i++) {
        let disabled = (placesInfoString[i] === '1') ? 'disabled' : '';
        let disabledPlace = (disabled) ? 'disabled-place' : '';
        let placeNumber = ((i + 1) < 10) ? ('&nbsp;' + (i + 1).toString()) : (i + 1);
        $('#places-area').append(`<div class="custom-control ${disabledPlace} custom-switch">` +
            '<input type="checkbox" ' + disabled +
            ` class="custom-control-input" id="place${i}" onchange="onSwitchToggle(${i})">` +
            `<label class="custom-control-label" for="place${i}">${placeNumber}</label>` +
            '</div>');
    }
    $('#buy').click(
        function () {
            let boughtPlaces = [];
            let newPlacesString = '';
            let switches = document.querySelectorAll('input[type=checkbox]');
            for (let i = 0; i < switches.length; i++) {
                if (switches[i].checked) {
                    boughtPlaces.push(Number.parseInt(switches[i].id.substr(5)) + 1);
                    newPlacesString += '1';
                } else if (switches[i].disabled) {
                    newPlacesString += '1';
                } else {
                    newPlacesString += '0';
                }
            }
            if (boughtPlaces.length === 0) {
                Swal.fire('Не выбрано ни одного места! <br> Воспользуйтесь переключателями внизу страницы');
                return;
            }
            let dataToSend = {
                newPlacesString: newPlacesString,
                boughtPlaces: boughtPlaces,
                sum: sum
            };
            console.log(dataToSend);
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1/ip-labs/orderController.php",
                data: JSON.stringify(dataToSend),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            });
            Swal.fire({
                title: 'Успешно забронировано',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(function () {
                window.location.href = "cart.html";
            }, 1800);
        }
    );
});
