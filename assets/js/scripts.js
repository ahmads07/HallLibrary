function getSuburbs(){
    suburbs = [];
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async: false,
        url: 'https://halllibrary.herokuapp.com/api/suburbs/',
        success: function (data) {
            suburbs = data;
        },
        error: function (err) {
            console.log(err);
        }
    });
    return suburbs;
}


function addMember(lastname, firstname, dob, street, suburb, email, phone, membershiptype){
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: 'https://halllibrary.herokuapp.com/api/members/',
        data: {
            Lastname: lastname,
            Firstname: firstname,
            DateOfBirth: dob,
            StreetAddress: street,
            Suburb: suburb,
            EmailAddress: email,
            PhoneNumber: phone,
            MembershipType: membershiptype
        },
        success: function (data) {
            alert('Member added successfully');
            alert('Add another member?');
            location.reload();

        },
        error: function (err) {
            console.log(err);
            errors = JSON.parse(err.responseText);
            console.log(errors);
            $("#last_name_input_err").text(errors.lastname);
            $("#first_name_input_err").text(errors.firstname);
            $("#date_of_birth_input_err").text(errors.date);
            $("#street_address_input_err").text(errors.street);
            $("#suburb_input_err").text(errors.suburb);
            $("#email_address_input_err").text(errors.email);
            $("#phone_number_input_err").text(errors.phone);
            $("#membership_type_input_err").text(errors.member);



        }

    });
}

function getMembers(){
    members = [];
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async: false,
        url: 'https://halllibrary.herokuapp.com/api/members/',
        success: function (data) {
            members = data;
        },
        error: function (err) {
            console.log(err);
        }
    });
    return members;
}

function updateMemberInfo (member_id) {
    // location.reload();
    lastname1 = $("#member_lastname").val();
    firstname1 = $("#member_firstname").val();
    dob1 = $("#member_dateOfBirth").val();
    street1 = $("#member_street_address").val();
    suburb1 = $("#member_suburb").val();
    email1 = $("#member_email_address").val();
    phone1 = $("#member_phone_number").val();
    fine1 = $("member_fines_due").val();
    member1 = $("#member_membership_type").val();
    console.log({lastname1, firstname1, dob1, street1, suburb1, email1, phone1, fine1, member1, member_id})

    $.ajax({
        type: 'Put',
        dataType: 'JSON',
        url: 'https://halllibrary.herokuapp.com/api/members/' + member_id + "/",
        data: {
            Lastname: lastname1,
            Firstname: firstname1,
            DateOfBirth: dob1,
            StreetAddress: street1,
            Suburb: suburb1,
            EmailAddress: email1,
            PhoneNumber: phone1,
            // FinesDue: fine1,
            MembershipType: member1,

        },
        success: function (data) {
            alert("Member updated successfully")
            alert("Add another Member?")
            location.reload();
        },
        error: function (err) {
            console.log(err);
        }
    });
}
function getBooks(){
        var books = [];
        $.ajax({
            type: 'Get',
            dataType: 'JSON',
            async: false,
            url: 'https://halllibrary.herokuapp.com/api/books/',
            success: function (data) {
                books = data;
            },
            error: function (err) {
                console.log(err);
            }
        });
        return books;
    }

function getLoans(){
    var loans = [];
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async: false,
        url: 'https://halllibrary.herokuapp.com/api/loans/',
        success: function (data) {
            console.log(data)
            loans = data;
        },
        error: function (err) {
            console.log(err);
        }
    });
    return loans;
}

function getMemberInfo (member_id) {
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        url: 'https://halllibrary.herokuapp.com/api/members/'+member_id,
        success: function (data) {
            // location.reload();
            // console.log(arr)
            // var data = arr[0]
            console.log(data)
            $("#member_lastname").val(data.Lastname);
            $("#member_firstname").val(data.Firstname);
            $("#member_street_address").val(data.StreetAddress);

            return data
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function getBookbyID(book_id){
    var allBooks = getBooks()
    return allBooks.filter(function (book) {
        return book.BookID === book_id
    })[0]
}

function getAuthorbyID(author_id){
    var allAuthors = getAuthors()
    return allAuthors.filter(function (author) {
        return author.AuthorID === author_id
    })[0]
}


function getAuthors(){
    authors = [];
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        async: false,
        url: 'https://halllibrary.herokuapp.com/api/authors/',
        success: function (data) {
            authors = data;
        },
        error: function (err) {
            console.log(err);
        }
    });
    return authors;
}

function getMemberInfo (member_id) {
    $.ajax({
        type: 'Get',
        dataType: 'JSON',
        url: 'https://halllibrary.herokuapp.com/api/members/'+member_id,
        success: function (data) {
            // location.reload();
            // console.log(arr)
            // var data = arr[0]
            $("#member_lastname").val(data.Lastname);
            $("#member_firstname").val(data.Firstname);
            $("#member_dateOfBirth").val(data.DateOfBirth);
            $("#member_street_address").val(data.StreetAddress);
            $("#member_suburb").val(data.Suburb);
            $("#member_email_address").val(data.EmailAddress);
            $("#member_phone_number").val(data.PhoneNumber);
            $("#member_membership_type").val(data.MembershipType);

            return data
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function join(t, a, s) {
    function format(m) {
        let f = new Intl.DateTimeFormat('en', m);
        return f.format(t);
    }
    return a.map(format).join(s);
}

function addLoan(bookid, memberid, loanDate){
    let f = [{year: 'numeric'}, {month: 'numeric'}, {day: 'numeric'} ];
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: 'https://halllibrary.herokuapp.com/api/loans/',
        data: {
            Book: bookid,
            LoadDate: loanDate,
            Member:memberid,
        },
        success: function (data) {
            alert('Book loaned successfully');
            alert('Loan another book?');
            location.reload();

        },
        error: function (err) {
            console.log(err);
            errors = JSON.parse(err.responseText);
            console.log(errors);
            $("#book_id_input_err").text(errors.book_id);
            $("#title_input_err").text(errors.title);
            $("#author_input_err").text(errors.author);

        }

    });
}

function returnBook(loanid){
    $.ajax({
        type: 'Delete',
        dataType: 'JSON',
        url: 'https://halllibrary.herokuapp.com/api/loans/'+loanid,
        success: function (data) {
            alert('Book returned successfully');
            alert('Return another book?');
            location.reload();

        },
        error: function (err) {
            console.log(err);

        }

    });
}

function calculateFine(bookedDay){
    var y = bookedDay.split("-")[0];
    var m = bookedDay.split("-")[1];
    var d = bookedDay.split("-")[2];
    var today = new Date();
    // console.log(today);
    var fine = 0;
    var bookedDate = new Date(y, m-1, d);
    console.log(bookedDate);
    var diffMS = today - bookedDate;
    console.log(diffMS + ' ms');

    var diffS = diffMS / 1000;
    console.log(diffS + ' ');

    var diffM = diffS / 60;
    console.log(diffM + ' minutes');

    var diffH = diffM / 60;
    console.log(diffH + ' hours');

    var diffD = diffH / 24;
    console.log(diffD + ' days');
    diffD = Math.floor(diffD);
    var daysofDue = diffD - 21;
    if (daysofDue > 0){
        fine = 0.5 * daysofDue;
    }

    return fine.toFixed(2);
}