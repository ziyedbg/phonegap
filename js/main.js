//login page
function setPass() {
    document.getElementById('placeholder').style.display = 'none';
    document.getElementById('password').style.display = 'inline';
    document.getElementById('password').focus();
}
function checkPass() {
    if (document.getElementById('password').value.length == 0) {
        document.getElementById('placeholder').style.display = 'inline';
        document.getElementById('password').style.display = 'none';
    }
}
//registration page
function setPass2() {
    document.getElementById('placeholder2').style.display = 'none';
    document.getElementById('password2').style.display = 'inline';
    document.getElementById('password2').focus();
}
function checkPass2() {
    if (document.getElementById('password2').value.length == 0) {
        document.getElementById('placeholder2').style.display = 'inline';
        document.getElementById('password2').style.display = 'none';
    }
}



$(document).ready(function(){
    var base_url = 'http://117.58.246.154/dfphoneapp/';
    
    $('#date').datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true
    });

    $('#date_').datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true
    });

    $('.submit').click(function(){

        return false;

    })

    

    $('#login-bgt').click(function(){

        var url = base_url+'home/login';  // you'll want to change

        $.ajax({
            type: 'GET',
            url: url,
            contentType: "application/json",
            dataType: 'jsonp',
            data: {
                username: $('.username').val(),
                password: $('#password').val()
            },
            crossDomain: true,
            beforeSend: function ( xhr ) {
                //Add your image loader here
                $('.loader-image').fadeIn(100);
            },
            success: function ( res ) {
                $('.loader-image').fadeOut(100);
                if( res.value === 2 ) {
                    $('.error').html('Invalid Email & password').css('display','block');
                    return false;
                }
                if( res.value === 1 ){
                    $('#home-block').css('display','none');
                    $('#camera-block').fadeIn(1000);
                }
            }
        });
    })

    $('#new-regisration').click(function(){
        var url = base_url+'home/registration';  // you'll want to change
        var email, password, name, date, gender, phone;
        email = $('#email_').val();
        password = $('#password2').val();
        name = $('#name_').val();
        date = $('#date').val();
        gender = $('#gender_').val();
        phone = $('#phone_').val();
        if(email == 'Enter your email' || password == '' ){
            $('.error_reg').html('Email and password Required!');
            return false;
        }
        $.ajax({
            type: 'GET',
            url: url,
            contentType: "application/json",
            dataType: 'jsonp',
            data: {
                email_: email,
                password_: password,
                name_: name,
                date_: date,
                gender_: gender,
                phone_: phone
            },
            crossDomain: true,
            beforeSend: function ( xhr ) {
                $('.loader-image').fadeIn(100);
            },
            success: function ( res ) {
                $('.loader-image').fadeOut(100);
                if( res.value === 2 ) {
                    $('.error_reg').html('Registration not success!').css('display','block');
                    return false;
                }
                if( res.value === 1 ){
                    $('.error').html('Registration successful!').css('display','block');
                    $('#registration-block').css('display','none');
                    $('#home-block').fadeIn(1000);
                }
            }
        });
    })


    //product add
    $('#product-add-submit').click(function(){
        var url = base_url+'home/product_save';  // you'll want to change
        var store, brand, size, price, date, image, lat, lang;
        store = $('#store_').val();
        brand = $('#brand_').val();
        size = $('#size_').val();
        price = $('#price_').val();
        date = $('#date_').val();
        image = $('#cap_image_').val();
        lat = $('#lat_').val();
        lang = $('#lang_').val();
        if(store == '' || brand == 'Enter the brand' ){
            $('.error_prod').html('Store and Brand Required!');
            return false;
        }
        $.ajax({
            type: 'GET',
            url: url,
            contentType: "application/json",
            dataType: 'jsonp',
            data: {
                store_ : store,
                brand_ : brand,
                size_ : size,
                price_ : price,
                date_ : date,
                image_ : image,
                lat_ : lat,
                lang_ : lang
            },
            crossDomain: true,
            beforeSend: function ( xhr ) {
                $('.loader-image').fadeIn(100);
            },
            success: function ( res ) {
                $('.loader-image').fadeOut(100);
                if( res.value === 2 ) {
                    $('.error_prod').html('Product can be added!').css('display','block');
                    return false;
                }
                if( res.value === 1 ){
                    $('#product-add').css('display','none');
                    $('#thanks-block').fadeIn(1000);
                }
            }
        });
    })

    $('.register').click(function(){
        $('#home-block').css('display','none');
        $('#registration-block').fadeIn(1000);
    })
    $('#back-to-home').click(function(){
        $('#registration-block').css('display','none');
        $('#home-block').fadeIn(1000);
    })
    $('#product-back-btn').click(function(){
        $('#product-add').css('display','none');
        $('#camera-block').fadeIn(1000);
    })
    
    $('#thank-back-btn').click(function(){
        $('#thanks-block').css('display','none');
        $('#camera-block').fadeIn(1000);
    })

})

//Camera Section
// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {}

// Called when capture operation is finished
//
function captureSuccess(mediaFiles) {
    $('.loader-image').fadeIn(100);
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        uploadFile(mediaFiles[i]);
    }
}

// Called if something bad happens.
//
function captureError(error) {
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Uh oh!');
}

// A button will call this function
//
function captureImage() {
    // Launch device camera application,
    // allowing user to capture up to 1 images
    navigator.device.capture.captureImage(captureSuccess, captureError, {
        limit: 1
    });
}

// Upload files to server
function uploadFile(mediaFile) {
    path = mediaFile.fullPath;
    name = mediaFile.name;
    
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=mediaFile.name;
    options.mimeType="image/jpeg";

    var params = new Object();
    params.fullpath = path;
    params.name = name;

    options.params = params;
    options.chunkedMode = false;
    
    var ft = new FileTransfer();
    ft.upload( path, "http://117.58.246.154/dfphoneapp/home/image_upload",
        function(result) {
            $('.loader-image').fadeOut(100);
            $('#camera-block').css('display','none');
            $('#product-add').fadeIn(1000);
            $('#cap_image_').val(name);
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    $('#lat_').val(position.coords.latitude);
                    $('#lang_').val(position.coords.longitude);
                },
                function (error) {}
                );
        },
        function(error) {
            $('.error_cam').html('An error occured, Please try again');
        },
        options
        );
}