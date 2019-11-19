feather.replace()

var socket = io.connect('http://127.0.0.1:4000/');
var temperature = new Vue({
    el: '#app',
    data: {
        ApiUrl: 'http://moosunmv.jinas.me/v1/latest',
        temperature: '',
        humidity: '',
        date: '',
        day: '',
        wind: '',
        secondDay: '',
        thirdDay: '',
        fourthDay: ''
    },
    methods: {
        getWeather(){
            var vm = this;
            axios.get(this.ApiUrl)
            .then(function (response) {
                vm.wind = response.data.wind;
                console.log(vm.wind);
            })
        }
    },
    mounted: function () {
        socket.on('data', function (data) {
            this.temperature = data.temperature;
            console.log(this.temperature);
            this.humidity = data.humidity;
            console.log(this.humidity);
            this.date = data.date;
            this.day = data.day;
            this.secondDay = data.secondDay;
            this.thirdDay = data.thirdDay;
            this.fourthDay = data.fourthDay;
        }.bind(this));

        this.getWeather();

    }

});