var StarShipModel = Backbone.Model.extend({
    defaults: {
        name: null,
        manufacturer: null,
        crew: null,
        cost_in_credits: null
    }
});

var StarShipCollection = Backbone.Collection.extend({
    model: StarShipModel,
    url: "http://swapi.dev/api/starships",
    parse: function(starships){
        return starships.results;
    },
    falconChecker: function(){
        _.each(this.models, function(ship){
            if(ship.get('name') === 'Milllennium Falcon'){
                ship.set('cost_in_credits','priceless');
            }
        });
    }
});

var starShip = new StarShipCollection();

starShip.fetch().then(function(){
    starShip.falconChecker();
    console.log(starShip.findWhere({name: "Millennium Falcon"}).changed);
    console.log(starShip.models);
});

