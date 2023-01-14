$("#add_task").submit(function (event) {
    alert("Data Inserted Successfully.");
});

$("#update_task").submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })

    var request = {
        "url": `/api/tasks/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert("Data updated successfully.");
    });
});

if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id")

        var request = {
            "url": `/api/tasks/${id}`,
            "method": "DELETE",
        }

        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done(function (response) {
                alert("Data deleted successfully.");
                location.reload();
            });

        };
    });
};

function sortTable(n) {
    var table = document.getElementById("ticketTable");
    var dir = "asc";
    var switching = true;
    var switchcount = 0;

    while (switching) {
        var rows = table.rows;

        switching = false;

        for (var i = 1; i < (rows.length - 1); i++) {
            var shouldSwitch = false;
            var element = rows[i].getElementsByTagName("TD")[n].innerHTML.toLowerCase();
            var nextElement = rows[i + 1].getElementsByTagName("TD")[n].innerHTML.toLowerCase();
            
            // Reformat date for comparison
            if(n == 5){
                element = element.substr(5, 4) + "-" + element.substr(0, 4);
                nextElement = nextElement.substr(5, 4) + "-" + nextElement.substr(0, 4);
            }

            if (dir == "asc") { shouldSwitch = element > nextElement } 
            else if (dir == "desc") { shouldSwitch = element < nextElement }

            if (shouldSwitch) {
                var rowNumber = rows[i].getElementsByTagName("TD")[0];
                var nextRowNumber = rows[i + 1].getElementsByTagName("TD")[0];

                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                [rowNumber.innerHTML, nextRowNumber.innerHTML] = [nextRowNumber.innerHTML, rowNumber.innerHTML];

                switching = true;
                switchcount++;
            }
        }

        if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
        }
    }
}