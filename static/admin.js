$(document).ready(function() {
    $(document).on('change', '.btn-file :file', function() {
        var input = $(this),
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [label]);

    });

    $('.btn-file :file').on('fileselect', function(event, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = label;
        console.log(log)
        genMsgData(log)
        if (input.length) {
            input.val(log);
        } else {
            if (log) alert(log);
        }
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('#img-upload').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imgInp").change(function() {
        readURL(this);
        // debugger
        // var user_name = "Harvey Specter"
        var data = {
            'device_data': ['os.name = Macintosh<br/>os.version = 10.142', 'os.name = Macintosh<br/>os.version = 10.142', 'os.name = Macintosh<br/>os.version = 10.142', 'os.name = Macintosh<br/>os.version = 10.142'],
            'user_name': ['User1', 'User2', 'User3', 'User4'],
            'mac_id': ["268678286693643", "268678223693643", "268674283693643", "268677283693643"],
            'time_stamp': ["01/21/2019 11:44 pm", "01/21/2019 11:44 pm", "01/21/2019 11:44 pm", "01/21/2019 11:44 pm"]
        }
        var device_data = "os.name = Macintosh<br/>os.version = 10.142<br/>browser.name = Chrome<br/>browser.version = 71.0357898<br/><br/>navigator.userAgent = Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36<br/>navigator.appVersion = 5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36<br/>navigator.platform = MacIntel<br/>navigator.vendor = Google Inc.<br/>"
        var mac_id = "268678283693643"
        var time_stamp = "01/21/2019 11:44 pm"

        $('.device_data').text(device_data)
        $('.mac_id').text(mac_id)
        $('.time_stamp').text(time_stamp)
        $('.user_name').text(user_name)
        $('.forwarding').text(Math.floor(Math.random() * 100) + 1)

    });
});

function genMsgData(log) {
    console.log(log)
    var test = [0, 1, 2, 3]
        // test.map()

    // debugger
    test.forEach(function(d) {
        var data = {
            'device_data': [
                "os.name = Macintosh<br/>os.version = 10.142<br/>browser.name = Chrome<br/>browser.version = 71.0357898<br/><br/>navigator.userAgent = Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36<br/>navigator.appVersion = 5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36<br/>navigator.platform = MacIntel<br/>navigator.vendor = Google Inc.<br/>",
                "os.name = Macintosh<br/>os.version = 10.142<br/>browser.name = Chrome<br/>browser.version = 71.0357898<br/><br/>navigator.userAgent = Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36<br/>navigator.appVersion = 5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36<br/>navigator.platform = MacIntel<br/>navigator.vendor = Google Inc.<br/>",
                "os.name = Macintosh<br/>os.version = 10.142<br/>browser.name = Chrome<br/>browser.version = 71.0357898<br/><br/>navigator.userAgent = Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36<br/>navigator.appVersion = 5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36<br/>navigator.platform = MacIntel<br/>navigator.vendor = Google Inc.<br/>",
                "os.name = Macintosh<br/>os.version = 10.142<br/>browser.name = Chrome<br/>browser.version = 71.0357898<br/><br/>navigator.userAgent = Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36<br/>navigator.appVersion = 5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36<br/>navigator.platform = MacIntel<br/>navigator.vendor = Google Inc.<br/>"
            ],
            'user_name': ['User1', 'User2', 'User3', 'User4'],
            'mac_id': ["268678286693643", "268678223693643", "268674283693643", "268677283693643"],
            'time_stamp': ["01/21/2019 11:44 pm", "01/21/2019 11:44 pm", "01/21/2019 11:44 pm", "01/21/2019 11:44 pm"],
            'forwarding': ['34', '45', '67', '20']
        }
        if (log.search("" + d) > -1) {
            // add the user data fetched from the firedatabase..... chat app
            $('.user_name').text(data.user_name[d])
            $('.device_data').text(data.device_data[d])
            $('.mac_id').text(data.mac_id[d])
            $('.time_stamp').text(data.time_stamp[d])
            $('.forwarding').text(data.forwarding[d])
        }
    })
}