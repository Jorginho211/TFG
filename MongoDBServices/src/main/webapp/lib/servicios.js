
$(function () {

    // Mas info sobre JQuery.ajax en http://api.jquery.com/jquery.ajax/

    $("#c1_do").click(function () {
        $.ajax({
            type: "GET",
            url: "api/v1/example/version/11",
            success: function (data, textStatus, response) {
                $("#c1_result").val(JSON.stringify(data))
            },
            error: function (response, textStatus, errorThrown) {
                $("#c1_result").val("ERROR: " + textStatus + " / " + errorThrown)
            }
        })
    });

    $("#c2_do").click(function () {
        $.ajax({
            type: "GET",
            url: "api/v1/example/version/40",
            success: function (data, textStatus, response) {
                $("#c2_result").val(JSON.stringify(data))
            },
            error: function (response, textStatus, errorThrown) {
                $("#c2_result").val("ERROR: " + textStatus + " / " + errorThrown)
            }
        })
    });

    $("#c3_do").click(function () {
        $.ajax({
            type: "GET",
            url: "api/v1/libro/30",
            success: function (data, textStatus, response) {
                $("#c3_result").val(JSON.stringify(data))
            },
            error: function (response, textStatus, errorThrown) {
                $("#c3_result").val("ERROR: " + textStatus + " / " + errorThrown)
            }
        })
    });

    var libro1 = {"name": "A Clash of Kings", "author": "George R. R. Martin"}

    $("#c4_do").click(function () {
        $.ajax({
            type: "POST",
            url: "api/v1/libro",
            data: JSON.stringify(libro1),
            contentType: "application/json",
            success: function (data, textStatus, response) {
                $("#c4_result").val(JSON.stringify(data)+"\n"+response.getResponseHeader('Location'))
            },
            error: function (response, textStatus, errorThrown) {
                $("#c4_result").val("ERROR: " + textStatus + " / " + errorThrown)
            }
        })
    });

    var libro2_mal = {"nombre": "A Feast for Crows", "autor": "George R. R. Martin"}

    $("#c5_do").click(function () {
        $.ajax({
            type: "POST",
            url: "api/v1/libro",
            data: JSON.stringify(libro2_mal),
            contentType: "application/json",
            success: function (data, textStatus, response) {
                $("#c5_result").val(JSON.stringify(data))
            },
            error: function (response, textStatus, errorThrown) {
                $("#c5_result").val("ERROR: " + textStatus + " / " + errorThrown)
            }
        })
    });
});